#!/usr/bin/env tsx

import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const baseGitignore = `# Dependencies
node_modules/

# Build outputs
dist/
build/
*.tsbuildinfo

# Environment variables
.env*

# IDE and editor files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Coverage and test results
coverage/
*.lcov
.nyc_output
test-results/

# Cache directories
.cache/
.rollup.cache/
.npm/

# Optional eslint cache
.eslintcache

# Temporary folders
tmp/
temp/

# Package outputs
*.tgz

# TypeScript cache
*.tsbuildinfo

# Local development
local.config.*
config.local.*
`;

const domGitignore = baseGitignore + `

# DOM specific
# Test artifacts
test-results/
playwright-report/
*.png
*.jpg
*.jpeg
*.gif
*.svg

# Browser artifacts
*.crx
*.pem
`;

const testUtilsGitignore = baseGitignore + `

# Test specific
# Test artifacts
test-results/
playwright-report/
*.png
*.jpg
*.jpeg
*.gif
*.svg

# Screenshots
screenshots/
`;

const packages = [
  'shared',
  'core',
  'reconciler',
  'scheduler',
  'server-runtime',
  'eslint-plugin',
  'native',
  'devtools'
];

const specialPackages = {
  'dom': domGitignore,
  'test-utils': testUtilsGitignore
};

async function setupGitignore() {
  console.log('🔧 Setting up .gitignore files for all packages...');
  
  // Setup regular packages
  for (const pkg of packages) {
    const gitignorePath = join(process.cwd(), 'packages', pkg, '.gitignore');
    
    if (!existsSync(gitignorePath)) {
      writeFileSync(gitignorePath, baseGitignore);
      console.log(`✅ Created .gitignore for @fancy-react/${pkg}`);
    } else {
      console.log(`ℹ️  .gitignore already exists for @fancy-react/${pkg}`);
    }
  }
  
  // Setup special packages
  for (const [pkg, content] of Object.entries(specialPackages)) {
    const gitignorePath = join(process.cwd(), 'packages', pkg, '.gitignore');
    
    if (!existsSync(gitignorePath)) {
      writeFileSync(gitignorePath, content);
      console.log(`✅ Created .gitignore for @fancy-react/${pkg}`);
    } else {
      console.log(`ℹ️  .gitignore already exists for @fancy-react/${pkg}`);
    }
  }
  
  console.log('\n🎉 All .gitignore files are set up!');
}

setupGitignore().catch(console.error); 