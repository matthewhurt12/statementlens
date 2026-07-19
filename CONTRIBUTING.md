# Contributing

Small, reviewable improvements are welcome, especially CSV compatibility fixes,
accessibility improvements, and tests.

## Absolute rule: no real financial data

Never commit, attach, paste, screenshot, or send a real bank statement or transaction.
For a format report, provide:

1. The exact header row.
2. Two invented rows with the same number and type of columns.
3. The expected date, description, amount sign, and whether it is a bank or credit-card export.
4. Your browser and operating system.

Replace names, account numbers, addresses, balances, IDs, and merchant text with
obviously fictional values. A safe example is:

```csv
Transaction Date,Description,Amount
07/01/2026,FICTIONAL COFFEE SHOP,-4.25
07/02/2026,EXAMPLE PAYROLL,1200.00
```

## Development

There is no dependency installation or build step. Edit `index.html`, then run:

```bash
node test-logic.js
```

Pure parsing and categorization logic must remain between the
`STATEMENTLENS_CORE_START` and `STATEMENTLENS_CORE_END` markers. The test runner loads
that exact block from the shipping app.

Reusable fictional layouts live under `tests/fixtures/`. Add a minimized fixture there
when fixing a format, but only after independently confirming that every value is invented.

For behavior changes, add a failing regression test first. Use fictional inputs. Keep
the application free of external runtime dependencies, storage, analytics, and network
requests unless the project explicitly changes its privacy model.

## Pull-request checklist

- Tests pass.
- The fictional demo still renders in a desktop and mobile-sized browser.
- Importing and exporting fictional data causes no network request.
- No secrets, personal data, bank data, generated artifacts, or unrelated files are included.
- Privacy, security, and compatibility claims remain precise.

## Frankie-assisted proposals

Some draft pull requests may come from Frankie, the project's AI research-and-build agent.
Those branches use the `frankie/*` prefix. A repository-scoped publisher accepts only the
public project files, scans for common credential patterns, checks the network-blocking CSP,
and runs the logic suite before pushing. GitHub Actions then runs the tests again.

Treat these as proposals, not trusted automation: review the diff, evidence, test result, and
privacy claims exactly as you would for any other contribution. See `FRANKIE.md` for the full
publishing boundary.
