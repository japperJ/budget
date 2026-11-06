import { db, schema } from "../src/db";
import { count } from "drizzle-orm";

async function main() {
  const defaults = [
    { name: "Løn", type: "income", color: "#22c55e", icon: "banknote" },
    { name: "Andre indtægter", type: "income", color: "#10b981", icon: "plus" },
    { name: "Bolig", type: "expense", color: "#ef4444", icon: "home" },
    { name: "Mad & dagligvarer", type: "expense", color: "#f97316", icon: "shopping-cart" },
    { name: "Transport", type: "expense", color: "#eab308", icon: "car" },
    { name: "Forsyning", type: "expense", color: "#3b82f6", icon: "zap" },
    { name: "Forsikring", type: "expense", color: "#8b5cf6", icon: "shield" },
    { name: "Underholdning", type: "expense", color: "#a855f7", icon: "film" },
    { name: "Sundhed", type: "expense", color: "#ec4899", icon: "heart" },
    { name: "Tøj", type: "expense", color: "#14b8a6", icon: "shirt" },
    { name: "Hjem & have", type: "expense", color: "#f59e0b", icon: "hammer" },
    { name: "Opsparing", type: "expense", color: "#6366f1", icon: "piggy-bank" },
    { name: "Andet", type: "expense", color: "#6b7280", icon: "more-horizontal" },
  ];
  const existing = await db.select().from(schema.categories);
  const existingNames = new Set(existing.map((e: any) => e.name));
  for (const c of defaults) {
    if (!existingNames.has(c.name)) {
      await db.insert(schema.categories).values(c);
    }
  }
  const accs = (await db.select({ c: count() }).from(schema.accounts))[0];
  if ((accs?.c ?? 0) === 0) {
    await db.insert(schema.accounts).values({ name: "Hovedkonto", type: "checking", currency: "DKK" });
    console.log("Seeded account");
  }
  console.log("Seed done");
}

main();