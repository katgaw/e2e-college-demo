# 🚀 Session 1 Cheatsheet: Legend Chatbot Backend

## ⚙️ **Setup Requirements**

### Required Accounts & Tools
- ✅ GitHub account
- ✅ OpenAI API key ([create here](https://platform.openai.com/api-keys))
- ✅ Cursor IDE installed
- ✅ Python 3.12+ installed
- ✅ Node.js & npm installed

### Test Your Setup
```bash
# Check Python
python3 --version  # Should be 3.12+

# Check Node
node --version
npm --version
```

---

## 📋 **The Assignment Flow**

### **Part 1: Backend Setup (15 min)**
1. **Open** `E2E_application/app/backend-legend-chatbot/` in Cursor
2. **Create** a virtual environment:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate   # Windows: .venv\Scripts\activate
   ```
3. **Install** dependencies: `pip install -r requirements.txt`
4. **Create** `.env` with your OpenAI key:
   ```bash
   echo 'OPENAI_API_KEY="sk-your-key-here"' > .env
   ```
5. **Run** backend: `uvicorn api.index:app --reload --host 0.0.0.0 --port 8000`
6. **Test** at [http://localhost:8000/docs](http://localhost:8000/docs)

### **Part 2: Frontend (20 min)**
1. **Navigate** to `E2E_application/app/frontend-legend-chatbot/`
2. **Install**: `npm install`
3. **Configure** backend URL:
   ```bash
   echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:8000" > .env.local
   ```
4. **Run**: `npm run dev`
5. **Open** [http://localhost:3000](http://localhost:3000) and pick a character to chat

### **Part 3: Connect Them (10 min)**
1. **Verify** `.env.local` points to `http://localhost:8000`
2. **Run both** (each in its own terminal, with backend venv activated):
   - Terminal 1:
     ```bash
     cd E2E_application/app/backend-legend-chatbot
     source .venv/bin/activate
     uvicorn api.index:app --reload --host 0.0.0.0 --port 8000
     ```
   - Terminal 2:
     ```bash
     cd E2E_application/app/frontend-legend-chatbot
     npm run dev
     ```
3. **Chat** with Charles IV, Jan Hus, or Masaryk and confirm in-character replies

---

## 🔑 **Key Commands Reference**

### Backend (FastAPI)
```bash
cd E2E_application/app/backend-legend-chatbot

# Create and activate virtual environment (first time only)
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server (venv must be active)
uvicorn api.index:app --reload --host 0.0.0.0 --port 8000

# Test with curl
curl -X POST "http://localhost:8000/api/chat" \
     -H "Content-Type: application/json" \
     -d '{"message": "Why did you found Charles University?", "figure": "charles_iv", "history": []}'
```

### Frontend (Next.js)
```bash
cd E2E_application/app/frontend-legend-chatbot

# Install (use if errors)
npm install --legacy-peer-deps

# Run dev server
npm run dev

# Kill port 3000 if stuck
kill -9 $(lsof -ti tcp:3000)
```

### Git Workflow
```bash
# Commit backend changes
git add .
git commit -m "feat: add Legend Chatbot backend"
git push origin main

# Commit frontend changes
git add .
git commit -m "feat: connect Legend Chatbot frontend to backend"
git push origin main
```

---

## 🎯 **What the Backend Does**

`api/index.py` provides:
- **POST /api/chat** — Chat with a historical figure (uses OpenAI + system prompts)
- **GET /api/figures** — List available conversation partners
- **GET /health** — Health check
- **GET /docs** — Interactive API docs (Swagger)

**Conversation partners:** `czech_history`, `charles_iv`, `jan_hus`, `masaryk`

Each figure has a `system_prompt` in `HISTORICAL_FIGURES` that shapes their voice and historical accuracy.

---

## 🐛 **Common Issues & Fixes**

| Problem | Solution |
|---------|----------|
| Port 8000 in use | `kill -9 $(lsof -ti tcp:8000)` |
| Port 3000 in use | `kill -9 $(lsof -ti tcp:3000)` |
| `pip` not found | Activate `.venv` first: `source .venv/bin/activate` |
| npm install fails | Use `npm install --legacy-peer-deps` |
| Wrong character voice or generic replies | Set `NEXT_PUBLIC_BACKEND_URL=http://localhost:8000` in `.env.local` and restart frontend |
| Missing OpenAI key | Add `OPENAI_API_KEY` to `backend-legend-chatbot/.env` |

---

## ✅ **Success Checklist**

To complete this assignment, verify you can:
- [ ] Create and activate `.venv` in the backend folder
- [ ] Install deps with `pip install -r requirements.txt`
- [ ] Run backend at `localhost:8000`
- [ ] See docs at `localhost:8000/docs`
- [ ] Test `/api/chat` with curl or Swagger
- [ ] Run frontend at `localhost:3000`
- [ ] Chat with a character and get an in-character response
- [ ] Have both running simultaneously

---

## 💡 **Pro Tips**

- **Activate `.venv` every time** — Run `source .venv/bin/activate` before `pip` or `uvicorn` in a new terminal
- **Keep terminals open** — You need 2 terminals running (backend + frontend)
- **Test backend first** — Verify `/docs` works before connecting the frontend
- **Use Swagger UI** — Easier than curl for testing (`/docs`)
- **Ask Cursor for help** — It can debug API calls, env vars, and prompt tuning
- **Check the network tab** — Use browser DevTools to see API requests

---

## 📚 **Helpful Links**

- App README: `E2E_application/README.md`
- Full Assignment: `Assignment.md`
- FastAPI Docs: [https://fastapi.tiangolo.com](https://fastapi.tiangolo.com)
- v0.dev: [https://v0.dev](https://v0.dev)

---

**Remember**: The goal is to understand the full stack — backend API with LLM system prompts → frontend chat UI → connected system. Take it step by step! 🎯
