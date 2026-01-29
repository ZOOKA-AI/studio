# Contributing to Firebase Studio

Thank you for your interest in contributing to Firebase Studio! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue on GitHub with:
- A clear title and description
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, Node.js version, etc.)

### Suggesting Features

We love feature suggestions! Please create an issue with:
- A clear description of the feature
- Why this feature would be useful
- Any examples or mockups if applicable

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Make your changes**:
   - Follow the existing code style
   - Write clear commit messages
   - Add tests if applicable
4. **Test your changes**:
   - Run `npm run lint` to check for linting errors
   - Run `npm run typecheck` to verify TypeScript types
   - Run `npm run build` to ensure the build works
5. **Format your code**: `npm run format`
6. **Submit a pull request**

## Development Setup

1. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/studio.git
cd studio
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` with your Firebase credentials:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

## Code Style Guidelines

- Use TypeScript for all new code
- Follow the existing code structure and naming conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Use async/await instead of callbacks

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add user profile page
fix: resolve Firebase auth error
docs: update README setup instructions
```

## Code Review Process

1. All submissions require review before merging
2. Maintainers will review your PR and may request changes
3. Address any feedback and push updates to your branch
4. Once approved, a maintainer will merge your PR

## Community

- Be respectful and inclusive
- Follow our [Code of Conduct](CODE_OF_CONDUCT.md)
- Help others in discussions and issues
- Share your knowledge and experience

## Questions?

Feel free to ask questions by:
- Creating a GitHub Discussion
- Commenting on relevant issues
- Reaching out to maintainers

Thank you for contributing! 🎉
