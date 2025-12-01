# Frontend Deployment Guide

This guide covers deploying the Dentist CRM frontend to Render as a static site.

## Prerequisites

1. Backend must be deployed first (see `DEPLOYMENT.md`)
2. You need the backend service URL
3. A Render account

## Quick Start

### Using Blueprint (render.yaml)

1. The `render.yaml` file includes frontend configuration
2. Deploy using Blueprint - both frontend and backend will be configured
3. After deployment, update `VITE_API_URL` in frontend service to your backend URL
4. Update `CORS_ORIGIN` in backend service to your frontend URL

### Manual Deployment

1. **Create Static Site**:
   - Go to Render dashboard → "New +" → "Static Site"
   - Connect your Git repository

2. **Configure Build**:
   - **Name**: `dentist-crm-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`

3. **Set Environment Variable**:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-service.onrender.com`
   - ⚠️ **Important**: No trailing slash!

4. **Deploy**: Click "Create Static Site"

## How It Works

### Build Process

1. Render runs: `cd frontend && npm install && npm run build`
2. Vite compiles React app to static files in `frontend/dist`
3. Environment variables (prefixed with `VITE_`) are injected at build time
4. Static files are served by Render's CDN

### API Configuration

The frontend uses a centralized API configuration:

- **File**: `frontend/src/config/api.config.js`
- **Environment Variable**: `VITE_API_URL`
- **Default**: `http://localhost:3000` (for local development)

All API calls (`pacientes.js`, `citas.js`, `dentistas.js`, `expedientes.js`) use this configuration.

## Environment Variables

### Required

- `VITE_API_URL`: Your backend service URL
  - Example: `https://dentist-crm-backend.onrender.com`
  - ⚠️ Must not have trailing slash
  - Must include protocol (`https://`)

### Development

For local development, create `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:3000
```

## Deployment Steps

### Step 1: Deploy Backend First

Deploy the backend service and note its URL (e.g., `https://dentist-crm-backend.onrender.com`)

### Step 2: Deploy Frontend

1. Create static site on Render
2. Set `VITE_API_URL` to your backend URL
3. Deploy

### Step 3: Update CORS

1. Go to backend service → Environment
2. Set `CORS_ORIGIN` to your frontend URL
3. Redeploy backend (or it will auto-redeploy)

### Step 4: Verify

1. Visit your frontend URL
2. Open browser console (F12)
3. Check for CORS errors
4. Test API calls (e.g., load patients list)

## Troubleshooting

### Frontend shows "Network Error" or can't connect to backend

**Causes:**
- `VITE_API_URL` is incorrect
- Backend is not running
- CORS is not configured

**Solutions:**
1. Verify `VITE_API_URL` in frontend service settings
2. Check backend is running and accessible
3. Verify `CORS_ORIGIN` in backend includes frontend URL
4. Check browser console for specific error messages

### CORS Errors

**Error**: `Access to fetch at '...' from origin '...' has been blocked by CORS policy`

**Solution:**
1. Go to backend service → Environment
2. Set `CORS_ORIGIN` to your frontend URL (e.g., `https://dentist-crm-frontend.onrender.com`)
3. Redeploy backend

### Build Fails

**Common Issues:**
- Missing dependencies: Check `package.json` is correct
- Node version: Ensure Node.js 14+ is available
- Build command: Verify `cd frontend && npm install && npm run build`

**Solution:**
- Check build logs in Render dashboard
- Verify `frontend/package.json` exists
- Ensure all dependencies are listed

### Environment Variables Not Working

**Important**: Vite only exposes variables prefixed with `VITE_` to the client.

- ✅ Correct: `VITE_API_URL`
- ❌ Wrong: `API_URL`, `REACT_APP_API_URL`

### Blank Page After Deployment

**Causes:**
- Build failed silently
- Missing `index.html` in dist
- JavaScript errors

**Solutions:**
1. Check browser console for errors
2. Verify build completed successfully
3. Check that `frontend/dist/index.html` exists
4. Ensure `vite.config.js` is correct

## Alternative Deployment Options

### Netlify

1. Connect repository
2. Build command: `cd frontend && npm install && npm run build`
3. Publish directory: `frontend/dist`
4. Environment variable: `VITE_API_URL`

### Vercel

1. Connect repository
2. Framework preset: Vite
3. Root directory: `frontend`
4. Environment variable: `VITE_API_URL`

### GitHub Pages

Requires additional configuration for routing. See Vite docs for SPA deployment.

## Local Development

After deployment, you can still develop locally:

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Frontend will use `http://localhost:3000` by default (or `VITE_API_URL` if set)

## Production Checklist

- [ ] Backend deployed and accessible
- [ ] `VITE_API_URL` set to backend URL
- [ ] `CORS_ORIGIN` set in backend to frontend URL
- [ ] Frontend builds successfully
- [ ] Frontend accessible via HTTPS
- [ ] API calls working (test in browser console)
- [ ] No CORS errors
- [ ] All routes working (test navigation)

## Cost Considerations

- **Free Tier**: Static sites are free on Render
- **Custom Domain**: Free tier supports custom domains
- **CDN**: Included automatically
- **Bandwidth**: Generous free tier limits

## Security Notes

1. **Environment Variables**: `VITE_*` variables are exposed in the client bundle
   - Don't put secrets in `VITE_*` variables
   - Only use for public configuration (like API URLs)

2. **HTTPS**: Always use HTTPS in production
   - Render provides HTTPS automatically
   - Ensure backend also uses HTTPS

3. **CORS**: Configure CORS properly
   - Don't use `*` in production
   - Specify exact frontend URL

