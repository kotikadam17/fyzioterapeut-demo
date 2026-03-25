import { type NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { getBookings, addBooking, getTakenSlots, isSlotTaken } from "@/lib/bookings";

export async function GET(request: NextRequest) {
  const date = new URL(request.url).searchParams.get("date");

  if (date) {
    return Response.json({ taken: getTakenSlots(date) });
  }

  return Response.json(getBookings());
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, phone, email, note, date, time } = body;

  if (!name || !phone || !email || !date || !time) {
    return Response.json({ error: "Vyplňte všechna povinná pole." }, { status: 400 });
  }

  if (isSlotTaken(date, time)) {
    return Response.json({ error: "Tento termín je již obsazen." }, { status: 409 });
  }

  const booking = {
    id: randomUUID(),
    name,
    phone,
    email,
    note: note || "",
    date,
    time,
    createdAt: new Date().toISOString(),
  };

  addBooking(booking);
  return Response.json({ success: true, booking }, { status: 201 });
}
