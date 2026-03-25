import fs from "fs";
import path from "path";

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  note: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "9:00"
  createdAt: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "bookings.json");

function ensureFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

export function getBookings(): Booking[] {
  ensureFile();
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

export function addBooking(booking: Booking): void {
  ensureFile();
  const bookings = getBookings();
  bookings.push(booking);
  fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2), "utf-8");
}

export function getTakenSlots(date: string): string[] {
  return getBookings()
    .filter((b) => b.date === date)
    .map((b) => b.time);
}

export function isSlotTaken(date: string, time: string): boolean {
  return getBookings().some((b) => b.date === date && b.time === time);
}
