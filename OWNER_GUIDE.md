# 📖 Project Owner Complete Guide

Welcome to the Corelith Portfolio! This guide will walk you through everything you need to know about creating and managing your encrypted project in this repository.

## 📋 Table of Contents

1. [Getting Started](#getting-started)
2. [Step-by-Step Setup](#step-by-step-setup)
3. [Managing Your Project](#managing-your-project)
4. [Security Best Practices](#security-best-practices)
5. [Troubleshooting](#troubleshooting)
6. [FAQ](#faq)

---

## 🚀 Getting Started

### What You Need

- A GitHub account with write access to this repository
- Node.js (v14 or higher) installed locally
- Git installed on your machine
- Your project information ready

### Key Concepts

**Encryption Key**: A 32+ character key that only you have. This encrypts your sensitive project data.

**Project Folder**: Your project lives in `projects/[projectname]/`

**Owner File**: A `.owner` file that proves you're the project owner

**Encrypted Data**: Your `project.json` is encrypted and stored as `project.json.encrypted`

---

## 👷 Step-by-Step Setup

### Phase 1: Generate Your Encryption Key

**On your local machine**, run:

```bash
node scripts/generate-key.js
```

You'll see output like:
```
🔐 Generated Encryption Key:
────────────────────────────────────────────────────
AbCdEfGhIjKlMnOpQrStUvWxYz1234567890+/==
────────────────────────────────────────────────────

⚠️  IMPORTANT SECURITY NOTES:

1. Copy this key to a secure location
2. Add it to GitHub Secrets as "PROJECT_[name]_KEY"
3. Never commit this key to your repository
4. Never share this key with anyone
5. You cannot recover this project without this key
```

**✅ DO THIS NOW:**
- Copy the key to a text editor or password manager
- Save it somewhere safe (you'll lose access without it!)

### Phase 2: Add Your Key to GitHub Secrets

1. Go to: **https://github.com/corelith-technologies/corelith-portfolio/settings/secrets/actions**

2. Click **"New repository secret"**

3. Fill in:
   - **Name**: `PROJECT_myportfolio_KEY` (replace `myportfolio` with your project name in UPPERCASE)
   - **Value**: Paste your generated key

4. Click **"Add secret"**

### Phase 3: Initialize Your Project

In your terminal (in the repo directory):

```bash
./scripts/init-project.sh myportfolio "My Awesome Portfolio"
```

This creates:
```
projects/myportfolio/
├── .owner                    # Ownership verification
├── README.md                 # Public description
├── project.json              # Your project data (will encrypt)
└── data/
    └── media/                # Store images/files here
```

### Phase 4: Update Your Project Information

#### Update `.owner` File

Edit `projects/myportfolio/.owner`:

```json
{
  "username": "your-github-username",
  "email": "your.email@example.com",
  "created": "2026-08-28",
  "projectName": "myportfolio",
  "displayName": "My Awesome Portfolio"
}
```

**Important**: The `username` MUST match your GitHub username exactly!

#### Update `README.md`

This is **publicly visible**. Add:
- Project name and description
- Key features
- Technologies used
- Links to live demo, GitHub, etc.
- Contact information

Example:
```markdown
# My Awesome Portfolio

**Project Name**: myportfolio

## Overview

A comprehensive portfolio showcasing my web development projects, skills, and experience.

## Quick Links

- **Live Demo**: https://my-portfolio.com
- **GitHub Repository**: https://github.com/username/portfolio
- **Documentation**: https://docs.my-portfolio.com

## Key Features

- Responsive design
- Dark mode support
- Project filtering

## Technologies Used

- React
- Next.js
- Tailwind CSS
- Node.js

## Getting Started

Visit the live demo and explore my projects.

## Contact

Email: your.email@example.com
GitHub: @your-github-username

---

*Last updated: [current date]*
```

#### Update `project.json`

This is **encrypted** - only you can see it. Add all your detailed project information:

```json
{
  "name": "My Awesome Portfolio",
  "projectId": "myportfolio",
  "description": "A comprehensive portfolio showcasing my work",
  "longDescription": "Detailed description of what your project does, its purpose, and impact...",
  "status": "active",
  "technologies": [
    "React",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "MongoDB"
  ],
  "features": [
    "Responsive design - Works on all devices",
    "Dark mode - Easy on the eyes",
    "Project filtering - Find what you need",
    "Contact form - Get in touch"
  ],
  "links": {
    "github": "https://github.com/username/portfolio",
    "live": "https://my-portfolio.com",
    "documentation": "https://docs.my-portfolio.com",
    "portfolio": ""
  },
  "owner": {
    "name": "Your Full Name",
    "email": "your.email@example.com",
    "github": "your-github-username",
    "twitter": "@yourhandle",
    "linkedin": "your-linkedin-profile"
  },
  "team": [],
  "startDate": "2026-08-28",
  "endDate": null,
  "images": {
    "thumbnail": "images/thumbnail.jpg",
    "banner": "images/banner.jpg"
  },
  "stats": {
    "views": 0,
    "downloads": 0,
    "stars": 0,
    "forks": 0
  },
  "metadata": {
    "version": "1.0.0",
    "lastUpdated": "2026-08-28T12:00:00Z",
    "encrypted": true,
    "visibility": "private"
  }
}
```

### Phase 5: Commit and Push

```bash
# Add your project files
git add projects/myportfolio/

# Commit
git commit -m "Add myportfolio project"

# Push to repository
git push origin main
```

**GitHub Actions will automatically:**
1. ✅ Verify you're the project owner
2. ✅ Encrypt your `project.json`
3. ✅ Create `project.json.encrypted`
4. ✅ Delete the unencrypted version
5. ✅ Commit the encrypted version

---

## 📝 Managing Your Project

### View Your Encrypted Data Locally

To decrypt and view your project data on your machine:

```bash
node scripts/decrypt.js myportfolio
```

Enter your encryption key when prompted, and it will display your project data.

### Update Your Project

**To make changes:**

1. Decrypt your project:
   ```bash
   node scripts/decrypt.js myportfolio > temp.json
   ```

2. Edit the JSON file in your editor

3. Replace `project.json` with your updated version

4. Encrypt and commit:
   ```bash
   node scripts/encrypt.js myportfolio
   git add projects/myportfolio/
   git commit -m "Update myportfolio project"
   git push origin main
   ```

### Add Media Files

Store images and files in `projects/myportfolio/data/media/`:

```
projects/myportfolio/data/media/
├── thumbnail.jpg
├── banner.jpg
├── screenshot-1.png
└── screenshot-2.png
```

Reference them in your project.json:
```json
{
  "images": {
    "thumbnail": "data/media/thumbnail.jpg",
    "banner": "data/media/banner.jpg"
  }
}
```

---

## 🔐 Security Best Practices

### DO ✅

- ✅ Keep your encryption key in a secure location
- ✅ Store your key in a password manager (1Password, LastPass, etc.)
- ✅ Use a strong, unique key for each project
- ✅ Never share your key with anyone
- ✅ Review GitHub Actions logs to verify encryption worked
- ✅ Keep your GitHub account secure (enable 2FA)

### DON'T ❌

- ❌ Never commit your encryption key to git
- ❌ Never share your key in Slack, Email, or chat
- ❌ Don't use the same key for multiple projects
- ❌ Don't screenshot your key
- ❌ Don't include sensitive credentials in project.json
- ❌ Don't share your GitHub Secrets

### If You Lose Your Key 🚨

If you lose your encryption key:
1. You can no longer decrypt your project data
2. You'll need to delete the encrypted file and create a new key
3. **We cannot recover your data**

**Always backup your key!**

---

## 🆘 Troubleshooting

### GitHub Actions Failed

**Error in Actions tab?**

1. Go to: **Actions → Encrypt Project on Push**
2. Click the failing workflow run
3. Look for error messages

**Common Issues:**

| Error | Solution |
|-------|----------|
| "Only project owner can modify" | Check `.owner` username matches your GitHub username |
| "Encryption key not found in secrets" | Verify secret name is `PROJECT_[NAME]_KEY` in repository settings |
| "Permission Denied" | Ensure you have write access to the repository |
| "project.json not found" | Make sure you created `projects/[name]/project.json` |

### Decryption Failed Locally

```bash
$ node scripts/decrypt.js myportfolio
❌ Decryption failed. Please check your key and try again.
```

**Solutions:**

1. Verify you're using the correct key
2. Make sure the encrypted file exists at `projects/myportfolio/project.json.encrypted`
3. Ensure your key hasn't been modified or corrupted
4. Check that the project.json was properly encrypted by GitHub Actions

### Can't Push Changes

```bash
$ git push origin main
Permission denied
```

**Solutions:**

1. Verify you have write access to the repository
2. Check your GitHub authentication (SSH key or personal access token)
3. Ensure you're pushing to the correct repository

### Project Not Initializing

```bash
$ ./scripts/init-project.sh myportfolio "My Project"
bash: ./scripts/init-project.sh: Permission denied
```

**Solution:**

Make the script executable:
```bash
chmod +x scripts/init-project.sh
```

---

## ❓ FAQ

### Q: Can other people see my project data?

**A:** No! Only you can decrypt your `project.json.encrypted`. Everyone can see:
- Your project name
- Public `README.md` content
- Media files in `data/media/`

Your sensitive data in `project.json` is encrypted and unreadable to others.

### Q: What if I want to update my README?

**A:** The `README.md` is public and unencrypted. Just edit it, commit, and push:
```bash
# Edit projects/myportfolio/README.md
git add projects/myportfolio/README.md
git commit -m "Update README"
git push origin main
```

### Q: Can I share my project key with a team member?

**A:** We don't recommend it. The key is tied to you personally. If you need shared access, consider:
- Having the team member request owner transfer
- Using a shared password manager
- Creating separate projects for each team member

### Q: How do I change my encryption key?

**To rotate your key:**

1. Generate a new key: `node scripts/generate-key.js`
2. Decrypt your project: `node scripts/decrypt.js myportfolio`
3. Save the decrypted data
4. Add the new key to GitHub Secrets as `PROJECT_[name]_NEW_KEY`
5. Encrypt with the new key
6. Update the secret to remove the old key

### Q: What happens if I fork this repository?

**A:** Secrets are not forked. You'll need to:
1. Add your own secrets in the forked repository
2. Update the `.owner` file in your projects
3. Re-initialize projects with your information

### Q: Can I delete my project?

**A:** Yes! Simply:
1. Delete the `projects/[name]/` folder
2. Commit and push: `git commit -m "Remove myportfolio project"`
3. The project is now removed from history

**Note:** Git history can still be viewed, so deleted files aren't truly gone.

### Q: Is my data really encrypted?

**A:** Yes! We use **AES-256-CBC encryption**, which is:
- Military-grade encryption
- Industry standard (used by governments and banks)
- Virtually impossible to break without your key

### Q: How do I verify the encryption worked?

**A:** After pushing, check:

1. Go to **Actions** tab in GitHub
2. Click the latest "Encrypt Project on Push" workflow
3. You should see ✅ green checkmarks
4. The log will show "Project encrypted successfully"
5. In your repo, `project.json.encrypted` should exist (not `project.json`)

### Q: Can I encrypt multiple projects?

**A:** Absolutely! Create multiple projects:
```bash
./scripts/init-project.sh portfolio1 "Portfolio One"
./scripts/init-project.sh portfolio2 "Portfolio Two"
```

Each needs its own encryption key stored as:
- `PROJECT_PORTFOLIO1_KEY`
- `PROJECT_PORTFOLIO2_KEY`

---

## 📞 Support

Need help?

1. **Check this guide** - Most questions are answered here
2. **Review GitHub Actions logs** - Errors are usually explained there
3. **Check the main README.md** - Additional setup info
4. **Contact your repository administrator**

---

## 🎉 You're Ready!

Congratulations! You now have a secure, encrypted project in the Corelith Portfolio.

**Next steps:**
- ✅ Generate your encryption key
- ✅ Add it to GitHub Secrets
- ✅ Initialize your project
- ✅ Fill in your project information
- ✅ Push and let GitHub Actions encrypt it
- ✅ Share your portfolio with the world!

**Happy building! 🚀**

---

*Last updated: 2026-08-28*
*For the latest documentation, visit the repository README.md*
