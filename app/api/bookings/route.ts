import { type NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { getBookings, addBooking, getTakenSlots, isSlotTaken } from "@/lib/bookings";
import { Resend } from "resend";

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

  // Send notification email (fire-and-forget — don't block the response)
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const [day, month, year] = [
      String(new Date(date).getDate()).padStart(2, "0"),
      String(new Date(date).getMonth() + 1).padStart(2, "0"),
      new Date(date).getFullYear(),
    ];
    resend.emails.send({
      from: "Rezervace <onboarding@resend.dev>",
      to: "kotika@gvp.cz",
      subject: `Nová rezervace — ${name}, ${day}.${month}.${year} v ${time}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;padding:24px">
          <h2 style="margin:0 0 16px;color:#1C1C1C">Nová rezervace</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#6B7280;width:120px">Jméno</td><td style="padding:8px 0;font-weight:600;color:#1C1C1C">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7280">Datum</td><td style="padding:8px 0;font-weight:600;color:#1C1C1C">${day}.${month}.${year}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7280">Čas</td><td style="padding:8px 0;font-weight:600;color:#1C1C1C">${time}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7280">Telefon</td><td style="padding:8px 0;color:#1C1C1C"><a href="tel:${phone}" style="color:#7B9E87">${phone}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6B7280">E-mail</td><td style="padding:8px 0;color:#1C1C1C"><a href="mailto:${email}" style="color:#7B9E87">${email}</a></td></tr>
            ${note ? `<tr><td style="padding:8px 0;color:#6B7280;vertical-align:top">Poznámka</td><td style="padding:8px 0;color:#1C1C1C">${note}</td></tr>` : ""}
          </table>
          <p style="margin:24px 0 0;font-size:12px;color:#9CA3AF">Rezervace č. ${booking.id.slice(0, 8)}</p>
        </div>
      `,
    }).catch(() => {}); // silent fail — booking is already saved
  }

  return Response.json({ success: true, booking }, { status: 201 });
}
