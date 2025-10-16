#!/bin/bash

# 🔍 ULTRA-COMPREHENSIVE VALIDATION SCRIPT
# Checks ALL files for issues, errors, and problems

set -e

echo "🔍 3Wallet - Ultra-Comprehensive Validation"
echo "==========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
    else
        echo -e "${RED}✗${NC} $2"
        ERRORS=$((ERRORS + 1))
    fi
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
    WARNINGS=$((WARNINGS + 1))
}

echo "📋 Phase 1: File Structure Validation"
echo "--------------------------------------"

# Check if all MVP directories exist
if [ -d "src/routes" ]; then
    print_status 0 "MVP-1 directory exists"
else
    print_status 1 "MVP-1 directory missing"
fi

if [ -d "mvp-variants/mvp-2-defi" ]; then
    print_status 0 "MVP-2 directory exists"
else
    print_status 1 "MVP-2 directory missing"
fi

if [ -d "mvp-variants/mvp-3-enterprise" ]; then
    print_status 0 "MVP-3 directory exists"
else
    print_status 1 "MVP-3 directory missing"
fi

# Check for required files
echo ""
echo "📄 Phase 2: Required Files Check"
echo "--------------------------------"

required_files=(
    "package.json"
    "playwright.config.ts"
    "svelte.config.js"
    "vite.config.ts"
    "tsconfig.json"
    "src/app.css"
    "src/app.html"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        print_status 0 "$file exists"
    else
        print_status 1 "$file missing"
    fi
done

# Check MVP-1 pages
echo ""
echo "📄 Phase 3: MVP-1 Pages Check"
echo "-----------------------------"

mvp1_pages=(
    "src/routes/+page.svelte"
    "src/routes/wallet/+page.svelte"
    "src/routes/pitch/+page.svelte"
    "src/routes/contact/+page.svelte"
)

for page in "${mvp1_pages[@]}"; do
    if [ -f "$page" ]; then
        print_status 0 "$page exists"
    else
        print_status 1 "$page missing"
    fi
done

# Check MVP-2 pages
echo ""
echo "📄 Phase 4: MVP-2 Pages Check"
echo "-----------------------------"

mvp2_pages=(
    "mvp-variants/mvp-2-defi/routes/+page.svelte"
    "mvp-variants/mvp-2-defi/routes/wallet/+page.svelte"
    "mvp-variants/mvp-2-defi/routes/pitch/+page.svelte"
    "mvp-variants/mvp-2-defi/routes/contact/+page.svelte"
)

for page in "${mvp2_pages[@]}"; do
    if [ -f "$page" ]; then
        print_status 0 "$page exists"
    else
        print_status 1 "$page missing"
    fi
done

# Check MVP-3 pages
echo ""
echo "📄 Phase 5: MVP-3 Pages Check"
echo "-----------------------------"

mvp3_pages=(
    "mvp-variants/mvp-3-enterprise/routes/+page.svelte"
    "mvp-variants/mvp-3-enterprise/routes/wallet/+page.svelte"
)

for page in "${mvp3_pages[@]}"; do
    if [ -f "$page" ]; then
        print_status 0 "$page exists"
    else
        print_status 1 "$page missing"
    fi
done

# Check components
echo ""
echo "🧩 Phase 6: Components Check"
echo "----------------------------"

components=(
    "src/lib/components/ui/Button.svelte"
    "src/lib/components/ui/Card.svelte"
    "src/lib/components/ui/Input.svelte"
    "src/lib/components/ui/Modal.svelte"
    "src/lib/components/wallet/WalletCard.svelte"
)

for component in "${components[@]}"; do
    if [ -f "$component" ]; then
        print_status 0 "$component exists"
    else
        print_status 1 "$component missing"
    fi
done

# Check for console.log (should not exist)
echo ""
echo "🔍 Phase 7: Code Quality Check"
echo "------------------------------"

console_logs=$(find src mvp-variants -name "*.svelte" -o -name "*.ts" | xargs grep -n "console\.log" 2>/dev/null || true)
if [ -z "$console_logs" ]; then
    print_status 0 "No console.log found"
else
    print_warning "console.log found (should use console.error for errors only)"
    echo "$console_logs"
fi

# Check for TODO comments
todos=$(find src mvp-variants -name "*.svelte" -o -name "*.ts" | xargs grep -n "TODO\|FIXME" 2>/dev/null || true)
if [ -z "$todos" ]; then
    print_status 0 "No TODO/FIXME comments"
else
    print_warning "TODO/FIXME comments found"
    echo "$todos"
fi

# Check for proper imports
echo ""
echo "📦 Phase 8: Import Validation"
echo "-----------------------------"

# Check if all Svelte files have proper imports
svelte_files=$(find src mvp-variants -name "*.svelte" 2>/dev/null)
for file in $svelte_files; do
    if grep -q "import.*from.*\$lib" "$file" 2>/dev/null; then
        # File has imports, check if they're correct
        if grep -q "import.*from '\$lib/components/ui/Button.svelte'" "$file" 2>/dev/null; then
            # Has Button import, check if it's used
            if ! grep -q "<Button" "$file" 2>/dev/null; then
                print_warning "Unused Button import in $file"
            fi
        fi
    fi
done

print_status 0 "Import validation complete"

# Check for TypeScript errors (if bun is installed)
echo ""
echo "🔧 Phase 9: TypeScript Check"
echo "---------------------------"

if command -v bun &> /dev/null; then
    if bun run check 2>&1 | grep -q "error"; then
        print_status 1 "TypeScript errors found"
        bun run check
    else
        print_status 0 "No TypeScript errors"
    fi
else
    print_warning "Bun not installed, skipping TypeScript check"
fi

# Check Tailwind classes
echo ""
echo "🎨 Phase 10: Tailwind CSS Check"
echo "-------------------------------"

# Check for common Tailwind v4 issues
deprecated_classes=$(find src mvp-variants -name "*.svelte" | xargs grep -n "transform\|filter\|backdrop-filter" 2>/dev/null || true)
if [ -z "$deprecated_classes" ]; then
    print_status 0 "No deprecated Tailwind v3 classes"
else
    print_warning "Deprecated Tailwind v3 classes found"
    echo "$deprecated_classes"
fi

# Check for conflicting classes
conflicting=$(find src mvp-variants -name "*.svelte" | xargs grep -n 'class=".*flex.*block' 2>/dev/null || true)
if [ -z "$conflicting" ]; then
    print_status 0 "No conflicting display classes"
else
    print_warning "Conflicting display classes found (flex + block)"
    echo "$conflicting"
fi

# Summary
echo ""
echo "📊 Validation Summary"
echo "===================="
echo ""
echo -e "Errors:   ${RED}$ERRORS${NC}"
echo -e "Warnings: ${YELLOW}$WARNINGS${NC}"
echo ""

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ All critical checks passed!${NC}"
    echo ""
    echo "🎯 Next Steps:"
    echo "  1. Run 'bun install' to install dependencies"
    echo "  2. Run 'bun run dev' to start development server"
    echo "  3. Run 'bun run test' to run Playwright tests"
    echo ""
    exit 0
else
    echo -e "${RED}✗ Found $ERRORS critical errors!${NC}"
    echo "Please fix the errors above before proceeding."
    echo ""
    exit 1
fi

