# Contributing to Firebase Studio

Thank you for your interest in contributing to Firebase Studio! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Code Style](#code-style)
- [Submitting Changes](#submitting-changes)

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/studio.git
   cd studio
   ```

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your Firebase and Google AI credentials
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. (Optional) Start Firebase emulators:
   ```bash
   npm run firebase:emulators
   ```

## Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our [Code Style](#code-style) guidelines

3. Test your changes:
   ```bash
   npm run typecheck
   npm run lint
   npm run build
   ```

## Code Style

- We use **ESLint** for linting
- We use **Prettier** for code formatting
- Run `npm run format` before committing
- All TypeScript code should pass type checking

### Formatting Commands

```bash
# Check formatting
npm run format:check

# Fix formatting
npm run format

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## Submitting Changes

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

2. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

3. Open a Pull Request on GitHub

## Pull Request Guidelines

- Provide a clear description of the changes
- Link any related issues
- Ensure all checks pass
- Update documentation if needed
- Follow the code style guidelines

## Questions?

Feel free to open an issue for any questions or concerns.

---

Thank you for contributing! 🎉
