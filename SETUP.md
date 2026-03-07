# SignVaarta - Development Setup Guide

## 📋 Prerequisites

Before setting up the project, ensure you have the following installed:

- **Python**: 3.9 or higher (3.10 recommended)
- **Git**: Latest version
- **Node.js**: 16+ (for frontend development, optional)
- **AWS CLI**: Latest version (for AWS services)
- **Code Editor**: VS Code recommended

---

## 🚀 Quick Setup (5 Minutes)

### 1. Clone the Repository
```bash
git clone https://github.com/RiyaRedkar/SignVaarta_AWS_Ai_for_Bharat.git
cd SignVaarta_AWS_Ai_for_Bharat
```

### 2. Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 4. Download Model Files
You need these files (not in repo due to size):
- `isl_modelv3.h5` - TensorFlow model (~50MB)
- `class_names.npy` - Label mappings

**Ask team lead for these files** or download from shared drive.

Place them in the project root:
```
SignVaarta_AWS_Ai_for_Bharat/
├── isl_modelv3.h5          # ⚠️ Required
├── class_names.npy         # ⚠️ Required
├── app.py
└── ...
```

### 5. Set Up AWS Credentials
Create `.env` file in project root:
```bash
# Windows
echo. > .env

# macOS/Linux
touch .env
```

Add your AWS credentials:
```env
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_DEFAULT_REGION=ap-south-1
```

**⚠️ IMPORTANT**: Never commit `.env` file to Git!

### 6. Test Backend
```bash
# Start FastAPI server
uvicorn app:app --reload --port 8000

# You should see:
# INFO:     Uvicorn running on http://127.0.0.1:8000
# INFO:     Application startup complete.
```

### 7. Test Frontend
Open another terminal:
```bash
# Start simple HTTP server
python -m http.server 8001

# Open browser:
# http://localhost:8001/frontend/index.html
```

---

## 📦 Detailed Installation

### Python Dependencies Explained

#### Core Framework
```bash
fastapi==0.115.0          # Modern web framework for APIs
uvicorn[standard]==0.32.0 # ASGI server for FastAPI
pydantic==2.9.2           # Data validation
python-multipart==0.0.12  # File upload support
```

#### Machine Learning
```bash
tensorflow==2.18.0        # Deep learning framework for ISL model
numpy==1.26.4             # Numerical computing
```

#### AWS Services
```bash
boto3==1.35.36            # AWS SDK for Python
botocore==1.35.36         # Low-level AWS interface
```

#### Utilities
```bash
python-dotenv==1.0.1      # Environment variable management
```

### Installing Specific Versions
```bash
# Install exact versions (recommended)
pip install -r requirements.txt

# Or install latest versions (not recommended)
pip install fastapi uvicorn tensorflow numpy boto3 python-dotenv
```

---

## 🔧 Configuration

### Backend Configuration (app.py)

#### Current Settings
- **Port**: 8000
- **Region**: ap-south-1 (Mumbai)
- **CORS**: Enabled for all origins
- **Model**: isl_modelv3.h5
- **Labels**: class_names.npy

#### AWS Services Used
1. **Amazon Bedrock** - LLM for gloss-to-text conversion
   - Model: Custom inference profile
   - Region: ap-south-1

2. **Amazon Polly** - Text-to-speech
   - Voice: Joanna (English)
   - Format: MP3

### Frontend Configuration

#### Current Setup
- **Framework**: Vanilla JavaScript (no build required)
- **Styling**: Custom CSS with Inter font
- **API Endpoint**: https://api.signvaarta.com/

#### Local Development
- Use `python -m http.server` for testing
- No build process needed
- Direct file editing

---

## 🧪 Testing the Setup

### 1. Test Backend Health
```bash
# Terminal 1: Start backend
uvicorn app:app --reload --port 8000

# Terminal 2: Test endpoints
curl http://localhost:8000/health
# Expected: {"status":"healthy","model_loaded":true}
```

### 2. Test Model Prediction
```bash
curl -X POST http://localhost:8000/predict-demo
# Expected: {"prediction":"SOME_LABEL","confidence":0.XX}
```

### 3. Test Frontend
```bash
# Start frontend server
python -m http.server 8001

# Open browser:
# http://localhost:8001/frontend/index.html

# Test pages:
# - Home: http://localhost:8001/frontend/index.html
# - ISL to Speech: http://localhost:8001/frontend/isl.html
# - Speech to Text: http://localhost:8001/frontend/stt.html
# - Learning: http://localhost:8001/frontend/learning.html
```

### 4. Test ISL Recognition (Full Pipeline)
1. Open http://localhost:8001/frontend/isl.html
2. Allow camera access
3. Show hand signs
4. Check if predictions appear
5. Click "Generate" to test Bedrock integration
6. Click "Speak" to test Polly integration

---

## 🐛 Troubleshooting

### Common Issues

#### Issue 1: Module Not Found
```bash
# Error: ModuleNotFoundError: No module named 'fastapi'
# Solution: Activate virtual environment
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux

# Then reinstall
pip install -r requirements.txt
```

#### Issue 2: Model File Not Found
```bash
# Error: FileNotFoundError: [Errno 2] No such file or directory: 'isl_modelv3.h5'
# Solution: Download model files from team lead
# Place in project root directory
```

#### Issue 3: AWS Credentials Error
```bash
# Error: botocore.exceptions.NoCredentialsError
# Solution: Check .env file exists and has correct credentials
cat .env  # Should show AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
```

#### Issue 4: Port Already in Use
```bash
# Error: [Errno 10048] Only one usage of each socket address
# Solution: Use different port
uvicorn app:app --reload --port 8002
```

#### Issue 5: CORS Error in Browser
```bash
# Error: Access to fetch at 'http://localhost:8000' has been blocked by CORS
# Solution: CORS is already enabled in app.py
# Make sure backend is running on correct port
```

#### Issue 6: TensorFlow Installation Issues
```bash
# Windows: If TensorFlow fails to install
pip install tensorflow-cpu==2.18.0  # CPU-only version

# macOS (Apple Silicon): Use tensorflow-macos
pip install tensorflow-macos==2.18.0
pip install tensorflow-metal  # For GPU acceleration
```

---

## 📁 Project Structure

```
SignVaarta_AWS_Ai_for_Bharat/
│
├── frontend/                    # Frontend code
│   ├── css/
│   │   └── styles.css          # Global styles
│   ├── js/
│   │   └── (empty - add your JS here)
│   ├── index.html              # Home page
│   ├── isl.html                # ISL to Speech page
│   ├── learning.html           # Learning page
│   └── stt.html                # Speech to Text page
│
├── venv/                        # Virtual environment (not in Git)
├── .env                         # Environment variables (not in Git)
├── .gitignore                   # Git ignore rules
│
├── app.py                       # FastAPI backend
├── isl_modelv3.h5              # TensorFlow model (not in Git)
├── class_names.npy             # Label mappings (not in Git)
│
├── requirements.txt             # Python dependencies
├── SETUP.md                     # This file
├── REQUIREMENTS.md              # Feature requirements
├── CONTRIBUTING.md              # Contribution guide
└── README.md                    # Project documentation
```

---

## 🔐 Security Checklist

### Before Committing
- [ ] `.env` file is in `.gitignore`
- [ ] No AWS credentials in code
- [ ] No API keys in frontend
- [ ] Model files not committed (too large)
- [ ] Virtual environment not committed

### Environment Variables
```bash
# Check what's in .gitignore
cat .gitignore | grep .env
# Should show: .env

# Verify .env is not tracked
git status
# Should NOT show .env in changes
```

---

## 🚀 Running in Production

### Backend Deployment
```bash
# Install production dependencies
pip install -r requirements.txt

# Run with production server
uvicorn app:app --host 0.0.0.0 --port 8000 --workers 4

# Or use gunicorn
gunicorn app:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Frontend Deployment
- Already deployed on AWS Amplify
- Automatic deployment on Git push
- URL: https://main.d4rndg17i1jes.amplifyapp.com/

---

## 📊 System Requirements

### Minimum Requirements
- **CPU**: 2 cores
- **RAM**: 4GB
- **Storage**: 2GB free space
- **Internet**: Required for AWS services

### Recommended Requirements
- **CPU**: 4+ cores
- **RAM**: 8GB+
- **Storage**: 5GB free space
- **GPU**: Optional (for faster model inference)

---

## 🔄 Updating Dependencies

### Check for Updates
```bash
# Show outdated packages
pip list --outdated

# Update specific package
pip install --upgrade fastapi

# Update all packages (not recommended)
pip install --upgrade -r requirements.txt
```

### Freeze Current Versions
```bash
# Generate requirements.txt from current environment
pip freeze > requirements.txt
```

---

## 🆘 Getting Help

### Resources
- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **TensorFlow Docs**: https://www.tensorflow.org/
- **Boto3 Docs**: https://boto3.amazonaws.com/v1/documentation/api/latest/index.html
- **AWS Bedrock**: https://docs.aws.amazon.com/bedrock/
- **AWS Polly**: https://docs.aws.amazon.com/polly/

### Team Support
- Check CONTRIBUTING.md for collaboration guidelines
- Check REQUIREMENTS.md for feature requirements
- Ask team lead for model files
- Create GitHub issue for bugs

---

## ✅ Setup Verification Checklist

- [ ] Python 3.9+ installed
- [ ] Virtual environment created and activated
- [ ] All dependencies installed (`pip list` shows all packages)
- [ ] Model files downloaded (isl_modelv3.h5, class_names.npy)
- [ ] .env file created with AWS credentials
- [ ] Backend starts without errors (`uvicorn app:app --reload`)
- [ ] Frontend loads in browser
- [ ] Camera access works on ISL page
- [ ] Hand skeleton visualization appears
- [ ] Predictions display correctly
- [ ] Generate button works (Bedrock)
- [ ] Speak button works (Polly)

---

**Setup Complete! 🎉**

You're ready to start developing. Check CONTRIBUTING.md for collaboration guidelines.

**Team**: TheCodeHers  
**Project**: SignVaarta  
**Hackathon**: AWS AI for Bharat 2026
