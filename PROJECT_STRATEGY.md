# StatementLens: research, positioning, and launch strategy

Research date: 2026-07-19

## Executive decision

StatementLens is worth launching as a focused open-source utility and learning project.
It is not currently differentiated enough to launch as a broad personal-finance business.

The original pitch—“upload a bank CSV locally and see charts”—is already a crowded
category. The defensible version is narrower:

> **The bank-CSV inspector you can download, audit, and run as one offline HTML file.**

The product should compete on minimum trust surface, instant access, and inspectability.
It should not race established projects on PDF parsing, AI, budgeting, accounts, or
feature count.

## What already exists

| Product | What it proves | Implication for StatementLens |
|---|---|---|
| [SpendSum](https://spendsum.com/) | The exact browser-local CSV/PDF proposition exists, with custom rules, recurring charges, multi-bank history, a free tier, and paid plans. | “Private browser analyzer” alone is not differentiation. Avoid “works with any bank” and feature-for-feature competition. |
| [Spectra](https://github.com/francescogabrieli/Spectra) | Open-source local finance software can attract developers. At research time it showed 114 stars, 9 forks, five releases, CSV/PDF/OFX, SQLite, local/remote categorization, and Docker/Python setup. | StatementLens can own the opposite end: no install, no database, no dependency tree, and a much smaller audit surface. |
| [Better Bank Statements](https://www.betterbankstatements.com/) | Browser-local multi-file analysis and exports can use anonymous paid credits. | There may be willingness to pay, but a new project first needs evidence that people can import successfully. |
| [Where Money Went](https://wheremoneywent.com/) | Local processing plus saved categorization rules is another established approach. | Ephemeral, zero-persistence behavior is a meaningful distinction, but must be stated clearly. |
| [Open Accountant](https://openaccountant.ai/) | Local AI bookkeeping targets developers and freelancers and sells action-oriented insight rather than charts. | Generic charts are a weak end state. If StatementLens expands, it should add deterministic, explainable insights—not cloud AI by default. |
| [Moneywright](https://moneywright.com/) | A free open-source desktop app can offer PDF/CSV/Excel, recurring-charge detection, and optional BYO AI. | Desktop AI is a different, heavier product. Do not follow it until the single-file wedge has users. |

## Lessons from comparable launches

Spectra is a useful comparison. Its repository became a real maintained artifact with
releases and contributors, but its [Show HN thread](https://news.ycombinator.com/item?id=47197041)
received one point and four comments. The most substantive response challenged the word
“local” because optional Google Sheets and cloud AI were involved. The maker clarified
the privacy boundary and updated the README. The lesson is that technical audiences
will test privacy wording more aggressively than feature claims.

[Show HN's official guidance](https://news.ycombinator.com/showhn.html) favors work that
people can actually try, does not require sign-up, and has a maker present to discuss it.
[HN's general guidelines](https://news.ycombinator.com/newsguidelines.html) prohibit
soliciting votes and discourage using the community primarily as a promotion channel.
HN also currently asks unfamiliar accounts to [participate before posting a Show HN](https://news.ycombinator.com/showlim).

Implications:

- A working demo, source, tests, and a precise technical story matter more than launch copy.
- The maker must be available for the first discussion window and answer directly.
- Do not create a promotion-only account, ask for votes, or shotgun the same post across communities.
- One targeted launch followed by visible fixes is stronger than many identical announcements.

## Target user and job

Primary user: a developer, freelancer, or privacy-conscious spreadsheet user who has a
CSV export and wants a quick sanity check without creating an account or installing a
finance stack.

Core job:

> “Let me inspect this export in under a minute, understand the broad cash-flow shape,
> and leave no financial history behind.”

This user values source visibility and ephemerality more than synchronization. A person
who wants persistent budgets, automatic bank feeds, or household collaboration is not
the initial target.

## Product wedge

Required promises:

1. One downloadable HTML file.
2. No account, runtime dependency, storage, analytics, or transaction server.
3. A browser-enforced `connect-src 'none'` policy.
4. Clear, testable format support rather than “any bank.”
5. An explicit reset model: refresh removes everything.
6. Open-source tests that execute the shipping logic.

Recommended short description:

> Inspect a bank CSV in one offline HTML file. No upload, no account, no saved history.

Do not lead with “AI,” “budgeting,” “Mint replacement,” or “works with every bank.”
Those claims expand the comparison set and weaken credibility.

## The next differentiating feature

After real users validate the basic importer, build a **Format Doctor**, not PDF or AI:

- Explain the detected delimiter, header row, date column, amount convention, and confidence.
- Warn about ambiguous dates and positive/negative sign assumptions before analysis.
- Produce a normalized CSV.
- Generate a privacy-safe format fingerprint containing headers and parser decisions,
  never transaction values.
- Let users copy that fingerprint into an issue without sharing financial data.

This turns the hardest part—messy bank exports—into a transparent developer tool and
creates a safe contribution loop.

## Launch sequence

### Stage 0: release gate

- Final name check. `statementlens.com` already resolves to an unrelated login page;
  do not imply ownership of it. The `.app` name had no DNS record during research, but
  availability and trademarks were not verified.
- All logic tests green.
- Browser smoke test on Chromium and Firefox-sized viewports.
- Confirm zero requests during fictional import, filter, print, and CSV export.
- Review every public file for secrets, personal data, and placeholder URLs.
- GitHub private vulnerability reporting enabled.

### Stage 1: private compatibility test

Invite 5–10 trusted testers individually. Ask each to use the fictional demo first, then
their own CSV privately. Never request their statement. Collect only:

- Did automatic import finish?
- Did expense/income signs look correct?
- Was the first useful view reached in under one minute?
- If not, can they provide the exact header and two invented rows?

Gate to public launch: at least 8 completed attempts, 80% automatic-or-mapped import
success, no wrong-sign critical issue, and no privacy/security blocker.

### Stage 2: source and hosted preview

- Publish a GitHub repository with source, tests, license, privacy/security docs, and issue templates.
- Tag `v0.1.0` and attach the single `index.html` as a release asset.
- Connect the repository to Cloudflare Pages with no build command and no Functions.
- Keep the `pages.dev` preview until the final name/domain decision.
- Verify response headers and the full flow on the exact public candidate.

Cloudflare's [static HTML guide](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)
supports no-build static projects and preview deployments. Its [`_headers` documentation](https://developers.cloudflare.com/pages/configuration/headers/)
supports the CSP and other response headers included in this repository.

### Stage 3: public developer launch

Suggested title:

> Show HN: StatementLens – inspect a bank CSV in one offline HTML file

Suggested opening:

> I wanted the smallest bank-CSV sanity checker I could actually audit. StatementLens
> is one HTML file with no dependencies, storage, analytics, or backend. Its CSP blocks
> network connections, and the tests extract the parser directly from the shipping file.
> The tradeoff is intentional: CSV only, ephemeral, simple keyword categories, and US
> dollar display for now. I would especially value feedback on the trust model and on
> sanitized header layouts that fail detection—never real statements.

Link the runnable demo and source. Stay present for two hours. Treat criticism as product
research, record each concrete issue, and ship a small follow-up release within 48 hours.

### Stage 4: focused follow-up

Post only where the tool directly answers a community need and where self-promotion is
allowed. Tailor the explanation to the community; do not paste the same marketing copy.
Useful future channels may include local-first, open-source, self-hosted, and indie-maker
communities, but check each community's current rules immediately before posting.

## Success measures without surveillance

Do not add behavioral analytics just to produce a chart. Use voluntary, public signals:

- Compatibility attempts and pass/fail results from the private test sheet.
- GitHub clones/releases, stars, forks, issues, and outside contributors.
- Number of distinct sanitized bank-format fixtures added.
- Time from a compatibility report to a tested fix.
- Qualitative reports that the tool changed a real monthly review decision.

First 30-day target: 10 distinct successful real-format imports, three sanitized format
contributions, one outside contributor or detailed issue, and no unresolved high-severity
privacy or correctness bug. Stars are useful context, not the primary impact measure.

## What not to build yet

- Bank-account linking.
- User accounts, cloud history, or synchronization.
- Server-side statement processing.
- PDF/OCR parsing.
- Remote AI categorization.
- Payment, licensing, or advertising.
- A large design rewrite.

Any of these may eventually be valid, but each changes the trust model or moves directly
into a competitor's strongest territory. Earn the next feature through observed use.

## Security finding addressed during this review

CSV fields can execute as formulas when opened in spreadsheet software. The
[OWASP CSV Injection guidance](https://owasp.org/www-community/attacks/CSV_Injection)
describes the risk and the limitations of mitigations. StatementLens now quotes every
exported cell and prefixes formula-like untrusted descriptions with a tab. The original
bank CSV remains untrusted and should not be opened casually.

## Frankie's role from here

Frankie should act as a maintainer, not an endless feature generator:

1. Work from a prioritized issue or explicit experiment.
2. Make one test-backed change.
3. Re-run logic and browser privacy checks.
4. Update the changelog and status with evidence.
5. Stop when blocked instead of retrying a paid model indefinitely.

The old 20-minute loop encourages churn and exhausted its model credits. After the model
provider is funded or changed and the runner is fixed, use a lower cadence—at most once
or twice daily during pre-launch—and trigger urgent work manually from actual feedback.
