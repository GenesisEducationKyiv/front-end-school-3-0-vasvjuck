## DEPENDENCY SECURITY AUDIT

**Date:** June 12, 2025

---

### 1. Purpose
This document summarizes the security audit of all packages. It verifies that each package meets security standards, outlines the methodology, records findings.

### 2. Scope
All packages listed under `dependencies` and `devDependencies` in the project’s `package.json` as of June 12, 2025:

| Package                                | Version       | Type            |
|----------------------------------------|---------------|-----------------|
| @hookform/resolvers                   | ^5.0.1        | dependency      |
| @mobily/ts-belt                       | ^3.13.1       | dependency      |
| @radix-ui/react-alert-dialog          | ^1.1.10       | dependency      |
| @radix-ui/react-checkbox              | ^1.2.2        | dependency      |
| @radix-ui/react-context-menu          | ^2.2.10       | dependency      |
| @radix-ui/react-dialog                | ^1.1.10       | dependency      |
| @radix-ui/react-dropdown-menu         | ^2.1.10       | dependency      |
| @radix-ui/react-label                 | ^2.1.4        | dependency      |
| @radix-ui/react-menubar               | ^1.1.10       | dependency      |
| @radix-ui/react-popover               | ^1.1.10       | dependency      |
| @radix-ui/react-scroll-area           | ^1.2.5        | dependency      |
| @radix-ui/react-select                | ^2.2.2        | dependency      |
| @radix-ui/react-separator             | ^1.1.4        | dependency      |
| @radix-ui/react-slot                  | ^1.2.0        | dependency      |
| @radix-ui/react-tabs                  | ^1.1.7        | dependency      |
| @radix-ui/react-tooltip               | ^1.2.3        | dependency      |
| @tanstack/react-query                 | ^5.74.4       | dependency      |
| axios                                  | ^1.8.4        | dependency      |
| class-variance-authority               | ^0.7.1        | dependency      |
| clsx                                   | ^2.1.1        | dependency      |
| cmdk                                   | ^1.1.1        | dependency      |
| framer-motion                          | ^12.7.4       | dependency      |
| lucide-react                          | ^0.501.0      | dependency      |
| next                                   | 15.3.1        | dependency      |
| next-themes                           | ^0.4.6        | dependency      |
| postcss                                | ^8.5.3        | dependency      |
| react                                  | ^19.0.0       | dependency      |
| react-dom                              | ^19.0.0       | dependency      |
| react-hook-form                        | ^7.56.0       | dependency      |
| sonner                                 | ^2.0.3        | dependency      |
| tailwind-merge                         | ^3.2.0        | dependency      |
| tw-animate-css                         | ^1.2.5        | dependency      |
| zod                                    | ^3.24.3       | dependency      |
| @eslint/js                             | ^9.27.0       | devDependency   |
| @tailwindcss/postcss                   | ^4.1.4        | devDependency   |
| @types/lodash.debounce                 | ^4.0.9        | devDependency   |
| @types-node                            | ^20           | devDependency   |
| @types/react                           | ^19           | devDependency   |
| @types/react-dom                       | ^19           | devDependency   |
| eslint                                 | ^9.25.0       | devDependency   |
| eslint-config-next                     | 15.3.1        | devDependency   |
| lodash.debounce                        | ^4.0.8        | devDependency   |
| openapi-typescript                     | ^7.6.1        | devDependency   |
| tailwindcss                            | ^4.1.4        | devDependency   |
| typescript                             | ^5.8.3        | devDependency   |
| typescript-eslint                      | ^8.33.0       | devDependency   |

### 3. Methodology
1. **Automated scan**: ran `npm audit --omit=dev` to detect known vulnerabilities in `dependencies`.  
2. **Secondary scan**: used Snyk CLI to cross-verify findings and detect issues not yet present in npm advisories.  
3. **OWASP dependency-check**: ensured coverage of CVEs in our supply chain.  
4. **Manual review**: for high-value packages (UI frameworks, HTTP clients), inspected GitHub security advisories and release notes.  
5. **Zero-day policy**: maintain subscriptions to Dependabot, Snyk alerts, and security mailing lists. All new reports trigger a triage within 24 hours.

### 4. Findings
All packages have been verified against public vulnerability databases as of June 12, 2025:

| Package               | Severity of Findings | Action Taken               |
|-----------------------|----------------------|----------------------------|
| **Dependencies**      |                      |                            |
| *All listed above*    | No critical/zero-day | No action required         |
| **Dev Dependencies**  |                      |                            |
| *All listed above*    | No critical          | No action required         |


### 5. Zero-Day Vulnerability Policy
- **Monitoring:** GitHub Dependabot, Snyk alerts, vendor mailing lists.  
- **Triage:** Security team reviews notifications within 24 hours, assigns severity based on impact.  
- **Response:** For high/critical issues, block new builds, create PRs for immediate patch or replacement.

### 6. Remediation & Ongoing Measures
- **CI Integration:** `npm audit` gating on high/critical; Snyk CLI in nightly jobs.  
- **Scheduled Reviews:** Quarterly dependency re-audit and version bump.  
- **Documentation Updates:** This file lives in `docs/` and is updated on each audit cycle.
