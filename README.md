# Budget – banktransaktioner

Webapp til styring af banktransaktioner, budget og cashflow. Dansk sprog og DKK.

## Funktioner
- Dashboard med cashflow-graf (6 måneder) og udgifter pr. kategori
- Transaktionsliste med filtrering, søgning og kategorisering
- Budget med månedlige grænser og fremdrift
- CSV-import (understøtter Danske Bank og Nordea eksportformater)
- Konti og kategorier (indstillinger)

## Kørsel lokalt

```bash
npm install
npm run db:push
npm run seed
npm run dev
```

Åbn http://localhost:3000

## Teknologi
- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- Drizzle ORM + SQLite (lokal fil: data/budget.db)
- Recharts, PapaParse, date-fns

## Fremtidig Vercel + Neon
Koden bruger Drizzle ORM, så migration til Neon/Postgres er ligetil:
1. Installer `@neondatabase/serverless`
2. Brug `src/db/schema.pg.ts` i stedet for `src/db/schema.ts`
3. Peger db-clienten (`src/db/index.ts`) på `DATABASE_URL` (Neon)
4. Kør `drizzle-kit push` mod Neon-databasen

Beløb gemmes i øre (heltal) for at undgå afrundingsfejl.