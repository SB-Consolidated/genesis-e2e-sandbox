# START_EVERYTHING

## Project Location
- /workspace/genesis-e2e/app/strategic-directive-simple-to-do-app

## Prerequisites
- Node.js v24.22.1
- npm v11.21.1

## Initial Setup
```bash
cd /workspace/genesis-e2e/app/strategic-directive-simple-to-do-app
npm install
```

## Development Server
```bash
cd /workspace/genesis-e2e/app/strategic-directive-simple-to-do-app
npm run dev
```

Expected:
- Vite starts on http://localhost:5173

## Production Build
```bash
cd /workspace/genesis-e2e/app/strategic-directive-simple-to-do-app
npm run build
```

## Optional Preview
```bash
cd /workspace/genesis-e2e/app/strategic-directive-simple-to-do-app
npm run preview
```

## Environment Variables
Create `.env` from `.env.example` when needed.

Required keys:
- NODE_ENV=development|production
- PORT=3000
- TASKS_FILE_PATH=./data/tasks.json
