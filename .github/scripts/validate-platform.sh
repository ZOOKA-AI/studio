#!/bin/bash
# Platform validation script for GitHub Actions
# This script validates the runner operating system

set -e

# Get the current OS
CURRENT_OS=$(uname -s)

echo "Current OS: $CURRENT_OS"

# Validate supported platforms
case "$CURRENT_OS" in
  Linux*)
    echo "✓ Linux platform detected and is supported"
    RUNNER_PLATFORM="linux"
    ;;
  Darwin*)
    echo "✓ macOS platform detected and is supported"
    RUNNER_PLATFORM="macos"
    ;;
  MINGW*|MSYS*|CYGWIN*)
    echo "✓ Windows platform detected and is supported"
    RUNNER_PLATFORM="windows"
    ;;
  *)
    echo "✗ Unsupported platform: $CURRENT_OS"
    exit 1
    ;;
esac

# Export to GitHub Actions environment for subsequent steps
if [ -n "$GITHUB_ENV" ]; then
  echo "RUNNER_PLATFORM=$RUNNER_PLATFORM" >> "$GITHUB_ENV"
fi

echo "Platform validation completed successfully"
