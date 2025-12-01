# Deployment Guide for Render

> 📖 **Volver al índice**: [README.md](./README.md) | [Documentación completa](./README.md#-documentación-del-proyecto)

This guide will help you deploy the Dentist CRM backend and frontend to Render.

## Prerequisites

1. A Render account (sign up at https://render.com)
2. A PostgreSQL database (can be created on Render)
3. (Optional) Redis instance for caching
4. (Optional) MongoDB instance

## Step-by-Step Deployment

### 1. Prepare Your Repository

Ensure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket).

### 2. Database Setup

**Note**: The `render.yaml` is configured to use an existing database service called `db_avanadas`. If you need to create a new database:

1. Go to your Render dashboard
2. Click "New +" → "PostgreSQL"
3. Configure:
   - **Name**: `dentist-crm-db` (or your preferred name)
   - **Database**: `dentist_crm`
   - **User**: `dentist_crm_user`
   - **Region**: Choose closest to your users
   - **Plan**: Free tier is fine for development
4. Click "Create Database"
5. **Important**: Copy the "Internal Database URL" - you'll need this

**For MongoDB** (optional, for expedientes):
- Create a MongoDB service on Render or use an external MongoDB Atlas instance
- Copy the connection string for `MONGODB_URI`

### 3. Deploy the Web Service

#### Option A: Using render.yaml (Recommended)

1. The `render.yaml` file is already configured in the root directory
2. Go to Render dashboard → "New +" → "Blueprint"
3. Connect your repository
4. Render will automatically detect and use the `render.yaml` file
5. Review the configuration and click "Apply"

#### Option B: Manual Setup

1. Go to Render dashboard → "New +" → "Web Service"
2. Connect your repository
3. Configure the service:
   - **Name**: `dentist-crm-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: Leave empty (or set to `backend` if deploying only backend)

### 4. Configure Environment Variables

In your Render web service, go to "Environment" tab and add:

#### Required Variables:
```
NODE_ENV=production
POSTGRESQL_URI=<Internal Database URL from PostgreSQL service>
```

#### Optional Variables:
```
CORS_ORIGIN=https://your-frontend-url.com
REDIS_URI=<Redis connection string if using Redis>
MONGODB_URI=<MongoDB connection string if using MongoDB>
```

**Important Notes:**
- `PORT` is automatically set by Render - don't override it
- Use the **Internal Database URL** for `POSTGRESQL_URI` (not the external one)
- For `CORS_ORIGIN`, set your frontend URL. Use `*` for development only
- Multiple origins can be comma-separated: `https://app1.com,https://app2.com`

### 5. Database Migrations

After deployment, you may need to run database migrations. You can do this by:

1. Using Render's Shell feature:
   - Go to your web service → "Shell"
   - Run: `cd backend && npx sequelize-cli db:migrate` (if you have migrations)

2. Or the tables will be created automatically when Sequelize syncs (if configured)

### 6. Verify Deployment

1. Check the logs in Render dashboard for any errors
2. Visit your service URL: `https://your-service.onrender.com/health`
3. You should see a JSON response with database connection status

### 7. Health Check Configuration

Render will automatically use the `/health` endpoint for health checks. The endpoint:
- Returns `200` if all databases are connected
- Returns `503` if any database is disconnected

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NODE_ENV` | Yes | Environment mode | `production` |
| `PORT` | No | Server port (auto-set by Render) | `10000` |
| `POSTGRESQL_URI` | Yes | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `CORS_ORIGIN` | No | Allowed CORS origins | `https://myapp.com` or `*` |
| `REDIS_URI` | No | Redis connection string | `redis://host:6379` |
| `MONGODB_URI` | No | MongoDB connection string | `mongodb://host:27017/db` |

## Troubleshooting

### Backend won't start
- Check logs in Render dashboard
- Verify `POSTGRESQL_URI` is correct (use Internal Database URL)
- Ensure `NODE_ENV=production` is set
- Check that all required environment variables are set

### Database connection errors
- Verify you're using the **Internal Database URL** (not external)
- Check that the database service is running
- Ensure the database credentials are correct
- Verify SSL is enabled (already configured in code)

### CORS errors
- Set `CORS_ORIGIN` to your frontend URL
- Don't include trailing slashes in the URL
- For multiple origins, use comma-separated values

### Health check failing
- The `/health` endpoint returns 503 if databases aren't connected
- Check database connection strings
- Verify database services are running
- Redis and MongoDB are optional - app will work without them

## Frontend Deployment

### Option A: Using render.yaml (Recommended)

The `render.yaml` file includes frontend configuration. When deploying via Blueprint:

1. The frontend will be automatically configured as a static site
2. Set `VITE_API_URL` to your backend URL (e.g., `https://dentist-crm-backend.onrender.com`)
3. Render will build and serve the static files

### Option B: Manual Frontend Setup

1. Go to Render dashboard → "New +" → "Static Site"
2. Connect your repository
3. Configure:
   - **Name**: `dentist-crm-frontend`
   - **Root Directory**: `frontend` ⚠️ **Important**: Set this to `frontend`
   - **Build Command**: `npm install && npm run build`
     - ⚠️ **Note**: No `cd frontend` needed since Root Directory is set
   - **Publish Directory**: `dist`
     - ⚠️ **Note**: This is relative to Root Directory, so just `dist` (not `frontend/dist`)
4. Add Environment Variable:
   - Go to "Environment" tab
   - Click "Add Environment Variable"
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-service.onrender.com` (your actual backend URL)
     - ⚠️ **Important**: 
       - Must include `https://`
       - No trailing slash
       - Must match your actual backend URL exactly
5. **Configure Redirects** (Important for React Router):
   - Go to "Settings" → "Redirects/Rewrites"
   - Add a redirect rule:
     - **Source**: `/*`
     - **Destination**: `/index.html`
     - **Status Code**: `200` (not 301/302)
   - This ensures all routes serve `index.html` for client-side routing

### Important Notes for Frontend

- **Build-time Variables**: Vite requires environment variables to be prefixed with `VITE_`
  - ⚠️ **Critical**: After setting/changing `VITE_API_URL`, you MUST rebuild the frontend
  - Environment variables are injected at build time, not runtime
  - Go to "Manual Deploy" → "Deploy latest commit" after changing env vars
- **API URL**: Set `VITE_API_URL` to your backend service URL (without trailing slash)
- **CORS**: Make sure your backend `CORS_ORIGIN` includes your frontend URL
- **Build Output**: Vite builds to `dist` directory (relative to Root Directory)
- **React Router**: Configure redirects so all routes serve `index.html` for client-side routing

### Frontend Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_API_URL` | Yes | Backend API base URL | `https://dentist-crm-backend.onrender.com` |

**Note**: After deploying the backend, copy its URL and set it as `VITE_API_URL` in the frontend service.

## Post-Deployment

1. **Connect Frontend to Backend**: 
   - Set `VITE_API_URL` in frontend to your backend URL
   - **Rebuild frontend** after setting `VITE_API_URL` (env vars are injected at build time)
   - Set `CORS_ORIGIN` in backend to your frontend URL
   - Backend will auto-redeploy after setting env vars
2. **Configure React Router Redirects**:
   - In frontend service → Settings → Redirects/Rewrites
   - Add: `/*` → `/index.html` with status `200`
3. **Monitor Logs**: Regularly check Render logs for errors
4. **Set up Auto-Deploy**: Render automatically deploys on git push (enabled by default)
5. **Database Backups**: Consider setting up automatic backups for your databases
6. **Test the Connection**: 
   - Visit your frontend URL and verify it can communicate with the backend
   - Check browser console (F12) for any errors
   - Test all routes (patients, appointments, medical records)

## Cost Considerations

- **Free Tier**: 
  - Web services sleep after 15 minutes of inactivity
  - PostgreSQL free tier has limitations
  - Good for development/testing
  
- **Paid Plans**: 
  - Always-on web services
  - Better database performance
  - Recommended for production

## Security Notes

1. Never commit `.env` files to git (already in `.gitignore`)
2. Use Render's environment variable management
3. In production, set `CORS_ORIGIN` to specific frontend URL (not `*`)
4. Use Internal Database URLs when services are on the same network
5. Enable SSL/TLS for all database connections (already configured)

