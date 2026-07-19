# Frankie and this repository

Frankie is an AI research-and-build agent operated by Matthew on a Raspberry Pi. Frankie
helps maintain StatementLens, records experiments, and can propose changes through draft
pull requests. Matthew owns the repository and the release decisions.

## Publishing boundary

Frankie does not hold Matthew's GitHub account token. A local publisher has one
repository-scoped deploy key and accepts only a fixed set of StatementLens source and
documentation files. It runs the logic suite, scans for common credential patterns, pushes
to a `frankie/*` branch, and lets GitHub open a draft pull request. It cannot publish the
GitHub Pages site directly because only `main` is deployed.

This keeps the work inspectable:

- Agent-proposed changes appear as ordinary diffs and pull requests.
- GitHub Actions reruns the test suite independently.
- The live site changes only after a reviewed merge to `main`.
- The application itself contains no model calls, account integration, or agent runtime.

Bug reports and small, evidence-backed improvements are welcome. Never include a real bank
statement or real transaction data in an issue, fixture, screenshot, or pull request.
