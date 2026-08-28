# 🤝 Contributing to Corelith Portfolio

Thank you for your interest in contributing to the Corelith Portfolio! This guide will help you add your project to our shared portfolio repository.

## 📋 Table of Contents

1. [Before You Start](#before-you-start)
2. [Adding Your Project](#adding-your-project)
3. [Best Practices](#best-practices)
4. [Code of Conduct](#code-of-conduct)
5. [Getting Help](#getting-help)

---

## 🎯 Before You Start

### Prerequisites

You need:
- ✅ A GitHub account
- ✅ Write access to this repository (you'll be invited as a collaborator)
- ✅ Node.js v14+ installed locally
- ✅ Git installed on your machine
- ✅ Your project information ready

### What You'll Create

Each project occupies its own folder with:
```
projects/yourprojectname/
├── .owner                    # Ownership verification file
├── README.md                 # Public project description
├── project.json              # Encrypted project data
└── data/
    └── media/                # Store images and files
```

---

## 🚀 Adding Your Project

### Step 1: Accept the Invitation

You'll receive an invitation to collaborate on this repository. Click the link in your email and accept it.

### Step 2: Clone the Repository

```bash
git clone https://github.com/corelith-technologies/corelith-portfolio.git
cd corelith-portfolio
```

### Step 3: Generate Your Encryption Key

This key will protect your project data:

```bash
node scripts/generate-key.js
```

**⚠️ Important**: Save this key somewhere safe! You cannot access your project without it.

### Step 4: Add Your Key to Repository Secrets

1. Go to: **Settings → Secrets and variables → Actions**
2. Click **"New repository secret"**
3. **Name**: `PROJECT_yourprojectname_KEY`
4. **Value**: Paste your generated key
5. Click **"Add secret"**

### Step 5: Initialize Your Project

```bash
./scripts/init-project.sh yourprojectname "Your Project Display Name"
```

This creates your project directory with template files.

### Step 6: Fill in Your Project Information

**Edit `.owner` file** - Replace with your information:
```json
{
  "username": "your-github-username",
  "email": "your@email.com",
  "created": "2026-08-28",
  "projectName": "yourprojectname",
  "displayName": "Your Project Display Name"
}
```

**Edit `README.md`** - This is public! Add:
- Project description
- Features
- Technologies used
- Links to live demo and GitHub
- How to get started
- Contact information

**Edit `project.json`** - This is encrypted! Add detailed info:
- Complete project description
- All features
- Technologies
- Team information
- Statistics
- Links and contact details

### Step 7: Commit and Push

```bash
# Stage your project files
git add projects/yourprojectname/

# Commit with a descriptive message
git commit -m "Add yourprojectname project"

# Push to the repository
git push origin main
```

### Step 8: GitHub Actions Will Encrypt Automatically

After pushing, GitHub Actions will:
1. ✅ Verify you're the project owner
2. ✅ Encrypt your `project.json`
3. ✅ Create `project.json.encrypted`
4. ✅ Remove the unencrypted version
5. ✅ Commit everything

**Check the Actions tab** to verify it completed successfully (look for green ✅ checkmarks).

---

## ✨ Best Practices

### Project Naming

- ✅ Use lowercase, hyphen-separated names: `my-awesome-project`
- ✅ Keep it short and memorable
- ✅ Avoid spaces and special characters
- ❌ Don't use: `My Awesome Project!`, `MyAwesomeProject`, etc.

### README.md (Public)

This is visible to everyone. Include:

```markdown
# Your Project Name

**Project ID**: your-project-name

## Overview
Brief description of what your project does.

## Quick Links
- [Live Demo](https://link-to-demo)
- [GitHub Repository](https://github.com/...)
- [Documentation](https://docs-link)

## Key Features
- Feature 1
- Feature 2
- Feature 3

## Technologies
- Technology 1
- Technology 2

## Getting Started
How someone can use or interact with your project.

## Contact
your.email@example.com
```

### project.json (Encrypted)

This is only readable by you. Be detailed:

```json
{
  "name": "Your Project Name",
  "description": "Brief description",
  "longDescription": "Detailed description...",
  "status": "active",
  "technologies": ["Tech1", "Tech2"],
  "features": ["Feature 1", "Feature 2"],
  "links": {
    "github": "https://github.com/...",
    "live": "https://example.com",
    "documentation": "https://docs.example.com"
  },
  "owner": {
    "name": "Your Full Name",
    "email": "your@email.com",
    "github": "your-github-username",
    "twitter": "@yourhandle",
    "linkedin": "your-profile"
  }
}
```

### File Organization

```
projects/yourproject/
├── .owner                    # ✅ Required
├── README.md                 # ✅ Required (public)
├── project.json              # ✅ Required (encrypts automatically)
├── data/
│   └── media/
│       ├── thumbnail.jpg     # ✅ Use for preview
│       ├── banner.jpg        # ✅ Use for header
│       └── screenshot-1.png  # ✅ Additional images
└── .gitkeep                  # Auto-created
```

### Media Files

- **Keep file sizes reasonable** (< 5MB each)
- **Use common formats**: JPG, PNG, GIF, WebP
- **Organize in data/media/** folder
- **Name clearly**: `thumbnail.jpg`, `screenshot-1.png`

### Commit Messages

Use clear, descriptive messages:

```bash
# ✅ Good
git commit -m "Add my-portfolio project with initial data"
git commit -m "Update project-name README with new features"
git commit -m "Add screenshots to project-name media"

# ❌ Avoid
git commit -m "Update"
git commit -m "Fix stuff"
git commit -m "asdf"
```

---

## 📝 Keeping Your Project Updated

### Make Changes to Your Project

1. **Decrypt your data locally:**
   ```bash
   node scripts/decrypt.js yourproject
   ```

2. **Update your project.json** with new information

3. **Commit and push:**
   ```bash
   git add projects/yourproject/
   git commit -m "Update yourproject with new information"
   git push origin main
   ```

4. **GitHub Actions automatically re-encrypts** your data

### Update Your Public README

```bash
# Edit projects/yourproject/README.md
git add projects/yourproject/README.md
git commit -m "Update README for yourproject"
git push origin main
```

### Add New Media Files

```bash
# Copy new image to media folder
cp ~/Downloads/screenshot.png projects/yourproject/data/media/

# Commit
git add projects/yourproject/data/media/
git commit -m "Add new screenshot to yourproject"
git push origin main
```

---

## 📋 Quality Checklist

Before pushing your project, verify:

- [ ] Project name is lowercase with hyphens (no spaces)
- [ ] `.owner` file has your GitHub username and email
- [ ] `README.md` has all public information
- [ ] `project.json` has all encrypted details
- [ ] Added encryption key to GitHub Secrets
- [ ] Images are in `data/media/` folder
- [ ] File sizes are reasonable (< 5MB)
- [ ] Commit message is descriptive
- [ ] No sensitive credentials in any file
- [ ] No API keys, passwords, or secrets in project.json

---

## 🤝 Collaboration Guidelines

### Only You Can Modify Your Project

Your project is **protected by ownership validation**. Only you (the project owner in `.owner` file) can:
- Modify `project.json`
- Update project structure
- Push changes

Others can:
- View your public `README.md`
- See your project in the portfolio
- ✅ View metadata and public information

### Working in Teams

If you want team members to help:

**Option 1: Collaboration**
- Have them submit proposed changes via issues/discussions
- You review and apply them

**Option 2: Ownership Transfer**
- Contact the repository administrator
- Transfer project ownership to a team member
- They'll have full control

### Project Organization

Keep your project folder clean:
- ✅ Only include necessary files
- ✅ Use meaningful file names
- ✅ Organize media in subdirectories
- ❌ Don't commit node_modules or build artifacts
- ❌ Don't commit environment files or secrets

---

## 🛡️ Code of Conduct

### Be Respectful

- ✅ Treat all contributors with respect
- ✅ Provide constructive feedback
- ✅ Help others when you can
- ❌ No harassment, discrimination, or abusive language

### Be Professional

- ✅ Use clear, professional descriptions
- ✅ Keep project names and descriptions appropriate
- ✅ Focus on technical content
- ❌ No spam, advertising, or promotional content

### Respect Privacy

- ✅ Only share information you're comfortable with
- ✅ Keep encryption keys secure
- ✅ Don't attempt to access others' encrypted data
- ❌ Never share someone else's encryption key

### Follow Guidelines

- ✅ Follow this contribution guide
- ✅ Use provided scripts and tools
- ✅ Respect repository structure
- ❌ Don't modify other projects
- ❌ Don't break established workflows

---

## 🆘 Getting Help

### Common Questions

**Q: I forgot my encryption key!**
A: Unfortunately, encryption keys cannot be recovered. You'll need to:
1. Generate a new key
2. Delete the old encrypted file
3. Recreate your project with the new key

**Q: Can I move my project to a different name?**
A: Yes! 
1. Create a new project with the new name
2. Copy files from the old project
3. Delete the old project folder
4. Commit both changes

**Q: How do I know if my encryption worked?**
A: Check the Actions tab. You should see:
- ✅ Workflow completed
- 🔐 "Project encrypted successfully" in logs
- `project.json.encrypted` file exists in your project folder

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Push rejected | Check you have write access and credentials are correct |
| Encryption failed | Verify secret name: `PROJECT_[NAME]_KEY` |
| "Not the owner" | Check `.owner` username matches your GitHub username exactly |
| Files not pushing | Ensure files are in the correct `projects/[name]/` folder |
| Actions not running | Check `.github/workflows/` exists and Actions are enabled |

### Contact Support

1. **Check the OWNER_GUIDE.md** for detailed instructions
2. **Review GitHub Actions logs** for error messages
3. **Check this guide's troubleshooting section**
4. **Contact the repository administrator**

---

## 📚 Resources

- **OWNER_GUIDE.md** - Detailed project owner documentation
- **README.md** - Repository overview and quick start
- **GitHub Actions Logs** - Debug workflow issues
- **Git Documentation** - https://git-scm.com/doc

---

## 🎉 Next Steps

Ready to contribute?

1. ✅ [Accept the collaboration invitation](#before-you-start)
2. ✅ [Clone the repository](#step-2-clone-the-repository)
3. ✅ [Generate your encryption key](#step-3-generate-your-encryption-key)
4. ✅ [Add it to GitHub Secrets](#step-4-add-your-key-to-repository-secrets)
5. ✅ [Initialize your project](#step-5-initialize-your-project)
6. ✅ [Fill in your information](#step-6-fill-in-your-project-information)
7. ✅ [Push and encrypt](#step-7-commit-and-push)

Welcome to Corelith Portfolio! 🚀

---

*Last updated: 2026-08-28*
*For questions or updates, contact the repository administrators.*
