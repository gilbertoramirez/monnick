import { NextResponse } from 'next/server';
import Redis from 'ioredis';

interface Guest {
  name: string;
  attendance: string;
  companion: string;
  dietary: string;
  timestamp: string;
}

const KV_KEY = 'monnick_guests';

function getRedis() {
  return new Redis(process.env.REDIS_URL || '', {
    maxRetriesPerRequest: 1,
    lazyConnect: true,
  });
}

async function readGuests(): Promise<Guest[]> {
  const redis = getRedis();
  try {
    await redis.connect();
    const data = await redis.get(KV_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  } finally {
    redis.disconnect();
  }
}

async function writeGuests(guests: Guest[]) {
  const redis = getRedis();
  try {
    await redis.connect();
    await redis.set(KV_KEY, JSON.stringify(guests));
  } finally {
    redis.disconnect();
  }
}

export async function GET() {
  const guests = await readGuests();
  return NextResponse.json(guests);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, attendance, companion, dietary } = body;

  if (!name || !attendance) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 });
  }

  const guests = await readGuests();
  const guest: Guest = {
    name: String(name).trim().slice(0, 100),
    attendance: ['yes', 'maybe', 'no'].includes(attendance) ? attendance : 'yes',
    companion: companion ? String(companion).trim().slice(0, 100) : '',
    dietary: dietary ? String(dietary).trim().slice(0, 200) : '',
    timestamp: new Date().toISOString(),
  };

  guests.push(guest);
  await writeGuests(guests);

  return NextResponse.json({ ok: true, count: guests.filter(g => g.attendance === 'yes').length });
}
