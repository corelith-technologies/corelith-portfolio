const crypto = require('crypto');

function generateKey() {
  // Generate a 32-byte (256-bit) random key
  const key = crypto.randomBytes(32).toString('base64');
  
  console.log('\n🔐 Generated Encryption Key:');
  console.log('─'.repeat(60));
  console.log(key);
  console.log('─'.repeat(60));
  console.log('\n⚠️  IMPORTANT SECURITY NOTES:\n');
  console.log('1. Copy this key to a secure location');
  console.log('2. Add it to GitHub Secrets as "PROJECT_[name]_KEY"');
  console.log('3. Never commit this key to your repository');
  console.log('4. Never share this key with anyone');
  console.log('5. You cannot recover this project without this key\n');
}

generateKey();
