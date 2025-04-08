import { NextRequest, NextResponse } from 'next/server';
import { initSocket } from '@/lib/socket';

export async function GET(req: NextRequest) {
  try {
    // This endpoint just returns a 200 OK to confirm the socket server is running
    // The actual socket connection is handled by the socket.io-client on the frontend
    
    return new NextResponse(
      JSON.stringify({ ok: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Socket route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}