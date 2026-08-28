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

async function encryptProject(projectName) {
  const projectDir = path.join(__dirname, '..', 'projects', projectName);
  const projectJsonPath = path.join(projectDir, 'project.json');
  const encryptedPath = path.join(projectDir, 'project.json.encrypted');

  if (!fs.existsSync(projectDir)) {
    console.error(`❌ Project '${projectName}' not found!`);
    rl.close();
    process.exit(1);
  }

  if (!fs.existsSync(projectJsonPath)) {
    console.error(`❌ project.json not found in '${projectName}'!`);
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
    // Read the project file
    const plaintext = fs.readFileSync(projectJsonPath, 'utf8');
    
    // Generate a random IV (initialization vector)
    const iv = crypto.randomBytes(16);
    
    // Create cipher
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(key.padEnd(32, '\0').slice(0, 32)),
      iv
    );

    // Encrypt the data
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Combine IV and encrypted data
    const encryptedData = iv.toString('hex') + ':' + encrypted;

    // Write encrypted file
    fs.writeFileSync(encryptedPath, encryptedData);
    
    // Remove original file
    fs.unlinkSync(projectJsonPath);

    console.log(`\n✅ Project '${projectName}' encrypted successfully!`);
    console.log(`📄 Encrypted file: project.json.encrypted`);
    console.log(`\n⚠️  Original project.json has been removed.`);
    console.log(`💡 Keep your encryption key safe!`);
    
    rl.close();
  } catch (error) {
    console.error('❌ Encryption failed:', error.message);
    rl.close();
    process.exit(1);
  }
}

const projectName = process.argv[2];

if (!projectName) {
  console.error('Usage: node encrypt.js <projectname>');
  rl.close();
  process.exit(1);
}

encryptProject(projectName);
