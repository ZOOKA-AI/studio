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
    export RUNNER_PLATFORM="linux"
    ;;
  Darwin*)
    echo "✓ macOS platform detected and is supported"
    export RUNNER_PLATFORM="macos"
    ;;
  MINGW*|MSYS*|CYGWIN*)
    echo "✓ Windows platform detected and is supported"
    export RUNNER_PLATFORM="windows"
    ;;
  *)
    echo "✗ Unsupported platform: $CURRENT_OS"
    exit 1
    ;;
esac

echo "Platform validation completed successfully"
