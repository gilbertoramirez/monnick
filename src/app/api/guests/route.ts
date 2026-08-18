import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Guest {
  name: string;
  attendance: string;
  companion: string;
  dietary: string;
  timestamp: string;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'guests.json');

let memoryStore: Guest[] | null = null;

function readGuests(): Guest[] {
  if (memoryStore) return memoryStore;
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    memoryStore = JSON.parse(raw);
    return memoryStore!;
  } catch {
    memoryStore = [];
    return [];
  }
}

function writeGuests(guests: Guest[]) {
  memoryStore = guests;
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(guests, null, 2));
  } catch {
    // read-only filesystem (serverless) — data lives in memory only
  }
}

export async function GET() {
  return NextResponse.json(readGuests());
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, attendance, companion, dietary } = body;

  if (!name || !attendance) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 });
  }

  const guests = readGuests();
  const guest: Guest = {
    name: String(name).trim().slice(0, 100),
    attendance: ['yes', 'maybe', 'no'].includes(attendance) ? attendance : 'yes',
    companion: companion ? String(companion).trim().slice(0, 100) : '',
    dietary: dietary ? String(dietary).trim().slice(0, 200) : '',
    timestamp: new Date().toISOString(),
  };

  guests.push(guest);
  writeGuests(guests);

  return NextResponse.json({ ok: true, count: guests.filter(g => g.attendance === 'yes').length });
}
