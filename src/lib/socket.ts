import { Server as NetServer } from 'http';
import { NextRequest } from 'next/server';
import { Server as SocketIOServer } from 'socket.io';
import { getToken } from 'next-auth/jwt';
import prisma from '@/lib/prisma';
import { calculateDistance,calculateETA } from '../lib/geolocation';

interface SocketIONextResponse {
  socket: {
    server: NetServer & {
      io?: SocketIOServer;
    };
  };
}

// This variable will hold the socket.io server instance
let io: SocketIOServer | undefined;

export function getIO() {
  return io;
}

export function initSocket(server: NetServer) {
  if (!io) {
    console.log('Initializing Socket.IO server...');
    
    // Create new Socket.IO instance
    io = new SocketIOServer(server, {
      path: '/api/socket',
      cors: {
        origin: process.env.NEXTAUTH_URL || '*',
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });
    
    // Set up authentication middleware
    io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        
        if (!token) {
          return next(new Error('Authentication token not provided'));
        }
        
        // Verify token using NextAuth JWT
        const decodedToken = await getToken({ 
          req: { headers: { authorization: `Bearer ${token}` } } as any,
          secret: process.env.NEXTAUTH_SECRET
        });
        
        if (!decodedToken || !decodedToken.email) {
          return next(new Error('Invalid token'));
        }
        
        // Get user from DB
        const user = await prisma.user.findUnique({
          where: { email: decodedToken.email as string },
          include: { captain: true }
        });
        
        if (!user) {
          return next(new Error('User not found'));
        }
        
        // Attach user data to socket
        socket.data.user = {
          id: user.id,
          role: user.role,
          captainId: user.captain?.id
        };
        
        return next();
      } catch (error) {
        console.error('Socket authentication error:', error);
        return next(new Error('Authentication failed'));
      }
    });

    // Handle socket connections
    io.on('connection', (socket) => {
      console.log(`Socket connected: ${socket.id}`);
      
      // Join user-specific room
      const userId = socket.data.user?.id;
      const captainId = socket.data.user?.captainId;
      
      if (userId) {
        socket.join(`user_${userId}`);
        console.log(`User ${userId} joined their room`);
        
        // If user is a captain, also join captain room
        if (captainId) {
          socket.join(`captain_${captainId}`);
          console.log(`Captain ${captainId} joined their room`);
        }
        
        // Confirm connection
        socket.emit('connection_established', { 
          userId,
          role: socket.data.user.role
        });
      }

      // Handle captain location updates
      socket.on('update_location', async (data) => {
        try {
          if (!socket.data.user || socket.data.user.role !== 'CAPTAIN') {
            socket.emit('error', 'Unauthorized: Only captains can update location');
            return;
          }

          const { latitude, longitude, tripId } = data;
          
          if (!latitude || !longitude) {
            socket.emit('error', 'Invalid location data');
            return;
          }

          const userId = socket.data.user.id;
          const captainId = socket.data.user.captainId;

          // Update captain location in DB
          await prisma.location.upsert({
            where: { captainId },
            update: {
              latitude,
              longitude,
              city: data.city || undefined,
              updatedAt: new Date(),
            },
            create: {
              captainId,
              latitude,
              longitude,
              city: data.city || "Unknown",
            },
          });

          // If tracking a specific trip
          if (tripId) {
            const trip = await prisma.trip.findFirst({
              where: { 
                id: tripId,
                captainId: userId 
              },
              select: {
                id: true,
                userId: true,
                status: true,
                pickupAddress: true,
                // Hypothetically get user location from pickup coordinates
                // This is a simplified example; you might have a different way to get user location
              }
            });

            if (trip) {
              // For demonstration, using fixed pickup coordinates
              // In a real app, you would get these from your database or client
              const userLatitude = 34.0522; // Example user latitude
              const userLongitude = -118.2437; // Example user longitude
              
              // Calculate distance to user
              const distanceToUser = calculateDistance(
                latitude,
                longitude,
                userLatitude,
                userLongitude
              );
              
              // Update trip with new captain location
              await prisma.trip.update({
                where: { id: tripId },
                data: {
                  captainLatitude: latitude,
                  captainLongitude: longitude,
                  distanceToUser,
                  lastLocationUpdate: new Date(),
                  // Auto-update to ARRIVED status when captain is within 50 meters
                  status: distanceToUser < 0.05 ? "ARRIVED" : trip.status,
                }
              });

              // Create location tracking record
              await prisma.locationTracking.create({
                data: {
                  tripId,
                  userId: trip.userId,
                  latitude,
                  longitude,
                  distanceToUser,
                }
              });

              // Emit location update to user in real-time
              io?.to(`user_${trip.userId}`).emit('captain_location_update', {
                tripId,
                captainId,
                latitude,
                longitude,
                distanceToUser,
                status: distanceToUser < 0.05 ? "ARRIVED" : trip.status,
                timestamp: new Date(),
                estimatedArrivalMinutes: calculateETA(distanceToUser)
              });
            }
          }

          // Confirm update to captain
          socket.emit('location_updated', { 
            success: true,
            timestamp: new Date()
          });
          
        } catch (error) {
          console.error('Error updating location:', error);
          socket.emit('error', 'Failed to update location');
        }
      });

      // Users can request captain location
      socket.on('request_captain_location', async ({ tripId }) => {
        try {
          if (!socket.data.user) {
            socket.emit('error', 'Authentication required');
            return;
          }

          const userId = socket.data.user.id;
          
          // Verify user has access to this trip
          const trip = await prisma.trip.findFirst({
            where: {
              id: tripId,
              userId,
              status: {
                in: ['ACCEPTED', 'IN_PROGRESS', 'ARRIVED']
              }
            }
          });

          if (!trip || !trip.captainLatitude || !trip.captainLongitude) {
            socket.emit('error', 'No active trip found or captain location unavailable');
            return;
          }

          // Send latest captain location
          socket.emit('captain_location_update', {
            tripId,
            captainId: trip.captainId,
            latitude: trip.captainLatitude,
            longitude: trip.captainLongitude,
            distanceToUser: trip.distanceToUser || 0,
            status: trip.status,
            timestamp: trip.lastLocationUpdate || new Date(),
            estimatedArrivalMinutes: trip.distanceToUser ? calculateETA(trip.distanceToUser) : null
          });
          
        } catch (error) {
          console.error('Error getting captain location:', error);
          socket.emit('error', 'Failed to get captain location');
        }
      });

      // Handle disconnections
      socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
      });
    });
  }
  
  return io;
}
