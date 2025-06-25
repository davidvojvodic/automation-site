import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Extended monitoring information
    const monitoring = {
      timestamp: new Date().toISOString(),
      status: 'operational',
      services: {
        website: {
          status: 'healthy',
          responseTime: Date.now(),
        },
        database: {
          status: 'healthy', // You can add actual DB checks here
          responseTime: 0,
        },
        api: {
          status: 'healthy',
          responseTime: Date.now(),
        }
      },
      metrics: {
        uptime: process.uptime(),
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100,
          percentage: Math.round((process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100),
        },
        cpu: {
          loadAverage: process.platform !== 'win32' ? require('os').loadavg() : [0, 0, 0],
        }
      },
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        environment: process.env.NODE_ENV || 'development',
      }
    };

    return NextResponse.json(monitoring, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString() 
      },
      { status: 500 }
    );
  }
}