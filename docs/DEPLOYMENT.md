# SignVaarta - AWS Amplify Deployment Guide

## Prerequisites
- AWS Account with Amplify access
- GitHub repository (already set up)
- S3 bucket configured (signvaarta-models-riya-2026)
- API Gateway endpoints configured

## Deployment Steps

### 1. Connect to AWS Amplify

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Select "GitHub" as the repository service
4. Authorize AWS Amplify to access your GitHub account
5. Select repository: `RiyaRedkar/SignVaarta_AWS_Ai_for_Bharat`
6. Select branch: `main`

### 2. Configure Build Settings

Amplify will automatically detect the `amplify.yml` file. Review the settings:

```yaml
version: 1
frontend:
  phases:
    build:
      commands:
        - echo "No build required - static site"
  artifacts:
    baseDirectory: frontend
    files:
      - '**/*'
```

### 3. Environment Variables (if needed)

No environment variables required for frontend. All API endpoints are hardcoded in:
- `frontend/js/isl.js` - ISL to Speech API
- `frontend/js/Script.js` - Speech to Text API

### 4. Deploy

1. Click "Save and deploy"
2. Amplify will:
   - Clone your repository
   - Run the build (no-op for static site)
   - Deploy to CloudFront CDN
   - Provide a URL like: `https://main.xxxxx.amplifyapp.com`

### 5. Custom Domain (Optional)

1. In Amplify Console, go to "Domain management"
2. Add your custom domain
3. Follow DNS configuration steps
4. SSL certificate is automatically provisioned

## Project Structure

```
SignVaarta/
├── frontend/              # Static website files (deployed)
│   ├── index.html        # Home page
│   ├── isl.html          # ISL to Speech
│   ├── learning.html     # ISL Learning
│   ├── stt.html          # Speech to Text
│   ├── css/
│   │   └── styles.css    # All styles
│   └── js/
│       ├── isl.js        # ISL functionality
│       └── Script.js     # STT functionality
├── amplify.yml           # Amplify build configuration
└── README.md             # Project documentation
```

## API Endpoints

The frontend connects to these AWS services:

### ISL to Speech
- **Prediction API**: `https://api.signvaarta.com/predict`
- **Sentence Generation**: `https://api.signvaarta.com/generate-sentence`

### Speech to Text
- **Upload URL**: `https://9v2g41ikl8.execute-api.ap-south-1.amazonaws.com/dev/upload-url`
- **Start Transcription**: `https://9v2g41ikl8.execute-api.ap-south-1.amazonaws.com/dev/start`

### ISL Learning
- **S3 Bucket**: `https://signvaarta-models-riya-2026.s3.amazonaws.com/isl-tutorials/`

## CORS Configuration

Ensure your API Gateway and S3 bucket have CORS enabled for the Amplify domain:

```json
{
  "AllowedOrigins": [
    "https://main.xxxxx.amplifyapp.com",
    "https://yourdomain.com"
  ],
  "AllowedMethods": ["GET", "POST", "PUT"],
  "AllowedHeaders": ["*"]
}
```

## Monitoring

After deployment, monitor your app:
- **Amplify Console**: Build logs, deployment status
- **CloudWatch**: API Gateway logs
- **S3 Metrics**: Image delivery stats

## Continuous Deployment

Amplify automatically deploys when you push to `main` branch:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Amplify will detect the push and redeploy automatically.

## Troubleshooting

### Issue: 404 errors on page refresh
**Solution**: Amplify handles this automatically for SPAs. No action needed.

### Issue: API CORS errors
**Solution**: Update API Gateway CORS settings to include Amplify domain.

### Issue: Images not loading
**Solution**: Check S3 bucket policy allows public read for `isl-tutorials/` folder.

### Issue: MediaPipe not loading
**Solution**: Ensure CDN links are accessible:
- `https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js`
- `https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js`

## Cost Estimation

AWS Amplify Hosting:
- **Build minutes**: Free tier includes 1000 build minutes/month
- **Hosting**: $0.15 per GB served
- **Storage**: $0.023 per GB stored

Estimated monthly cost for moderate traffic: **$5-15/month**

## Security Checklist

- ✅ HTTPS enabled by default (Amplify provides SSL)
- ✅ S3 bucket has restricted public access (only isl-tutorials folder)
- ✅ API endpoints use HTTPS
- ✅ No sensitive credentials in frontend code
- ✅ CORS properly configured

## Performance Optimization

Amplify automatically provides:
- ✅ CloudFront CDN distribution
- ✅ Gzip compression
- ✅ HTTP/2 support
- ✅ Global edge locations

## Support

For issues:
1. Check Amplify Console build logs
2. Review CloudWatch logs for API errors
3. Test locally first: `python -m http.server 8000` in frontend directory
4. Contact AWS Support if needed

---

**Deployment Status**: Ready ✅
**Last Updated**: 2024
**Maintained by**: TheCodeHers Team
