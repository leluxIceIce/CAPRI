# EPS Ecological Cube Discovery Platform — Control Guide

This guide details how to start, refresh, and stop the interactive 3D Cube platform servers (Frontend: port `5174`, Backend: port `8000`).

---

## 🚀 1. How to Start the Project

To start the platform, both the **Python Flask backend** and the **Vite frontend** servers must be running.

### Start the Backend Server (Port 8000)
Run this command from your terminal:
```bash
cd /Users/lelux/.gemini/antigravity/scratch/capri
.venv/bin/python server.py
```
* **Host**: `http://localhost:8000`
* **Health Check**: `http://localhost:8000/health`

### Start the Frontend Server (Port 5174)
Open a new terminal window and run:
```bash
cd /Users/lelux/.gemini/antigravity/scratch/eps-cube-platform/frontend
npm run dev -- --port 5174
```
* **Local Access**: `http://localhost:5174/`

---

## 🔄 2. How to Refresh / Restart

If you need to refresh the servers or if a port is hung, you can restart them.

### Quick Restart Command
To cleanly kill whatever is occupying the ports and restart both servers immediately:
```bash
# Kill active ports
kill -9 $(lsof -t -i:5174) 2>/dev/null || true
kill -9 $(lsof -t -i:8000) 2>/dev/null || true

# Start Backend (runs in background)
cd /Users/lelux/.gemini/antigravity/scratch/capri
nohup .venv/bin/python server.py > backend.log 2>&1 &

# Start Frontend
cd /Users/lelux/.gemini/antigravity/scratch/eps-cube-platform/frontend
npm run dev -- --port 5174
```

---

## 🛑 3. How to Stop the Project

To stop the servers and free the ports, run the following commands:

```bash
# Stop the frontend on port 5174
kill -9 $(lsof -t -i:5174)

# Stop the backend on port 8000
kill -9 $(lsof -t -i:8000)
```

---

> [!TIP]
> If you are using VS Code or another markdown viewer, you can print this document to PDF by opening it and selecting **File > Print > Save as PDF** or using the **Markdown PDF** extension.
