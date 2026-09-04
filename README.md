# Corelith Portfolio

A secure, collaborative portfolio repository where developers and creators can showcase their individual projects. Each project is protected by encryption, and only the project owner has full control over their project data.

## Features

- **Individual Project Control**: Each project owner has complete control over their project
- **Encrypted Privacy**: Sensitive project data is encrypted using GitHub Secrets
- **Public Visibility**: Everyone can see project names and descriptions
- **Secure Access**: Only project owners can decrypt and modify their project data
- **Automated Workflows**: GitHub Actions handle encryption/decryption automatically
- **Version Control**: Complete git history of all changes
- **No External Dependencies**: Everything runs on GitHub

## Repository Structure

```
corelith-portfolio/
├── projects/
│   ├── project-1/
│   │   ├── project.json (encrypted)
│   │   ├── README.md (public)
│   │   ├── data/
│   │   └── .owner (project owner info)
│   ├── project-2/
│   │   └── ...
├── scripts/
│   ├── init-project.sh
│   ├── encrypt.js
│   ├── decrypt.js
│   └── validate-owner.js
├── .github/
│   └── workflows/
│       ├── encrypt-project.yml
│       └── validate-owner.yml
├── .gitignore
└── OWNER_GUIDE.md (this file)
```

## Quick Start for Project Owners

### Step 1: Create Your Project Key

Generate a secure random key (minimum 32 characters):

```bash
node scripts/generate-key.js
```

Or generate manually:
```bash
openssl rand -base64 32
```

**Save this key securely** - you'll need it to access your project.

### Step 2: Add Your Key to GitHub Secrets

1. Go to your repository settings: `Settings → Secrets and variables → Actions`
2. Click "New repository secret"
3. **Name**: `PROJECT_[YOUR_PROJECT_NAME]_KEY` (e.g., `PROJECT_myportfolio_KEY`)
4. **Value**: Paste your generated key
5. Click "Add secret"

### Step 3: Initialize Your Project

1. Clone the repository:
```bash
git clone https://github.com/corelith-technologies/corelith-portfolio.git
cd corelith-portfolio
```

2. Run the initialization script:
```bash
./scripts/init-project.sh myportfolio "My Project Name"
```

This creates:
```
projects/myportfolio/
├── project.json (encrypted template)
├── README.md (public description)
├── data/
└── .owner (ownership verification)
```

### Step 4: Add Your Project Data

Edit `projects/myportfolio/project.json` with your project details:

```json
{
  "name": "My Awesome Project",
  "description": "A brief description",
  "technologies": ["Node.js", "React", "PostgreSQL"],
  "features": [
    "Feature 1",
    "Feature 2"
  ],
  "links": {
    "github": "https://github.com/...",
    "live": "https://..."
  },
  "owner": {
    "name": "Your Name",
    "email": "your.email@example.com",
    "github": "your-github-username"
  }
}
```

### Step 5: Commit and Encrypt

Commit your changes:
```bash
git add projects/myportfolio/
git commit -m "Add myportfolio project"
git push origin main
```

GitHub Actions will automatically:
1.  Validate that you're the project owner
2.  Encrypt your `project.json` file
3.  Commit the encrypted version
4.  Update the repository

##  Security & Encryption

### How Encryption Works

1. **Your Key**: Stored only in GitHub Secrets (never in code)
2. **Your Data**: Encrypted using AES-256 encryption
3. **Decryption**: Only you can decrypt using your secret key
4. **Automation**: GitHub Actions handles all encryption/decryption

### Viewing Your Project Data

To decrypt and view your project locally:

```bash
node scripts/decrypt.js myportfolio
```

You'll be prompted for your key, and the decrypted data will be displayed.

### Updating Your Project

1. Decrypt your project file
2. Make changes
3. Re-encrypt and commit
4. GitHub Actions will handle the rest

##  Project Ownership

Each project has a `.owner` file that contains:

```json
{
  "username": "your-github-username",
  "email": "your-email@example.com",
  "created": "2026-08-28",
  "publicKey": "base64-encoded-public-key"
}
```

**Only the owner listed in this file can modify the project.**

##  Available Commands

### Initialize a new project
```bash
./scripts/init-project.sh projectname "Project Display Name"
```

### Encrypt a project
```bash
node scripts/encrypt.js projectname
```

### Decrypt a project (view locally)
```bash
node scripts/decrypt.js projectname
```

### Validate project ownership
```bash
node scripts/validate-owner.js projectname
```

### Generate a new key
```bash
node scripts/generate-key.js
```

##  Checklist for New Projects

- [ ] Generated a secure key
- [ ] Added key to GitHub Secrets as `PROJECT_[name]_KEY`
- [ ] Ran `init-project.sh` to create project folder
- [ ] Created `project.json` with project details
- [ ] Created `README.md` with public description
- [ ] Committed changes
- [ ] Verified GitHub Actions completed successfully
- [ ] Verified `.owner` file was created with your username

##  Important Notes

1. **Never commit your encryption key** - it should only exist in GitHub Secrets
2. **Keep your key secure** - losing it means you lose access to your project data
3. **One key per project** - each project has its own encryption key
4. **Only you can modify** - GitHub Actions validates ownership before encrypting
5. **Encrypted files are in git** - but only decryptable with your key

##  Troubleshooting

### "Permission Denied" Error
- Verify you're listed in the `.owner` file
- Check your GitHub secret is named correctly: `PROJECT_[name]_KEY`
- Ensure your key matches the one used to create the project

### "Decryption Failed"
- Verify you're using the correct key
- Check that the `.owner` file lists you as the owner
- Try re-encrypting the file

### GitHub Actions Failed
- Check the Actions tab for error messages
- Verify the secret name matches exactly
- Ensure `project.json` exists in your project folder

##  Support

For issues or questions:
1. Check the troubleshooting section
2. Review the GitHub Actions logs
3. Contact the repository administrators

##  License

This portfolio is maintained by Corelith Technologies.

---

Happy building! 
