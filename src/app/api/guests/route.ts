import { NextResponse } from 'next/server';
import { createClient } from '@vercel/kv';

interface Guest {
  name: string;
  attendance: string;
  companion: string;
  dietary: string;
  timestamp: string;
}

const KV_KEY = 'monnick_guests';

function getKV() {
  const url = process.env.KV_REST_API_URL || process.env.REDIS_URL || '';
  const token = process.env.KV_REST_API_TOKEN || process.env.REDIS_TOKEN || '';
  return createClient({ url, token });
}

async function readGuests(): Promise<Guest[]> {
  try {
    const data = await getKV().get<Guest[]>(KV_KEY);
    return data || [];
  } catch {
    return [];
  }
}

async function writeGuests(guests: Guest[]) {
  await getKV().set(KV_KEY, guests);
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
