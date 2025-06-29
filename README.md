# PaddlePrompt Frontend

React chat interface for an AI-powered concrete canoe proposal assistant.

## Tech Stack

React + TypeScript, Vite, Tailwind CSS, shadcn/ui

## Setup

```bash
# Install dependencies
npm install

# Set environment (optional)
echo "VITE_API_URL=http://localhost:5000" > .env

# Start development server
npm run dev
```

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview build
```

## Docker

```bash
docker build -t paddleprompt-frontend .
docker run -p 3000:3000 paddleprompt-frontend
```
