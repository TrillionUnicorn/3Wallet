#!/bin/bash

# CSS Validation Script
# Checks for common Tailwind CSS issues

echo "🎨 Validating Tailwind CSS..."
echo ""

# Check for duplicate classes
echo "🔍 Checking for duplicate Tailwind classes..."
find src -name "*.svelte" -type f -exec grep -H "class=" {} \; | while read line; do
    classes=$(echo "$line" | sed 's/.*class="\([^"]*\)".*/\1/')
    duplicates=$(echo "$classes" | tr ' ' '\n' | sort | uniq -d)
    if [ ! -z "$duplicates" ]; then
        echo "⚠️  Duplicate classes found: $duplicates"
        echo "   in: $line"
    fi
done

# Check for conflicting classes
echo ""
echo "🔍 Checking for conflicting Tailwind classes..."
find src -name "*.svelte" -type f -exec grep -H "class=" {} \; | while read line; do
    # Check for both flex and block
    if echo "$line" | grep -q "flex" && echo "$line" | grep -q "block"; then
        echo "⚠️  Conflicting display classes (flex + block)"
        echo "   in: $line"
    fi
    
    # Check for both hidden and block/flex
    if echo "$line" | grep -q "hidden" && (echo "$line" | grep -q "block" || echo "$line" | grep -q "flex"); then
        echo "⚠️  Conflicting visibility classes (hidden + block/flex)"
        echo "   in: $line"
    fi
done

# Check for deprecated Tailwind v3 classes
echo ""
echo "🔍 Checking for deprecated Tailwind v3 classes..."
deprecated_classes=(
    "transform"
    "filter"
    "backdrop-filter"
    "ring-offset-0"
)

for class in "${deprecated_classes[@]}"; do
    if grep -r "class=.*$class" src --include="*.svelte" > /dev/null; then
        echo "⚠️  Deprecated class found: $class"
        grep -rn "class=.*$class" src --include="*.svelte"
    fi
done

echo ""
echo "✅ CSS validation complete!"

