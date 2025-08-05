#!/usr/bin/env tsx

import { execSync } from 'child_process';
import { join } from 'path';

const packages = [
  'shared',
  'core', 
  'reconciler',
  'dom'
];

async function buildPackage(pkg: string) {
  console.log(`\n🔨 Building @fancy-react/${pkg}...`);
  try {
    const pkgPath = join(process.cwd(), 'packages', pkg);
    execSync('pnpm build', { 
      cwd: pkgPath, 
      stdio: 'inherit' 
    });
    console.log(`✅ @fancy-react/${pkg} built successfully`);
  } catch (error) {
    console.error(`❌ Failed to build @fancy-react/${pkg}:`, error);
    process.exit(1);
  }
}

async function main() {
  console.log('🚀 Starting build process...');
  
  for (const pkg of packages) {
    await buildPackage(pkg);
  }
  
  console.log('\n🎉 All packages built successfully!');
}

main().catch(console.error); 