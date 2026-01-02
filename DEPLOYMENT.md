# 🚀 Deployment Guide: AI Verse Hub

Since your project is a full-stack application (React frontend + Django backend), I recommend the following modern platforms for a smooth deployment:

---

## 🏗️ Recommended Platforms

### Option 1: Render (Easiest Full-Stack)
**Render** can host both your Frontend and Backend in one place.
- **Frontend**: Connect your GitHub repo, set the root directory to `./` and build command to `npm run build`.
- **Backend**: Set the root directory to `backend/`, and use `gunicorn` to run the Django app.
- **Database**: Render offers managed PostgreSQL databases.

### Option 2: Railway (Best for Databases)
**Railway** is extremely fast to set up and handles PostgreSQL + Django + Vite beautifully.
- It will automatically detect your `package.json` and `backend/` directory.
- You can simply "Add a Plugin" for PostgreSQL.

### Option 3: Vercel + Render (Hyper-Performance)
- **Frontend (Vercel)**: Best for Vite/React performance. Connect GitHub and it's 1-click.
- **Backend (Render/Railway)**: Host your Django API separately.

---

## 🛠️ Step-by-Step Instructions (Render)

### 1. Backend (Django)
1. Sign up at [Render.com](https://render.com).
2. Create a **New Web Service** and connect your GitHub repo.
3. Set **Root Directory** to `backend`.
4. **Environment**: `Python`.
5. **Build Command**: `pip install -r requirements.txt && python manage.py migrate`.
6. **Start Command**: `gunicorn aiverse_api.wsgi:application`.
7. Add **Environment Variables**:
   - `DEBUG=False`
   - `SECRET_KEY=your-secret-key`
   - `DATABASE_URL=your-database-url`

### 2. Frontend (Vite/React)
1. Create another **New Web Service** (or Static Site).
2. Set **Root Directory** to `./` (root).
3. **Build Command**: `npm install && npm run build`.
4. **Publish Directory**: `dist`.
5. Add **Environment Variables**:
   - `VITE_API_URL=https://your-backend-url.onrender.com`

---

## 🔐 Production Checklist
- [ ] Change `DEBUG` to `False` in `settings.py`.
- [ ] Use environment variables for all secrets (API keys, DB URLs).
- [ ] Ensure `CORS_ALLOWED_ORIGINS` in Django includes your production frontend URL.
- [ ] Set up a managed database (don't use SQLite in production).
