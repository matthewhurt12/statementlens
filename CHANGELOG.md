# StatementLens — Changelog

All significant changes across the build process. Most recent first.

---

## v0.1.0 — 2026-07-19

First public open-source release. Source, issues, automated tests, an offline HTML
download, and the hosted demo are available through GitHub.

### Correctness and security

- Reject invalid ISO calendar dates such as `2024-02-31` instead of accepting JavaScript's silently normalized date. Added valid-leap-day and invalid-ISO-date regressions; the suite now contains 166 checks.

- Fixed `CVS/PHARMACY` being captured as Shopping by the `macy` substring.
- Added recognition for the common `IRS ... TAX REF` income description.
- Fixed Discover-style `Trans. Date` priority when `Post Date` is also present.
- Added an explicit amount-sign check and reversible sign flip for credit-card exports.
- Added spreadsheet-formula neutralization to categorized CSV descriptions.
- Added a 20 MB input limit to reduce accidental browser exhaustion.
- Added an enforceable meta Content Security Policy with `connect-src 'none'`.
- Added Cloudflare Pages `_headers` for CSP, clickjacking, referrer, MIME, permissions,
  and opener isolation controls.

### Testing and maintenance

- Tests now extract and evaluate the actual pure-logic block from `index.html`; they no
  longer rely only on a drifting duplicate implementation.
- Expanded the suite to 164 passing checks, including CSV-injection regressions.
- Added privacy, security, contribution, issue-template, research, and staged-launch docs.
- Repositioned the project as a single-file, zero-persistence inspector rather than an
  undifferentiated full finance app.

## Earlier Frankie build history (unreleased prototype, completed 2026-07-18)

### Initial prototype

#### Data input & parsing
- Drag-and-drop or file-picker CSV intake
- Hand-rolled CSV parser: quoted fields, BOM stripping, CRLF/LF normalization
- `findHeaderRowIdx()`: scans up to 8 rows to skip account-summary metadata rows that some banks prepend before the actual column headers
- Column auto-detection for 10 US bank formats:
  - Chase (checking + credit cards)
  - Bank of America
  - Capital One (separate Debit/Credit columns)
  - Ally
  - Wells Fargo (asterisk placeholder columns)
  - Discover
  - Citibank
  - American Express
  - TD Bank
  - USAA
- Generic fallback: any CSV with recognizable Date / Amount / Description headers
- Column mapper UI when auto-detection confidence is low — shows sample values from first 2 data rows to help users pick correctly
- International date support: DD/MM/YYYY auto-detected when first component > 12; invalid dates (e.g. Feb 31) return null rather than silently wrapping
- Amount parsing: handles `$`, `-`, `(negative)`, currency symbols, thousands separators

#### Categorization
- `PRE_CHECKS` array: priority patterns evaluated before the main category sweep
  - Prevents `amazon web services` being miscategorized as Shopping (instead of Subscriptions)
  - `uber eats` → Food & Drink (not Transport)
  - `tst*` (Toast POS) → Food & Drink
  - `amzn mktp` → Shopping
  - `enterprise rent` / `budget rent` → Transport
- 10 spending categories with keyword matching (~120 keywords):
  Food & Drink · Shopping · Transport · Housing · Healthcare · Entertainment · Subscriptions · Utilities · Income · Transfers · Uncategorized
- Word-boundary second pass for short terms: standalone `rent` and `landlord` match Housing without false-positives (`current`, `parent`)
- Common bank description truncations handled: `wholefds`, `chick fil`, `wal-mart`, `amzn mktp`, `costco whse`, `direct dep`, etc.

#### Charts
- **Monthly Cash Flow bar chart**: income vs. expenses bars per month, up to 24 months; pure SVG, no external library
  - Click any month bar to filter the table to that month
  - Toggle off by clicking the same bar again
  - Non-selected months dim to 28% opacity; selected month gets a blue underline + bold label
  - `aria-pressed`, keyboard accessible (Enter/Space)
- **Spending by Category bar chart**: horizontal bars, sorted by total; dynamically reflects the active month filter
  - Chart title changes to "Spending by Category — Jan 26" when a month filter is active
  - Click any bar to filter the table to that category

#### Transaction table
- Searchable (description + category), sortable (all columns), filterable (category + month + search simultaneously)
- Category pills on each row are clickable (adds category filter)
- 300-row display cap for interactive performance
- Filter + sort badges above the table
- Combined AND logic: category filter + month filter + search all apply simultaneously

#### Summary cards
- Total Income, Total Expenses, Net (Surplus/Deficit), Date Range, Auto-Categorized %
- Auto-Categorized % card is clickable when uncategorized transactions exist — filters table to Uncategorized

#### Exports
- All exports respect currently active filters (category, month, search)
- **Copy summary text**: plain text with income/expenses/categories; notes active filters and row count
- **Download categorized CSV**: filtered rows only; filename includes active filter description
- **Print / Save as PDF**: expands table to all filtered rows (bypasses 300-row display cap); hides UI chrome; shows clean print header with date range, row count, and filter description; category bar colors preserved

#### Privacy model
- Zero external dependencies (no CDN, no fonts, no images, no analytics)
- Zero network requests after initial page load
- All data processed in JavaScript in the browser tab
- Refreshing the page clears all data
- localStorage not used
- Verify using DevTools → Network tab

#### UX details
- "Try with 6 months of sample data" button: loads 63 fictional transactions instantly, shows yellow demo banner with "Load my own CSV" reset
- "How do I download my bank's CSV?" accordion: per-bank step-by-step instructions for 5 major banks
- Skip link for keyboard navigation
- Focus moves to results heading after file loads (screen reader friendly)
- `aria-live` regions for dynamic content
- Mobile responsive: single-column at 720px; touch-friendly category bars at 480px
- Drop zone propagation: clicking sample data or bank guide accordion does not open file picker

#### Deployment
- Single `index.html` file (~72KB all-in-one)
- Opens from filesystem (double-click), or host on any static server
- No build step, no server configuration, no environment variables
- Designed for static hosts such as GitHub Pages, Netlify, and Cloudflare Pages
- Open Graph + Twitter Card meta tags for link previews (og:url placeholder — update after deployment)
- Inline SVG emoji favicon (no network request)
- robots meta: index, follow

---

## File structure

```
project/
  index.html       ← complete application
  README.md        ← usage docs, bank download guide, privacy verification
  LICENSE          ← MIT
  LAUNCH.md        ← step-by-step operator deployment guide + Show HN draft
  CHANGELOG.md     ← this file
  test-logic.js    ← Node.js tests (166 checks, dev/operator verification)
```

---

## Known limitations at release

- SVG chart axis labels scale small (~7px) on very narrow mobile screens (~320px)
- No PDF statement parsing (v2 feature — requires pdf.js)
- Ambiguous dates where both components are ≤12 (e.g. `05/06/2024`) default to MM/DD; column mapper fallback handles edge cases
- The UI displays dollar signs even when the parser accepts European numeric separators
- Bank-brand recognition is based on header heuristics; a public, sanitized compatibility corpus does not exist yet
- Uncommon or regional bank description truncations may land in Uncategorized; submit via GitHub Issues

---

## License

MIT — free to use, modify, and distribute.
