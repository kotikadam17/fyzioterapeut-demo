import { createClient } from "@supabase/supabase-js";

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase env vars nejsou nastaveny.");
  return createClient(url, key);
}

export type Client = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  bio: string | null;
  created_at: string;
};

export type Consultation = {
  id: string;
  client_id: string;
  notes: string;
  date: string;
  created_at: string;
};

export type Photo = {
  id: string;
  client_id: string;
  url: string;
  label: string | null;
  created_at: string;
};

export type Purchase = {
  id: string;
  client_id: string;
  product_name: string;
  type: "fyzioterapie" | "rehab" | "program";
  date: string;
  price: number;
};
