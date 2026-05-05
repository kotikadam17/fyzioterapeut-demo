import { createClient } from "@supabase/supabase-js";

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

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL nebo SUPABASE_SERVICE_ROLE_KEY není nastaveno.");
  return createClient(url, key);
}

export async function getBookings(): Promise<Booking[]> {
  const { data, error } = await getSupabase()
    .from("bookings")
    .select("*")
    .order("date", { ascending: true })
    .order("time", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(row => ({ ...row, createdAt: row.created_at }));
}

export async function addBooking(booking: Omit<Booking, "createdAt">): Promise<void> {
  const { error } = await getSupabase()
    .from("bookings")
    .insert({ ...booking, created_at: new Date().toISOString() });
  if (error) throw error;
}

export async function getTakenSlots(date: string): Promise<string[]> {
  const { data, error } = await getSupabase()
    .from("bookings")
    .select("time")
    .eq("date", date);
  if (error) throw error;
  return (data ?? []).map(row => row.time);
}

export async function isSlotTaken(date: string, time: string): Promise<boolean> {
  const { count, error } = await getSupabase()
    .from("bookings")
    .select("*", { count: "exact", head: true })
    .eq("date", date)
    .eq("time", time);
  if (error) throw error;
  return (count ?? 0) > 0;
}
