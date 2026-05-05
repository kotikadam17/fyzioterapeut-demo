import { type NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { getBookings, addBooking, getTakenSlots, isSlotTaken } from "@/lib/bookings";
import { Resend } from "resend";

function esc(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET(request: NextRequest) {
  const date = new URL(request.url).searchParams.get("date");

  if (date) {
    const taken = await getTakenSlots(date);
    return Response.json({ taken });
  }

  const bookings = await getBookings();
  return Response.json(bookings);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, phone, email, note, date, time } = body;

  if (!name || !phone || !email || !date || !time) {
    return Response.json({ error: "Vyplňte všechna povinná pole." }, { status: 400 });
  }

  if (await isSlotTaken(date, time)) {
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
  };

  await addBooking(booking);

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const [year, month, day] = date.split("-");
    const adminEmail = process.env.ADMIN_EMAIL ?? "kotika@gvp.cz";
    resend.emails.send({
      from: "Rezervace <onboarding@resend.dev>",
      to: adminEmail,
      subject: `Nová rezervace — ${esc(name)}, ${day}.${month}.${year} v ${time}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;padding:24px">
          <h2 style="margin:0 0 16px;color:#1C1C1C">Nová rezervace</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#6B7280;width:120px">Jméno</td><td style="padding:8px 0;font-weight:600;color:#1C1C1C">${esc(name)}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7280">Datum</td><td style="padding:8px 0;font-weight:600;color:#1C1C1C">${day}.${month}.${year}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7280">Čas</td><td style="padding:8px 0;font-weight:600;color:#1C1C1C">${esc(time)}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7280">Telefon</td><td style="padding:8px 0;color:#1C1C1C"><a href="tel:${esc(phone)}" style="color:#7B9E87">${esc(phone)}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6B7280">E-mail</td><td style="padding:8px 0;color:#1C1C1C"><a href="mailto:${esc(email)}" style="color:#7B9E87">${esc(email)}</a></td></tr>
            ${note ? `<tr><td style="padding:8px 0;color:#6B7280;vertical-align:top">Poznámka</td><td style="padding:8px 0;color:#1C1C1C">${esc(note)}</td></tr>` : ""}
          </table>
          <p style="margin:24px 0 0;font-size:12px;color:#9CA3AF">Rezervace č. ${booking.id.slice(0, 8)}</p>
        </div>
      `,
    }).catch(() => {});
  }

  return Response.json({ success: true, booking }, { status: 201 });
}
