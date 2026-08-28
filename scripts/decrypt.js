const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function decryptProject(projectName) {
  const projectDir = path.join(__dirname, '..', 'projects', projectName);
  const encryptedPath = path.join(projectDir, 'project.json.encrypted');
  const projectJsonPath = path.join(projectDir, 'project.json');

  if (!fs.existsSync(projectDir)) {
    console.error(`❌ Project '${projectName}' not found!`);
    rl.close();
    process.exit(1);
  }

  if (!fs.existsSync(encryptedPath)) {
    if (fs.existsSync(projectJsonPath)) {
      console.log('ℹ️  project.json is not encrypted yet');
      const data = fs.readFileSync(projectJsonPath, 'utf8');
      console.log('\n📄 Project Data:');
      console.log(data);
      rl.close();
      return;
    }
    console.error(`❌ project.json.encrypted not found in '${projectName}'!`);
    rl.close();
    process.exit(1);
  }

  // Read the encryption key
  const key = await askQuestion('🔑 Enter your encryption key: ');
  
  if (key.length < 32) {
    console.error('❌ Encryption key must be at least 32 characters!');
    rl.close();
    process.exit(1);
  }

  try {
    // Read the encrypted file
    const encryptedData = fs.readFileSync(encryptedPath, 'utf8');
    
    // Split IV and encrypted data
    const [ivHex, encrypted] = encryptedData.split(':');
    const iv = Buffer.from(ivHex, 'hex');

    // Create decipher
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(key.padEnd(32, '\0').slice(0, 32)),
      iv
    );

    // Decrypt the data
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    console.log('\n✅ Decryption successful!\n');
    console.log('📄 Project Data:');
    console.log('─'.repeat(50));
    console.log(JSON.stringify(JSON.parse(decrypted), null, 2));
    console.log('─'.repeat(50));
    
    rl.close();
  } catch (error) {
    console.error('❌ Decryption failed. Please check your key and try again.');
    console.error('Error:', error.message);
    rl.close();
    process.exit(1);
  }
}

const projectName = process.argv[2];

if (!projectName) {
  console.error('Usage: node decrypt.js <projectname>');
  rl.close();
  process.exit(1);
}

decryptProject(projectName);
