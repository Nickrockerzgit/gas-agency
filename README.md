# Munna United Distributors – Commercial LPG landing page

React + TypeScript + Vite + Tailwind CSS v4 + shadcn/ui, prerendered to static HTML.

## Design system
Oxford Blue `#002147` (20%), Signal Red `#C8102E` (10%), white (70%), Manrope. Tokens live in `src/index.css`.
UI primitives are shadcn components in `src/components/ui` (button has `signal` variant, badge has `tonal`/`signal`).
Add more with `npx shadcn@latest add <component>`.

## Commands
- `npm run dev` – local development
- `npm run build` – typecheck, build, prerender into `dist/` (set `SITE_URL=https://your-domain` for canonical URL + sitemap)
- `npm run preview` – serve the production build

## Before launch: fill in `src/data/company.ts`
All fields are `null` until verified: phone, WhatsApp, email, address, service area, hours, directions URL,
approved affiliation wording, site URL. Call/WhatsApp buttons fall back to the Contact section until numbers are set.
Phone format: E.164, e.g. `+919876543210`.

## Products (`src/data/products.ts`)
Only `status: "published"` products are shown. 19 kg and 47.5 kg are published (IndianOil commercial/industrial).
2, 5 and 10 kg are `"unverified"` – confirm exact variant/category with the agency, update `variant`/`category`, then set `"published"`.
Add real photos via the `image` field.

## Monthly rate update (`src/data/pricing.ts`)
1. Get the applicable rate sheet from the owner.
2. Edit the product's record: `amountInr`, `priceBasis`, `locality`, `effectiveFrom`, `reviewedAt`, `chargesNote`, `sourceReference`, `status: "verified"`.
3. `npm run build`, preview, owner verifies, deploy `dist/`. Keep the previous deployment for rollback.

Display states: verified / pending / stale (reviewed before the 1st of the current month, IST) / future-effective / unavailable.
Missing prices are never shown as zero.

## Safety
Review `src/data/safety.ts` and the 1906 helpline against iocl.com/contact-us before publishing.
