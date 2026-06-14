# Cloudflare Pages — Data & Privacy Reference

*A plain-language reference for the RP Dynastree community. Compiled June 2026
from Cloudflare's security/privacy docs and independent comparisons (see
Sources). Policies change — check the links for the latest.*

## First, the key point
Cloudflare Pages hosts RP Dynastree's **public app** — the pages, styling,
JavaScript, and images. **It does not hold your tree data.** That lives in
**Supabase**: your browser loads the app from Cloudflare, then talks
**directly to Supabase** for tree contents, which never passes through
Cloudflare's storage. Cloudflare hosts the "building"; Supabase holds what's
inside.

## TL;DR
Cloudflare is a large, US-based internet-infrastructure company with one of the
**strongest privacy reputations** in the business — it earns money from
security/performance, **not advertising**, so it has no reason to mine your
data. It holds the major security and **privacy** certifications, gives every
site **free automatic HTTPS**, **never sells** personal data, **refuses to
weaken encryption** for governments, and publishes transparency reports. Main
caveat (same as Supabase): it's a **US company**, so US law like the CLOUD Act
can apply.

## Security & encryption
- **Certifications:** SOC 2 Type II, ISO 27001:2022, **ISO 27701** (the privacy
  standard — as both processor *and* controller), ISO 27018, and PCI DSS.
- **Encryption:** **free automatic HTTPS** (TLS) on every site — the padlock,
  no setup; data at rest on Cloudflare's infrastructure is encrypted. Cloudflare
  commits to **never** hand governments its keys or build weakened encryption.

## Where your data lives
Cloudflare runs a **global edge network** so the app loads from a server near
each visitor. It **primarily stores data in the US and the EEA**. For strict EU
needs it offers an enterprise **Data Localisation Suite** to keep regulated data
in the EU (more than a small community needs, but good to know it exists).

## Privacy stance — the differentiator
- **Not an ad company:** unlike Google (which owns Firebase *and* GitHub Pages),
  Cloudflare's business is security/performance, so your traffic isn't ad fuel.
- **Never sells data:** *"We do not sell personal data we process, or use it for
  any purpose other than delivering our services."*
- **Stands up to governments:** requires valid legal process, notifies customers
  of subpoenas unless gagged, refuses keys/weakened encryption, and publishes
  **semi-annual transparency reports**.
- **EU-U.S. Data Privacy Framework certified** (plus Swiss-U.S. and UK
  extensions), with Standard Contractual Clauses as a fallback, built into its
  standard Data Processing Addendum.
- **Optional free analytics** use **no cookies and no fingerprinting**, and
  don't track people across sites.

## No lock-in
The app is plain **HTML/CSS/JavaScript** — standard files that run on any host.
We could move them to Netlify, Vercel, GitHub Pages, or anywhere else with no
rewrite; nothing is trapped in a Cloudflare-only format.

## Privacy policy highlights
- **Collects from us (the account holder):** admin contact details, service
  configuration, billing info (no full card numbers stored), and admin-action
  logs.
- **Visitors' data:** as host/CDN, Cloudflare processes site traffic (e.g. the
  request and visitor IP — which any web server sees) to deliver and protect the
  site, acting as a **processor** on our behalf.
- **Your rights (GDPR/CCPA):** access, correct, delete, port, object — via
  **sar@cloudflare.com**, answered within **30 days**.
- **Retention:** no fixed timetable; kept "as long as needed" for stated
  purposes and legal duties.
- **Sharing:** vetted service providers (instruction-bound, **may not sell**),
  within the Cloudflare group, and when legally compelled.

## What Cloudflare actually "sees" for RP Dynastree
- The **public app files** (already public — it's a website).
- **That a visitor loaded the site, and their IP** (normal for any host).
- **Not your tree data** — that goes browser-to-Supabase directly.

## Honest caveats
- **US company / CLOUD Act:** same as Supabase — US legal process can reach it.
  A non-issue for fictional RP content.
- **Hosted, not self-hosted:** runs on Cloudflare's servers (encrypted,
  certified — but theirs).
- **Share tokens travel in the link:** a share link carries its secret token in
  the address (`…?t=TOKEN`), so any host/CDN could in principle see it in
  request logs. True of **every** "anyone with the link" system on **any** host;
  the data is fictional and Cloudflare doesn't sell or mine it — but the secrecy
  rests on the link staying private.

## How it compares (free static hosting)

| | Cloudflare Pages | Netlify | Vercel | GitHub Pages |
|---|---|---|---|---|
| Free bandwidth | ✅ Unlimited | ⚠️ ~100 GB/mo, then bills | ⚠️ ~100 GB/mo, then bills | ⚠️ ~100 GB soft |
| Free HTTPS | ✅ | ✅ | ✅ | ✅ |
| Privacy-first reputation | ✅ Strong (no ads) | ➖ Neutral | ➖ Neutral | ⚠️ Google-owned |
| Cookieless analytics included | ✅ Free | ⚠️ Paid | ⚠️ Paid | ❌ |
| Independent of Big-Tech ads | ✅ | ✅ | ✅ | ❌ (Google) |

All four give free HTTPS and suit a small static site. Cloudflare Pages' edges
for us: **unlimited free bandwidth** (no surprise bills), a genuinely
**privacy-first**, non-ad company, and **free cookieless analytics** if we want
them.

## What this means for RP Dynastree
- Cloudflare hosts the **public app**; **Supabase** holds the **private tree
  data** — the sensitive part never touches Cloudflare's storage.
- We use the **free tier**: unlimited bandwidth/requests, free HTTPS, and
  generous limits (20,000 files/site, 500 builds/month, 100 custom domains) —
  far beyond what we need.
- Plain HTML/CSS/JS means we're **never locked in**.
- For **fictional OC/RP content** shared by link, Cloudflare's privacy stance,
  free encryption, and no-ads model are a strong, low-risk fit.

## Sources
- [Cloudflare Privacy Policy](https://www.cloudflare.com/privacypolicy/)
- [Cloudflare and GDPR compliance](https://www.cloudflare.com/trust-hub/gdpr/)
- [ISO Certifications FAQs — Cloudflare Trust Hub](https://www.cloudflare.com/trust-hub/compliance-resources/iso-certifications/)
- [Certifications and Compliance Resources — Cloudflare](https://www.cloudflare.com/trust-hub/compliance-resources/)
- [Cloudflare's ISO/IEC 27701 privacy certification (blog)](https://blog.cloudflare.com/iso-27701-privacy-certification/)
- [Cloudflare Data Processing Addendum](https://www.cloudflare.com/cloudflare-customer-dpa/)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- [Cloudflare Pages — Limits](https://developers.cloudflare.com/pages/platform/limits/)
- [Cloudflare Pages — Functions pricing (unlimited static requests)](https://developers.cloudflare.com/pages/functions/pricing/)
- [Cloudflare Web Analytics (privacy-first, cookieless)](https://www.cloudflare.com/web-analytics/)
