#!/bin/bash

# 3Wallet Automated Setup Script
# Installs dependencies, runs tests, and verifies everything works

set -e  # Exit on error

echo "🚀 3Wallet Automated Setup"
echo "=========================="
echo ""

# Check if Bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Bun is not installed!"
    echo "📥 Installing Bun..."
    curl -fsSL https://bun.sh/install | bash
    
    # Add Bun to PATH
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"
    
    echo "✅ Bun installed successfully!"
else
    echo "✅ Bun is already installed ($(bun --version))"
fi

echo ""
echo "📦 Installing dependencies..."
bun install

echo ""
echo "🎭 Installing Playwright browsers..."
bunx playwright install --with-deps

echo ""
echo "🔍 Running type check..."
bun run check

echo ""
echo "🏗️  Building project..."
bun run build

echo ""
echo "🧪 Running Playwright tests..."
bun run test

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "  1. Run 'bun run dev' to start development server"
echo "  2. Visit http://localhost:5173"
echo "  3. Run 'bun run test:ui' to see test results"
echo ""

