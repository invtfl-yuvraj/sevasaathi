// types/socket.ts
import { Server as NetServer } from 'http';
import { NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';

export interface NextApiResponseServerIO extends NextApiResponse {
  socket: NextApiResponse['socket'] & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
}

export interface CaptainLocationUpdate {
  tripId: string;
  captainId: string;
  latitude: number;
  longitude: number;
  distanceToUser: number;
  status: string;
  timestamp: Date;
  estimatedArrivalMinutes: number | null;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  timestamp?: Date;
}

export interface LocationUpdateRequest {
  latitude: number;
  longitude: number;
  tripId?: string;
  timestamp?: Date;
}