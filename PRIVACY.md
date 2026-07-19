# Privacy

StatementLens is designed to avoid collecting financial data, not merely to promise
careful handling of it.

## What the app processes

When you choose a CSV, the browser reads its contents into memory in the current tab.
The app parses transactions, calculates totals, and renders the results locally.

## What the project does not collect

- Bank statements, transactions, filenames, categories, or summaries.
- Names, email addresses, accounts, device identifiers, or payment information.
- Analytics, telemetry, crash reports, advertising identifiers, or tracking pixels.
- Cookies, localStorage, sessionStorage, IndexedDB, or service-worker caches.

StatementLens has no backend or transaction database. The application's Content
Security Policy blocks network connections. Closing or refreshing the tab clears the
in-memory analysis.

## Hosted-copy boundary

A static host necessarily receives ordinary web-request data when it serves the HTML,
such as IP address, timestamp, user agent, and requested path. It does not receive the
CSV contents through StatementLens. Download `index.html` and run it from your own
computer if you want to avoid visiting the hosted copy during analysis.

Browser extensions, endpoint-security software, your operating system, and files you
download are outside this project's control. Use a browser profile you trust for
sensitive financial work.

## Support and issue reports

Do not send a real statement. For compatibility reports, include only the header row
and two invented rows that preserve the same column layout. Remove names, account
numbers, addresses, balances, reference numbers, and recognizable transaction text.

## Changes to this model

Any future feature that stores data or sends data to another service must be opt-in,
clearly disclosed before use, and documented here. It must not silently weaken the
offline path.

Last updated: 2026-07-19.
