// app/api/socket/io/route.ts
import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '@/types/socket';
import { Server as ServerIO } from 'socket.io';
import { Server as NetServer } from 'http';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// This function handles the socket.io initialization for the Edge API Route
export async function GET(req: NextRequest, res: NextResponse) {
  if ((res as any).socket.server.io) {
    // Socket is already running
    return NextResponse.json({ success: true, message: 'Socket already running' });
  }

  console.log('Starting Socket.io server...');
  // Adapt the NextApiResponse to include socket server
  const httpServer: NetServer = (res as any).socket.server;
  
  const io = new ServerIO(httpServer, {
    path: '/api/socket',
    addTrailingSlash: false,
    cors: {
      origin: process.env.NEXTAUTH_URL || '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Store the socket server instance
  (res as any).socket.server.io = io;

  return NextResponse.json({ success: true, message: 'Socket server started' });
}