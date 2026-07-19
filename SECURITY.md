# Security policy

## Supported version

Only the latest version on the default branch is supported before the first tagged
release. After launch, supported versions will be listed here.

## Security properties

- The shipping application is a self-contained static HTML file.
- A Content Security Policy blocks application network connections.
- Untrusted CSV values are inserted into the page with `textContent`, not HTML.
- Downloaded CSV descriptions are neutralized against spreadsheet formula execution.
- Input files are limited to 20 MB to reduce accidental browser exhaustion.
- The test suite evaluates the exact core logic embedded in the shipping file.

These controls do not make arbitrary CSV files harmless outside StatementLens. Do not
open an untrusted original statement in a spreadsheet application, and keep your browser
and operating system updated.

## Reporting a vulnerability

Use [GitHub private vulnerability reporting](https://github.com/matthewhurt12/statementlens/security/advisories/new)
for security-sensitive reports. For a normal bug, open a GitHub issue containing only a
minimal, fictional reproduction. Do not include real financial or personal data.

Please include the affected version, browser, impact, and reproduction steps. Do not
test against other users or a production system.

## Release security gate

Every public release must pass:

```bash
node test-logic.js
```

It must also pass a browser smoke test confirming zero application-initiated requests
while importing, filtering, and exporting fictional data.
