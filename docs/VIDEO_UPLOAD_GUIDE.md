# ISL Tutorial Images - Upload Guide

## S3 Bucket Information
- **Bucket Name**: `signvaarta-models-riya-2026`
- **Folder**: `isl-tutorials/`
- **Region**: (Your AWS region)

## Image Naming Convention

### Alphabets (26 images)
- `A.jpg`, `B.jpg`, `C.jpg`, ... `Z.jpg`

### Numbers (10 images)
- `0.jpg`, `1.jpg`, `2.jpg`, ... `9.jpg`

### Common Words (15 images)
- `NAMASTE.jpg`
- `THANK_YOU.jpg`
- `YES.jpg`
- `NO.jpg`
- `HELP.jpg`
- `GO.jpg`
- `STOP.jpg`
- `WANT.jpg`
- `WATER.jpg`
- `HOME.jpg`
- `TODAY.jpg`
- `WARNING.jpg`
- `YOU.jpg`
- `SHY.jpg`
- `SPIDER-MAN.jpg`

**Total: 51 images**

## Upload Steps

1. **Go to AWS S3 Console**
   - Navigate to bucket: `signvaarta-models-riya-2026`

2. **Create folder** (if not exists)
   - Click "Create folder"
   - Name: `isl-tutorials`

3. **Upload images**
   - Go into `isl-tutorials/` folder
   - Click "Upload"
   - Add all 51 image files
   - Make sure filenames match exactly (case-sensitive)

4. **Set permissions**
   - Select all uploaded images
   - Actions → Make public (if needed)
   - Or ensure bucket policy allows public read access

## Image Requirements

- **Format**: JPG (.jpg extension)
- **Resolution**: 800x600 or 1200x900 pixels (4:3 aspect ratio)
- **File size**: Keep under 200-300KB per image for fast loading
- **Quality**: JPEG compression 80-85%
- **Background**: Clear or solid color
- **Content**: Clear demonstration of the ISL sign with hand(s) visible

## Testing

After upload, test by opening the learning page:
1. Click on any sign card
2. Tutorial modal should open
3. Image should display (if available)
4. If image not found, placeholder with letter will show

## S3 URL Format

Images will be accessed at:
```
https://signvaarta-models-riya-2026.s3.amazonaws.com/isl-tutorials/A.jpg
https://signvaarta-models-riya-2026.s3.amazonaws.com/isl-tutorials/NAMASTE.jpg
```

## Troubleshooting

**Image not loading?**
- Check filename matches exactly (case-sensitive)
- Verify file is in `isl-tutorials/` folder
- Check bucket CORS configuration
- Ensure image is publicly accessible
- Verify .jpg extension (not .jpeg)

**CORS Configuration** (if needed):
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

## Bucket Policy for Public Read

If images aren't loading, add this bucket policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::signvaarta-models-riya-2026/isl-tutorials/*"
    }
  ]
}
```

## Notes

- Images are NOT in Git repo (kept private in S3)
- Placeholder will show if image is missing
- Images display with dark background for better visibility
- JPG format with .jpg extension (not .jpeg)
- Recommended size: 800x600 or 1200x900 pixels (4:3 aspect ratio)
