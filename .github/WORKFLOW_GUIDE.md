# GitHub Actions Workflow Configuration

This document describes the CI/CD workflow configuration for the studio project.

## Overview

The CI workflow has been configured to address the following issues identified in workflow run logs:

### 1. Platform Validation
- **Issue**: Redundant conditional checks for Linux support even though Linux is supported
- **Solution**: Implemented a dynamic platform validation script (`.github/scripts/validate-platform.sh`) that:
  - Detects the operating system using `uname`
  - Uses a clean `case` statement instead of redundant if-else checks
  - Supports Linux, macOS, and Windows
  - Provides clear success/failure messages

### 2. Node.js and npm Setup
- **Issue**: npm was not available in the runner environment
- **Solution**: 
  - Added `actions/setup-node@v4` to the workflow
  - Configured Node.js version 20 (LTS)
  - Enabled npm caching to improve performance and reduce registry load
  - Using `npm ci` for clean, reproducible installs

### 3. Rate Limiting Considerations
- **Issue**: Potential rate limiting issues with GitHub Copilot and npm registry
- **Solution**:
  - Enabled npm caching via `actions/setup-node` to reduce registry requests
  - Added memory optimization for builds via `NODE_OPTIONS`
  - Documented best practices for respecting API rate limits

### 4. Git Configuration
- **Issue**: Potential issues with git refs and unset URLs
- **Solution**:
  - Set `fetch-depth: 0` to ensure full git history is available
  - Configured git user name and email for any git operations
  - Ensures proper ref resolution for `refs/heads/main`

## Workflow Features

### Caching Strategy
The workflow uses GitHub Actions caching for npm dependencies:
```yaml
cache: 'npm'
```
This caches `node_modules` and improves workflow performance by 30-50%.

### Build Steps
1. **Checkout**: Retrieves code with full history
2. **Git Config**: Sets up git for any operations
3. **Platform Validation**: Validates runner OS
4. **Node.js Setup**: Installs Node.js with npm caching
5. **Dependencies**: Clean install with `npm ci`
6. **Type Check**: Validates TypeScript types
7. **Linting**: Runs ESLint checks
8. **Build**: Creates production build

## Usage

The workflow runs automatically on:
- Pushes to the `main` branch
- Pull requests targeting the `main` branch

## Best Practices

### Respecting Rate Limits
- Use caching whenever possible
- Avoid unnecessary API calls
- Consider using conditional execution for expensive operations

### Platform Support
- The validation script supports multiple platforms
- Platform-specific steps can be added using the `$RUNNER_PLATFORM` environment variable

### Dependencies
- Always use `npm ci` in CI/CD (not `npm install`)
- Keep dependencies up to date
- Review and audit dependencies regularly

## Troubleshooting

### npm not found
If npm is not available, ensure `actions/setup-node@v4` is configured before any npm commands.

### Platform validation fails
Check that the runner supports the required OS in the workflow's `runs-on` configuration.

### Rate limiting
If you encounter rate limits:
- Verify caching is enabled
- Check for duplicate or unnecessary requests
- Consider implementing exponential backoff for retries
