import { createClient } from "@supabase/supabase-js";

const PROJECT_ID = "svfprccfrqapbyadxoee";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2ZnByY2NmcnFhcGJ5YWR4b2VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0NDkyNzQsImV4cCI6MjA5MzAyNTI3NH0.eUC1Brb3b7ewWLDmcGhQAqfl8l221hEXvnVXidHD7RE";
const TABLE = "kv_store_ac10e702";

const supabase = createClient(
  `https://${PROJECT_ID}.supabase.co`,
  ANON_KEY
);

/**
 * Odczyt klucza — najpierw Supabase, fallback na localStorage.
 */
export async function storageGet<T>(key: string, fallback: T): Promise<T> {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("value")
      .eq("key", key)
      .maybeSingle();

    if (error) throw error;
    if (data?.value !== undefined && data?.value !== null) {
      return data.value as T;
    }
  } catch {
    // Supabase niedostępny — użyj localStorage
  }

  const local = localStorage.getItem(key);
  return local ? (JSON.parse(local) as T) : fallback;
}

/**
 * Zapis klucza — Supabase + localStorage jednocześnie.
 */
export async function storageSet(key: string, value: unknown): Promise<void> {
  // Zawsze zapisz lokalnie jako fallback
  localStorage.setItem(key, JSON.stringify(value));

  try {
    const { error } = await supabase
      .from(TABLE)
      .upsert({ key, value });

    if (error) throw error;
  } catch {
    // Błąd sieci — dane są w localStorage, sync nastąpi przy następnym zapisie
  }
}
