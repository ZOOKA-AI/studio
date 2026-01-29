# CI/CD Workflows

This repository includes automated workflows for continuous integration and security scanning.

## Workflows

### 1. CodeQL (Static Application Security Testing)
- **File**: `.github/workflows/codeql.yml`
- **Purpose**: Performs static code analysis to identify security vulnerabilities and code quality issues
- **Runs on**: 
  - Push to `main` or `master` branches
  - Pull requests to `main` or `master` branches
  - Weekly schedule (Mondays at midnight UTC)
- **Language**: JavaScript/TypeScript

### 2. Secret Scanning
- **File**: `.github/workflows/secret-scanning.yml`
- **Purpose**: Scans the codebase for accidentally committed secrets, API keys, and credentials
- **Tool**: TruffleHog
- **Runs on**: 
  - Push to `main` or `master` branches
  - Pull requests to `main` or `master` branches
- **Configuration**: Only verified secrets are reported to reduce false positives

### 3. CI (Continuous Integration)
- **File**: `.github/workflows/ci.yml`
- **Purpose**: Ensures code quality through linting, type checking, and building
- **Jobs**:
  - **Lint and Type Check**: Runs ESLint and TypeScript type checking
  - **Build**: Builds the Next.js application
- **Runs on**: 
  - Push to `main` or `master` branches
  - Pull requests to `main` or `master` branches

## Security Features

These workflows help ensure:
- Code is free from common security vulnerabilities (CodeQL)
- No secrets are accidentally committed (Secret Scanning)
- Code meets quality standards (Linting and Type Checking)
- Application builds successfully (Build)

## Viewing Results

Results from these workflows can be viewed in:
- The **Actions** tab of the GitHub repository
- The **Security** tab for CodeQL and secret scanning results
- Pull request checks for any failing workflows
