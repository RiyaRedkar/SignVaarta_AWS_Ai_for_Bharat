# Contributing to SignVaarta

## 🤝 Team Collaboration Guide

This guide helps team members contribute to SignVaarta effectively.

---

## 📋 Quick Start for New Team Members

### 1. Clone the Repository
```bash
git clone https://github.com/RiyaRedkar/SignVaarta_AWS_Ai_for_Bharat.git
cd SignVaarta_AWS_Ai_for_Bharat
```

### 2. Check Current Branch
```bash
git branch
# Should show: * main
```

### 3. Pull Latest Changes
```bash
git pull origin main
```

### 4. Test Locally
```bash
# Start local server
python -m http.server 8000

# Open browser
# http://localhost:8000/frontend/index.html
```

---

## 🌿 Git Workflow

### Creating a Feature Branch
```bash
# Always start from main
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name

# Examples:
# git checkout -b feature/stt-aws-integration
# git checkout -b feature/hindi-language-support
# git checkout -b bugfix/microphone-permission
```

### Making Changes
```bash
# Check what files changed
git status

# Add specific files
git add frontend/stt.html
git add frontend/js/stt.js

# Or add all changes
git add .

# Commit with clear message
git commit -m "Add AWS Transcribe integration for Speech to Text"

# Push to your branch
git push origin feature/your-feature-name
```

### Creating Pull Request
1. Go to GitHub repository
2. Click "Pull Requests" tab
3. Click "New Pull Request"
4. Select your branch
5. Add description of changes
6. Request review from team
7. Wait for approval before merging

---

## 📁 Project Structure

```
SignVaarta_AWS_Ai_for_Bharat/
├── frontend/                    # Frontend code
│   ├── css/
│   │   └── styles.css          # Global styles - DON'T MODIFY without discussion
│   ├── js/
│   │   └── isl.js              # ISL page logic (reference only)
│   │   └── stt.js              # ⚠️ CREATE THIS - Your work here
│   ├── index.html              # Home page - DON'T MODIFY
│   ├── isl.html                # ISL to Speech - DON'T MODIFY
│   ├── learning.html           # Learning page - DON'T MODIFY
│   └── stt.html                # Speech to Text - MODIFY THIS
│
├── generated-diagrams/          # Architecture diagrams
├── .git/                        # Git metadata
├── .gitignore                   # Ignored files
├── app.py                       # Backend (if needed) - CREATE/MODIFY
├── README.md                    # Project documentation
├── REQUIREMENTS.md              # STT module requirements
├── CONTRIBUTING.md              # This file
└── signvaarta-aws-architecture.md  # Architecture docs
```

---

## 🚫 What NOT to Modify

### Critical Files (Don't Touch)
- `frontend/index.html` - Home page is complete
- `frontend/isl.html` - ISL to Speech is working
- `frontend/learning.html` - Learning page is complete
- `frontend/css/styles.css` - Global styles (unless adding STT-specific styles at the end)

### Why?
These files are already deployed and working. Modifying them could break the live site.

---

## ✅ What You CAN Modify

### Your Work Area
- `frontend/stt.html` - Update the script section
- `frontend/js/stt.js` - Create this file for your logic
- `app.py` - Add backend endpoints if using AWS
- `.env` - Add your AWS credentials (DON'T COMMIT THIS)

### Adding New Files
- Create new files in appropriate directories
- Follow existing naming conventions
- Add comments to explain your code

---

## 🔧 Development Guidelines

### Code Style
1. **Use existing patterns** - Check `isl.html` for reference
2. **Add comments** - Explain complex logic
3. **Keep it simple** - Don't over-engineer
4. **Test locally** - Before pushing to GitHub

### Naming Conventions
- **Files**: lowercase with hyphens (e.g., `speech-to-text.js`)
- **Functions**: camelCase (e.g., `startRecording()`)
- **Variables**: camelCase (e.g., `isRecording`)
- **Constants**: UPPER_CASE (e.g., `API_ENDPOINT`)

### Comments
```javascript
// Good comment - explains WHY
// Using MediaRecorder API because Web Speech API doesn't work in all browsers

// Bad comment - explains WHAT (obvious from code)
// This function starts recording
```

---

## 🧪 Testing Before Pushing

### Local Testing Checklist
- [ ] Code runs without errors in console
- [ ] UI looks correct in Chrome
- [ ] UI looks correct in Edge
- [ ] Microphone permission works
- [ ] Recording starts/stops correctly
- [ ] Transcript displays correctly
- [ ] Error messages show when needed

### Testing Commands
```bash
# Start local server
python -m http.server 8000

# Open in browser
# http://localhost:8000/frontend/stt.html

# Check browser console for errors (F12)
```

---

## 🔐 Security Best Practices

### Environment Variables
```bash
# Create .env file (already in .gitignore)
touch .env

# Add your credentials
echo "AWS_ACCESS_KEY_ID=your_key" >> .env
echo "AWS_SECRET_ACCESS_KEY=your_secret" >> .env
```

### Never Commit
- `.env` file
- AWS credentials
- API keys
- Personal information
- Large binary files

### Check Before Committing
```bash
# See what will be committed
git status

# If you see .env, DON'T commit!
# Remove it from staging
git reset .env
```

---

## 🐛 Debugging Tips

### Browser Console
```javascript
// Add debug logs
console.log('Recording started');
console.log('Audio data:', audioData);
console.error('Error:', error);
```

### Network Tab
- Open DevTools (F12)
- Go to Network tab
- Check API requests
- Look for errors (red)

### Common Issues

**Issue**: Changes not showing
```bash
# Clear browser cache
# Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
```

**Issue**: Git conflicts
```bash
# Pull latest changes
git pull origin main

# Resolve conflicts in editor
# Then commit
git add .
git commit -m "Resolve merge conflicts"
```

**Issue**: Pushed to wrong branch
```bash
# Don't panic! Create new branch from current state
git checkout -b feature/correct-branch-name
git push origin feature/correct-branch-name
```

---

## 📞 Communication

### Before Starting Work
1. Check GitHub Issues
2. Announce what you're working on
3. Ask questions if unclear

### While Working
1. Commit frequently with clear messages
2. Push to your branch regularly
3. Update team on progress

### After Completing Work
1. Test thoroughly
2. Create Pull Request
3. Request review
4. Address feedback

---

## 🎯 Current Sprint Tasks

### Speech to Text Module
- [ ] Review REQUIREMENTS.md
- [ ] Set up AWS Transcribe (optional)
- [ ] Create `frontend/js/stt.js`
- [ ] Update `frontend/stt.html`
- [ ] Test in Chrome and Edge
- [ ] Handle errors gracefully
- [ ] Create Pull Request

---

## 📚 Helpful Resources

### Documentation
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [AWS Transcribe](https://docs.aws.amazon.com/transcribe/)
- [Flask Documentation](https://flask.palletsprojects.com/)

### Team Resources
- GitHub Repository: https://github.com/RiyaRedkar/SignVaarta_AWS_Ai_for_Bharat
- AWS Console: https://console.aws.amazon.com/
- Project README: `README.md`
- Requirements Doc: `REQUIREMENTS.md`

---

## ✨ Best Practices Summary

1. **Always pull before starting work**
2. **Work on feature branches, not main**
3. **Test locally before pushing**
4. **Write clear commit messages**
5. **Don't modify files outside your scope**
6. **Ask questions when unsure**
7. **Keep credentials secure**
8. **Document your code**

---

## 🆘 Getting Help

### Stuck on Something?
1. Check existing code in `frontend/isl.html`
2. Read REQUIREMENTS.md
3. Search GitHub Issues
4. Ask team members
5. Check AWS documentation

### Found a Bug?
1. Create GitHub Issue
2. Describe the problem
3. Include steps to reproduce
4. Add screenshots if helpful

---

**Happy Coding! 🚀**

**Team**: TheCodeHers  
**Project**: SignVaarta  
**Hackathon**: AWS AI for Bharat 2026
