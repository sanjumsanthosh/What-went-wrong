# What Went Wrong

**A guided post-mortem for a habit you dropped.** Answer a few questions, get an honest analysis of
why it failed — and what to change next time.

Next.js · Groq or Azure OpenAI · Zustand + localStorage · no account, no server-side storage.

---

## Why

Habit apps track streaks. They don't ask *why you stopped*. This one runs a short interview:
six fixed questions about the habit, the substitutes, the friction, the timing and the obstacles —
then AI-generated follow-ups that probe what you actually said, and finally an analysis split into
**what went wrong** and **what to do next**.

## How it works

```
6 fixed questions  →  AI follow-up questions  →  analysis (2 sections)
   (lib/constants)      (adapts to answers)        what went wrong
                                                   what to do next
```

- **Fixed opening.** The first six questions come from `lib/constants/questions.ts`, so every session
  covers the same ground — habit, substitute behaviour, friction, timing, obstacles, history.
- **Adaptive middle.** `/api/generate-ai-questions` reads your answers and writes follow-ups that
  target the specific pattern you described, rather than a generic script.
- **Analysis at eight.** `/api/generate-analysis` returns JSON with two sections: the failure pattern
  (environment, friction, motivation) and concrete next steps.
- **Streaming.** Responses stream in, so long analyses don't look like a hung page.

## Bring your own model

The app never proxies your key through a third party; you paste a token into the UI and choose a
provider.

| Provider | Model | Notes |
|---|---|---|
| Groq | `llama-3.3-70b-versatile` | Fast, cheap, good enough for this prompt shape |
| Azure OpenAI | your deployment | Set endpoint and deployment name in `.env.local` |

```env
# .env.local
GROQ_API_KEY=…
# or
AZURE_AI_KEY=…
AZURE_ENDPOINT=…
AZURE_MODEL_NAME=…
```

Requests require an `Authorization` bearer token; the API routes reject calls without one (`401`).

## Run it

```bash
git clone https://github.com/sanjumsanthosh/What-went-wrong
cd What-went-wrong
npm install
npm run dev        # http://localhost:3000
```

Built with Next.js App Router, Tailwind, Framer Motion and Zustand. State persists in
`localStorage`; **Reset** clears it completely.

## Project layout

```text
app/
  page.tsx                      the conversation
  api/generate-question/        one question at a time
  api/generate-ai-questions/    adaptive follow-ups
  api/generate-analysis/        the two-section verdict
components/
  ModelSetup.tsx                provider + token
  Summary.tsx                   analysis display
  ResetButton.tsx               clear local state
lib/
  ai-clients/                   groq-client, azure-client, shared types
  constants/questions.ts        the fixed opening set
  store/                        Zustand store + types
```

## Limits

- One session at a time; history lives in this browser only.
- The analysis is only as good as the model you bring — and it is advice, not therapy.
- No multi-user support, no sync, no server database.

## Credits

Built for the **GitHub Copilot 1-Day Build Challenge**.

## Author

[@sanjumsanthosh](https://github.com/sanjumsanthosh)
