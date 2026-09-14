const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const filesToWatch = [
  './src/input.css',
  './tailwind.config.js'
];

const checksums = new Map();

function getFileChecksum(file) {
  try {
    const stats = fs.statSync(file);
    return `${stats.mtimeMs}-${stats.size}`;
  } catch (e) {
    return null;
  }
}

function buildCSS() {
  console.log(`\n🔨 Building CSS at ${new Date().toLocaleTimeString()}...`);
  try {
    execSync('npx tailwindcss -i ./src/input.css -o ./assets/output.css', {
      stdio: 'inherit'
    });
    console.log('✅ Build complete!');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
  }
}

function checkChanges() {
  let hasChanges = false;

  filesToWatch.forEach(file => {
    const currentChecksum = getFileChecksum(file);
    const previousChecksum = checksums.get(file);

    if (currentChecksum && currentChecksum !== previousChecksum) {
      if (previousChecksum !== undefined) {
        console.log(`📝 Change detected in: ${file}`);
        hasChanges = true;
      }
      checksums.set(file, currentChecksum);
    }
  });

  if (hasChanges) {
    buildCSS();
  }
}

// Initial build
console.log('👀 Starting CSS watcher...');
console.log('Watching:', filesToWatch.join(', '));
console.log('\n💡 To view the site:');
console.log('   - Open index.html with Live Server extension (VS Code/IDE)');
console.log('   - Or run: python -m http.server 3000');
console.log('   - Or simply open index.html in your browser');
console.log('\nPress Ctrl+C to stop\n');

// Initialize checksums
filesToWatch.forEach(file => {
  checksums.set(file, getFileChecksum(file));
});

buildCSS();

// Check for changes every 1.5 seconds
setInterval(checkChanges, 1500);
