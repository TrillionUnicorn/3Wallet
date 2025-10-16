#!/bin/bash

# 🧪 COMPLETE TESTING SCRIPT
# Tests ALL MVPs with real Playwright tests

set -e

echo "🧪 3Wallet - Complete Testing Suite"
echo "===================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Function to run tests for an MVP
run_mvp_tests() {
    local mvp_name=$1
    local mvp_path=$2
    
    echo -e "${BLUE}Testing $mvp_name${NC}"
    echo "-----------------------------------"
    
    # Copy MVP files to src/routes if not MVP-1
    if [ "$mvp_name" != "MVP-1" ]; then
        echo "Copying $mvp_name files to src/routes..."
        cp -r "$mvp_path"/* src/routes/ 2>/dev/null || true
    fi
    
    # Build the project
    echo "Building project..."
    if bun run build > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} Build successful"
    else
        echo -e "${RED}✗${NC} Build failed"
        return 1
    fi
    
    # Run Playwright tests
    echo "Running Playwright tests..."
    if bun run test --reporter=list 2>&1 | tee test-output.txt; then
        # Count passed/failed tests
        local passed=$(grep -c "✓" test-output.txt || echo "0")
        local failed=$(grep -c "✗" test-output.txt || echo "0")
        
        TOTAL_TESTS=$((TOTAL_TESTS + passed + failed))
        PASSED_TESTS=$((PASSED_TESTS + passed))
        FAILED_TESTS=$((FAILED_TESTS + failed))
        
        echo -e "${GREEN}✓${NC} Tests completed: $passed passed, $failed failed"
    else
        echo -e "${RED}✗${NC} Tests failed"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
    
    # Restore MVP-1 files if we changed them
    if [ "$mvp_name" != "MVP-1" ]; then
        echo "Restoring MVP-1 files..."
        git checkout src/routes/ 2>/dev/null || true
    fi
    
    echo ""
}

# Check if Bun is installed
if ! command -v bun &> /dev/null; then
    echo -e "${RED}✗${NC} Bun is not installed!"
    echo "Please run: curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    bun install
fi

# Install Playwright browsers if needed
if [ ! -d "node_modules/@playwright" ]; then
    echo "Installing Playwright browsers..."
    bunx playwright install --with-deps
fi

echo ""
echo "📋 Phase 1: Testing MVP-1 (Security-First)"
echo "==========================================="
run_mvp_tests "MVP-1" "src/routes"

echo ""
echo "📋 Phase 2: Testing MVP-2 (DeFi Power User)"
echo "============================================"
run_mvp_tests "MVP-2" "mvp-variants/mvp-2-defi/routes"

echo ""
echo "📋 Phase 3: Testing MVP-3 (Enterprise)"
echo "======================================="
run_mvp_tests "MVP-3" "mvp-variants/mvp-3-enterprise/routes"

# Summary
echo ""
echo "📊 Testing Summary"
echo "=================="
echo ""
echo -e "Total Tests:  ${BLUE}$TOTAL_TESTS${NC}"
echo -e "Passed:       ${GREEN}$PASSED_TESTS${NC}"
echo -e "Failed:       ${RED}$FAILED_TESTS${NC}"
echo ""

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}✓ All tests passed!${NC}"
    echo ""
    echo "🎯 Next Steps:"
    echo "  1. Review test results in playwright-report/"
    echo "  2. Check visual regression screenshots"
    echo "  3. Proceed to production development"
    echo ""
    exit 0
else
    echo -e "${RED}✗ Some tests failed!${NC}"
    echo "Please review the failures and fix them before proceeding."
    echo ""
    exit 1
fi

