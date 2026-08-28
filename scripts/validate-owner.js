const fs = require('fs');
const path = require('path');

async function validateOwner(projectName, username) {
  const projectDir = path.join(__dirname, '..', 'projects', projectName);
  const ownerFilePath = path.join(projectDir, '.owner');

  if (!fs.existsSync(projectDir)) {
    console.error(`❌ Project '${projectName}' not found!`);
    process.exit(1);
  }

  if (!fs.existsSync(ownerFilePath)) {
    console.error(`❌ .owner file not found in '${projectName}'!`);
    process.exit(1);
  }

  try {
    const ownerData = JSON.parse(fs.readFileSync(ownerFilePath, 'utf8'));
    
    if (ownerData.username === username) {
      console.log(`✅ User '${username}' is the owner of '${projectName}'`);
      process.exit(0);
    } else {
      console.error(`❌ User '${username}' is NOT the owner of '${projectName}'`);
      console.error(`   Owner: ${ownerData.username}`);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Failed to read owner file:', error.message);
    process.exit(1);
  }
}

const projectName = process.argv[2];
const username = process.argv[3] || process.env.GITHUB_ACTOR || process.env.USER;

if (!projectName) {
  console.error('Usage: node validate-owner.js <projectname> [username]');
  process.exit(1);
}

validateOwner(projectName, username);
