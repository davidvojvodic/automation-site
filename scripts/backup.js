#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Backup script for Flowko website
 * Creates backups of critical files and configurations
 */

const timestamp = new Date().toISOString().split('T')[0];
const backupDir = `backups/${timestamp}`;

function createBackup() {
  console.log('🔄 Starting backup process...');
  
  try {
    // Create backup directory
    if (!fs.existsSync('backups')) {
      fs.mkdirSync('backups');
    }
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Backup package.json and lock files
    console.log('📦 Backing up package files...');
    fs.copyFileSync('package.json', path.join(backupDir, 'package.json'));
    if (fs.existsSync('package-lock.json')) {
      fs.copyFileSync('package-lock.json', path.join(backupDir, 'package-lock.json'));
    }

    // Backup configuration files
    console.log('⚙️  Backing up configuration...');
    const configFiles = [
      'next.config.ts',
      'tailwind.config.ts',
      'tsconfig.json',
      '.eslintrc.json',
      'middleware.ts'
    ];
    
    configFiles.forEach(file => {
      if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join(backupDir, file));
      }
    });

    // Backup environment template
    if (fs.existsSync('.env.example')) {
      fs.copyFileSync('.env.example', path.join(backupDir, '.env.example'));
    }

    // Create git info backup
    console.log('📝 Backing up git information...');
    try {
      const gitCommit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
      const gitBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
      const gitRemote = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
      
      const gitInfo = {
        commit: gitCommit,
        branch: gitBranch,
        remote: gitRemote,
        timestamp: new Date().toISOString(),
        backupDate: timestamp
      };
      
      fs.writeFileSync(
        path.join(backupDir, 'git-info.json'), 
        JSON.stringify(gitInfo, null, 2)
      );
    } catch (error) {
      console.warn('⚠️  Could not backup git information:', error.message);
    }

    // Create deployment info
    console.log('🚀 Creating deployment info...');
    const deploymentInfo = {
      backupDate: timestamp,
      nodeVersion: process.version,
      platform: process.platform,
      environment: process.env.NODE_ENV || 'development',
      domain: 'flowko.io',
      hosting: 'Vercel',
      repository: 'GitHub'
    };
    
    fs.writeFileSync(
      path.join(backupDir, 'deployment-info.json'),
      JSON.stringify(deploymentInfo, null, 2)
    );

    console.log(`✅ Backup completed successfully!`);
    console.log(`📁 Backup location: ${backupDir}`);
    console.log(`📋 Files backed up:`);
    console.log(`   - Configuration files`);
    console.log(`   - Package dependencies`);
    console.log(`   - Git information`);
    console.log(`   - Deployment details`);

  } catch (error) {
    console.error('❌ Backup failed:', error.message);
    process.exit(1);
  }
}

// Run backup
createBackup();