#!/usr/bin/env node

/**
 * Verification script to check if the project is set up correctly
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying 3Wallet Setup...\n');

let errors = 0;
let warnings = 0;

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 18) {
  console.error('❌ Node.js version must be 18 or higher');
  console.error(`   Current version: ${nodeVersion}`);
  errors++;
} else {
  console.log(`✅ Node.js version: ${nodeVersion}`);
}

// Check if package.json exists
if (fs.existsSync('package.json')) {
  console.log('✅ package.json found');
} else {
  console.error('❌ package.json not found');
  errors++;
}

// Check if node_modules exists
if (fs.existsSync('node_modules')) {
  console.log('✅ node_modules found (dependencies installed)');
} else {
  console.warn('⚠️  node_modules not found - run "npm install"');
  warnings++;
}

// Check if .env.local exists
if (fs.existsSync('.env.local')) {
  console.log('✅ .env.local found');
} else {
  console.warn('⚠️  .env.local not found - copy from .env.local.example');
  warnings++;
}

// Check required directories
const requiredDirs = [
  'app',
  'components',
  'lib',
  'public',
];

requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`✅ ${dir}/ directory found`);
  } else {
    console.error(`❌ ${dir}/ directory not found`);
    errors++;
  }
});

// Check required files
const requiredFiles = [
  'next.config.js',
  'tailwind.config.js',
  'tsconfig.json',
  'postcss.config.js',
];

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} found`);
  } else {
    console.error(`❌ ${file} not found`);
    errors++;
  }
});

// Summary
console.log('\n📊 Summary:');
console.log(`   Errors: ${errors}`);
console.log(`   Warnings: ${warnings}`);

if (errors === 0 && warnings === 0) {
  console.log('\n✅ Setup verification passed! You can run "npm run dev"');
  process.exit(0);
} else if (errors === 0) {
  console.log('\n⚠️  Setup has warnings but should work');
  process.exit(0);
} else {
  console.log('\n❌ Setup verification failed. Please fix the errors above.');
  process.exit(1);
}

