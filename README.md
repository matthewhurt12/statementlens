# StatementLens

StatementLens is a private bank-CSV inspector that runs entirely in one HTML file.
There is no account, backend, database, analytics, or transaction storage. Open the
source, save it, and run it offline.

**[Try StatementLens online](https://matthewhurt12.github.io/statementlens/)** ·
**[Download the offline HTML app](https://github.com/matthewhurt12/statementlens/releases/latest/download/statementlens.html)** ·
**[Report a bug or bank format](https://github.com/matthewhurt12/statementlens/issues/new/choose)**

Created by Matthew and maintained with Frankie, an AI research-and-build agent running
on a Raspberry Pi. The application itself contains no AI and makes no API calls.

## Why this project exists

Several products already analyze bank statements locally. StatementLens is deliberately
smaller: its advantage is an unusually easy-to-audit trust model.

- One self-contained `index.html`; no build and no dependencies.
- A Content Security Policy blocks network connections from the app.
- Transactions live only in memory and disappear on refresh.
- Categorization is transparent keyword matching, never a remote AI call.
- Unlimited CSV rows within a 20 MB file; no account or paid tier.

It is not a full budgeting system. It does not persist history, link bank accounts,
parse PDFs, detect subscriptions, or synchronize devices. For those jobs, consider a
full local-first tool such as Actual Budget, Firefly III, or Spectra.

## Run it

1. Download `statementlens.html` from the latest GitHub release (or save `index.html`).
2. Double-click it to open it in a modern desktop browser.
3. Select a CSV from your bank's transaction-history export, or use the fictional demo.

No installation or internet connection is needed. A hosted copy can provide the same
app, but the downloadable file is the strongest version of the privacy promise.

## What it shows

- Income, expenses, net cash flow, date range, and categorization coverage.
- Monthly income-versus-expense chart.
- Spending by category.
- Searchable, sortable, filterable transaction table.
- Plain-text, print/PDF, and categorized-CSV exports.

Exports follow the active filters. CSV descriptions are neutralized against spreadsheet
formula execution before download.

## CSV compatibility

StatementLens recognizes common header layouts used by Chase, Bank of America,
Capital One, Ally, Wells Fargo, Discover, Citibank, American Express, TD Bank, and
USAA, plus generic Date/Amount/Description layouts. These are heuristics, not a promise
that every export version from each bank will work.

If detection fails, the app opens a column mapper. It accepts comma, semicolon, and tab
delimiters, common US and European number formats, and unambiguous DD/MM/YYYY dates.
Ambiguous dates such as `05/06/2026` default to US month/day order. The current UI
displays dollar signs even when the numeric parser accepts other currency formats. Some
credit-card exports use positive values for purchases; the results screen includes an
explicit one-click sign reversal and asks the user to verify a known purchase.

Never attach a real statement to a public issue. Report only the header row and two
fully fictional sample rows. See `CONTRIBUTING.md`.

## Privacy and security model

- No `fetch`, XHR, WebSocket, external scripts, remote fonts, or analytics.
- `connect-src 'none'` is enforced in the HTML and by the recommended host headers.
- No localStorage, sessionStorage, cookies, IndexedDB, or service worker.
- File contents are processed by JavaScript in the current tab only.
- Refreshing or closing the tab removes the loaded data.

This model protects transaction contents from the application itself. Your browser,
operating system, extensions, downloaded files, static host, and bank remain outside
the project's control. Read `PRIVACY.md` and `SECURITY.md` for the exact boundary.

## Verify it

Run the dependency-free logic suite:

```bash
node test-logic.js
```

The test runner extracts the marked core logic directly from `index.html`, so it cannot
silently test a stale copy. The current suite contains 166 checks; run it locally to verify the current candidate.

For a manual privacy check, open DevTools, select the Network panel, clear it, and then
load the fictional demo or a safe test CSV. The application should initiate no request.

## Public deployment

The source and releases live on GitHub. The initial hosted copy uses GitHub Pages at
<https://matthewhurt12.github.io/statementlens/>. A later Cloudflare Pages mirror can
add response-level security headers; the HTML already enforces its core `connect-src
'none'` privacy boundary through a meta Content Security Policy.

Do not add server functions, a database, third-party analytics, or a remote error reporter.

See `LAUNCH.md` for the staged launch and `PROJECT_STRATEGY.md` for the research behind it.

## License

MIT. See `LICENSE`.
