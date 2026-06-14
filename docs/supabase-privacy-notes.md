# Supabase — Data & Privacy Reference

*A plain-language reference for the RP Dynastree community. Compiled June 2026
from Supabase's security/privacy docs and independent comparisons (see
Sources). Policies change — check the links for the latest.*

## TL;DR
Supabase is a well-regarded, **open-source** cloud database built on
**PostgreSQL**. It holds the major security certifications, **encrypts your
data**, lets you **choose the region** it's stored in (including the EU), and —
unlike most rivals — lets you **export or self-host everything**, so you're
never locked in. Main caveat: the hosted version runs on a **US company's**
infrastructure (on AWS), which has legal implications worth knowing.

## Security & encryption
- **Certifications:** SOC 2 Type 2 (audited yearly), ISO 27001, and HIPAA for
  health data (needs a paid plan + a signed agreement).
- **Encryption:** AES-256 at rest, TLS in transit (the `https://` padlock);
  access keys get an extra layer of app-level encryption.

## Where your data lives
Hosted on **AWS**; **you pick the region** at setup (Ireland, London,
Frankfurt, US, Canada, Sydney, Tokyo, Singapore, São Paulo, and more) and your
data **stays there** (data residency).

## Data ownership & "no lock-in" (the big differentiator)
Supabase is **open source** (Apache 2.0), and your data sits in a **standard
PostgreSQL database** — so it can be **exported anytime** (`pg_dump`), moved to
any host, or **self-hosted** on your own servers. If Supabase vanished
tomorrow, your data is fully portable, not trapped in a proprietary format.

## Privacy policy highlights
- **Collects:** account info (name, email, GitHub handle), payment info (via
  Stripe), and usage data.
- **Your content:** Supabase acts only as a **processor** — you keep control.
- **Sharing:** limited to service providers (hosting, payments, analytics)
  under confidentiality terms; to law enforcement only when legally required.
- **Your rights (GDPR/CCPA):** access, correction, deletion, portability,
  consent withdrawal.
- **Retention:** life of your account + ~60 days after closure.

## Honest caveats
- **US company / CLOUD Act:** even in an EU region, a US company is subject to
  the US CLOUD Act — an EU region fixes *where data sits*, not *whose laws
  apply*. Fine for most communities; not for strict legal needs.
- **Hosted, not self-hosted:** on the free tier your data is on **Supabase's
  servers** (encrypted and certified — but theirs). "Never leaves your
  hardware" only applies if you self-host.

## How it compares

| | Supabase | Firebase (Google) | Raw AWS / Cloud SQL |
|---|---|---|---|
| Open source | ✅ Yes | ❌ No | ❌ No |
| Self-hostable | ✅ Yes | ❌ No | ➖ (it *is* the host) |
| Data portability | ✅ Standard SQL | ⚠️ Proprietary | ✅ Standard |
| Encryption & certs | ✅ SOC2 / ISO / HIPAA | ✅ Strong (Google) | ✅ Strong |
| Independent of Big-Tech ads | ✅ | ❌ (Google) | ➖ |

On raw encryption and certs, Supabase and Firebase are *both* strong.
Supabase's real edge for privacy-minded groups is **openness, data
portability, EU hosting, and not being inside Google's ecosystem.**

## What this means for RP Dynastree
- We use the **hosted free tier** — encrypted at rest/in transit, on certified
  infrastructure.
- With **no accounts**, access works via **hard-to-guess share links +
  database rules** (like Google Docs' "anyone with the link") — a good fit for
  **fictional OC/RP content**, which isn't sensitive personal data.
- Because it's open source, the community could **export or self-host**
  everything later if it ever wanted full control.

## Sources
- [Security at Supabase](https://supabase.com/security)
- [Supabase Privacy Policy](https://supabase.com/privacy)
- [Understanding API keys — Supabase Docs](https://supabase.com/docs/guides/getting-started/api-keys)
- [SOC 2 Compliance — Supabase Docs](https://supabase.com/docs/guides/security/soc-2-compliance)
- [HIPAA Compliance — Supabase Docs](https://supabase.com/docs/guides/security/hipaa-compliance)
- [Supabase is now HIPAA and SOC2 Type 2 compliant](https://supabase.com/blog/supabase-soc2-hipaa)
- [Available regions — Supabase Docs](https://supabase.com/docs/guides/platform/regions)
- [Supabase vs. Firebase comparison — Bytebase](https://www.bytebase.com/blog/supabase-vs-firebase/)
