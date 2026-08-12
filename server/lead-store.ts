import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { type InsertLead, leads } from "@shared/schema";

/**
 * Persistência dos leads em Postgres. É opcional por natureza: sem
 * DATABASE_URL a aplicação continua funcionando e apenas deixa de guardar a
 * cópia local — nenhuma falha aqui pode impedir o lead de chegar ao checkout.
 */

let db: ReturnType<typeof drizzle> | null = null;
let initialized = false;

function getDb() {
  if (initialized) return db;
  initialized = true;

  const url = process.env.DATABASE_URL;
  if (!url) return null;

  db = drizzle(new Pool({ connectionString: url }));
  return db;
}

export function isEnabled(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/** Grava o lead e devolve o id gerado, ou null se não houver banco. */
export async function saveLead(lead: InsertLead): Promise<string | null> {
  const client = getDb();
  if (!client) return null;

  const [row] = await client
    .insert(leads)
    .values(lead)
    .returning({ id: leads.id });

  return row?.id ?? null;
}

/** Marca no registro local se o lead chegou ou não ao Active Campaign. */
export async function markCrmStatus(
  id: string,
  status: "ok" | "error",
): Promise<void> {
  const client = getDb();
  if (!client) return;

  await client.update(leads).set({ crmSynced: status }).where(eq(leads.id, id));
}
