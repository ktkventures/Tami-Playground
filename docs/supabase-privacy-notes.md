# Supabase — Data & Privacy Reference

*A plain-language reference for the RP Dynastree community. Compiled June 2026
from Supabase's own security/privacy documentation and independent comparisons
(see Sources). Policies can change — check the linked pages for the latest.*

## TL;DR
Supabase is a well-regarded, **open-source** cloud database built on
**PostgreSQL**. It holds the major security certifications, **encrypts your
data**, lets you **choose where it's physically stored** (including the EU),
and — unlike most competitors — **you can export or even self-host
everything**, so you're never locked in. The main caveat: the hosted version
runs on a **US-incorporated company's** infrastructure (on AWS), which has
legal implications worth knowing.

## Security certifications
- **SOC 2 Type 2** — audited yearly against security, availability,
  confidentiality, and privacy criteria
- **ISO 27001** — the international standard for information-security management
- **HIPAA** — supported for health data (requires a paid plan + a signed
  agreement)

## Encryption
- **At rest:** AES-256 (bank-grade)
- **In transit:** TLS (the same encryption as `https://`)
- Access tokens/keys get an extra layer of app-level encryption before storage

## Where your data physically lives
- Hosted on **AWS** data centers; **you pick the region** at project creation
  (options include Ireland, London, Frankfurt, US, Canada, Sydney, Tokyo,
  Singapore, São Paulo, and more)
- Your data **stays in the region you choose** (data residency)

## Data ownership & "no lock-in" (the big differentiator)
- Supabase is **open source** (Apache 2.0) — the whole platform is public code
- Your data sits in a **standard PostgreSQL database**, so it can be
  **exported anytime** (`pg_dump`), moved to any other host, or **self-hosted
  on your own servers** if the community ever wants total control
- If Supabase disappeared tomorrow, your data is fully portable — not trapped
  in a proprietary format

## Privacy policy highlights
- **What they collect:** account info (name, email, GitHub handle), payment
  info (handled by Stripe), and usage data
- **Your stored content:** Supabase acts only as a **"processor"** of the data
  you put in — **you retain control of it**
- **Sharing:** limited to service providers (hosting, payments, analytics)
  under confidentiality terms; disclosed to law enforcement only when legally
  required
- **Your rights (GDPR/CCPA):** access, correction, **deletion**, portability,
  and consent withdrawal
- **Retention:** kept for the life of your account + ~60 days after closure

## Honest caveats (important for a privacy-focused group)
- Supabase is a **US company**, so even when you host in an EU region, it's
  subject to the **US CLOUD Act** — choosing an EU region solves *where the
  data sits*, but not *whose laws apply*. For most communities this is fine;
  for strict legal/regulatory needs it may not be.
- The **hosted** free tier means your data is on **Supabase's servers**
  (encrypted, certified — but their infrastructure). The "data never leaves
  your hardware" benefit only applies if you **self-host**.

## How it compares

| | Supabase | Firebase (Google) | Raw AWS / Cloud SQL |
|---|---|---|---|
| Open source | ✅ Yes | ❌ No | ❌ No |
| Self-hostable | ✅ Yes | ❌ No | ➖ (it *is* the host) |
| Data portability | ✅ Standard SQL, easy export | ⚠️ Proprietary, harder | ✅ Standard |
| Encryption & certs | ✅ SOC2 / ISO / HIPAA | ✅ Strong (Google) | ✅ Strong |
| Independent of Big-Tech ad ecosystem | ✅ | ❌ (Google) | ➖ |

**Fair point:** on raw encryption and certifications, Supabase and
Google/Firebase are *both* strong. Supabase's real edge for privacy-minded
groups is **openness, data ownership/portability, EU hosting, and not being
inside Google's ecosystem.**

## What this means for RP Dynastree specifically
- We use the **hosted free tier** — data encrypted at rest/in transit, on
  certified infrastructure.
- Since there are **no accounts**, access works via **hard-to-guess share
  links + database access rules** (like Google Docs' "anyone with the link").
  A good fit for **fictional OC/RP content**, which isn't sensitive personal
  data.
- Bonus: because it's open source, the community could **self-host or export**
  everything later if you ever wanted full control.

## Sources
- [Security at Supabase](https://supabase.com/security)
- [Supabase Privacy Policy](https://supabase.com/privacy)
- [SOC 2 Compliance — Supabase Docs](https://supabase.com/docs/guides/security/soc-2-compliance)
- [HIPAA Compliance — Supabase Docs](https://supabase.com/docs/guides/security/hipaa-compliance)
- [Supabase is now HIPAA and SOC2 Type 2 compliant](https://supabase.com/blog/supabase-soc2-hipaa)
- [Available regions — Supabase Docs](https://supabase.com/docs/guides/platform/regions)
- [Supabase vs. Firebase comparison — Bytebase](https://www.bytebase.com/blog/supabase-vs-firebase/)
