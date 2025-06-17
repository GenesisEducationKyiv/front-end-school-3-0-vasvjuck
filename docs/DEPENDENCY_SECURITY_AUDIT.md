# Dependency Security Audit – Musicvvv Frontend

**Date:** June 13, 2025

---

## 1. Purpose
This document audits all front-end dependencies used in `Musicvvv`, identifying any packages with known vulnerabilities, assessing their security posture, and recommending replacements if necessary.

---

## 2. Scope & Affected Packages
During the audit, all dependencies were evaluated for known vulnerabilities.

### Identified Vulnerability

| Package | Version | CVE | Severity | Description | Fixed In |
|--------|---------|-----|----------|-------------|----------|
| axios | ^1.8.4 | CVE‑2025‑27152 | High (7.5) | SSRF & credential leakage when absolute URLs are passed—even if `baseURL` is set. | 1.8.2+ |

All other packages, including `@radix-ui` components and UI libraries, are free of known vulnerabilities as of the audit date.

---

## 3. Zero-Day Vulnerability Policy
To ensure long-term security compliance, `Musicvvv` follows this policy:

- **Monitoring Tools**: `Dependabot`, `CodeQL`.
- **Critical Handling**: high/critical issues trigger blocked builds and immediate patching or dependency replacement.

---

## 4. Recommended Change – Replace `axios` with `ky`

### Why Replace?
- `axios` currently has an active high-severity vulnerability (SSRF).
- `ky` offers a safer and more modern alternative, built on top of the Fetch API.

### Security Assessment of `ky`

1. **Maintenance**: actively maintained with regular releases.
2. **Audit Results**: no known vulnerabilities reported on Snyk/npm audit.
3. **Code Review**: minimal code surface area and no unsafe URL parsing logic.
4. **License**: MIT – safe for commercial and open-source use.
5. **Dependencies**: zero transitive dependencies – minimizes attack surface.

---

## 5. Audit Summary

| Package | Status | Action |
|--------|--------|--------|
| axios |  CVE‑2025‑27152 – High | ✅ Replace with `ky` |
| All others | ✅ No known vulnerabilities | 🔁 Ongoing monitoring via CI/CD security tools |

---