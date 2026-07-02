# Legend Chatbot — Czech History Conversations

An interactive end-to-end LLM application where students choose whom they want to talk to and explore Czech history through conversation — not a lecture.

**Conversation partners:**
- **Czech History** — a guide through the full sweep of Czech history
- **Charles IV** — Holy Roman Emperor & King of Bohemia (1316–1378)
- **Jan Hus** — Bohemian Reformer & Priest (c. 1372–1415)
- **Tomáš Garrigue Masaryk** — First President of Czechoslovakia (1850–1937)

Each figure answers in their own voice, knowledge, and worldview while remaining historically accurate. Students can ask follow-up questions naturally instead of reading static content — storytelling meets education, especially for middle and high school.

---

## Application structure

1. **Backend** (`app/backend-legend-chatbot/`) — FastAPI application with:
   - Chat endpoint with historically grounded personas
   - Figure selection via API
   - Conversation history support for follow-up questions

2. **Frontend** (`app/frontend-legend-chatbot/`) — Next.js application with:
   - Figure selector (Czech History, Charles IV, Jan Hus, Masaryk)
   - Chat interface with suggested starter questions
   - Educational UI for Legend Chatbot

---

## Quick start (local)

### Backend

Requires Python 3.12+.

```bash
cd app/backend-legend-chatbot

# Create and activate a virtual environment
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env with your OpenAI API key
echo 'OPENAI_API_KEY="sk-your-key-here"' > .env

uvicorn api.index:app --reload --host 0.0.0.0 --port 8000
```

Test: http://localhost:8000/docs

### Frontend

```bash
cd app/frontend-legend-chatbot
npm install

echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:8000" > .env.local
npm run dev
```

> **Important:** For local development, `NEXT_PUBLIC_BACKEND_URL` must point to your local backend (`http://localhost:8000`). Restart `npm run dev` after changing `.env.local`.

Open: http://localhost:3000

---

## Deployment checklist

1. Deploy backend to Vercel or Render; set `OPENAI_API_KEY`
2. Deploy frontend to Vercel; set `NEXT_PUBLIC_BACKEND_URL` to your backend URL
3. Test chat with each conversation partner end-to-end

---

## Tech stack

- [OpenAI API](https://platform.openai.com/docs/guides/text)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Next.js](https://nextjs.org/) / [React](https://react.dev/)
