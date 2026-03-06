# Virtual Bridal & Groom Makeup Studio

AI-powered virtual bridal and groom makeup generation and style recommendation platform.

## Project Structure

```
bridal-ai-platform/
├── frontend/          # Next.js + TailwindCSS frontend
│   ├── app/           # Pages and layouts
│   ├── components/    # React components
│   └── package.json
├── backend/           # FastAPI Python backend
│   ├── main.py        # Entry point
│   ├── api/           # REST API endpoints
│   ├── services/      # AI service modules
│   ├── workflows/     # LangGraph pipeline
│   ├── models/        # Pydantic models
│   └── config/        # Azure configuration
├── ai_models/         # AI model directories
│   ├── stable_diffusion/
│   └── controlnet/
└── requirements.txt
```

## Local Setup (Visual Studio / VS Code)

### Prerequisites

- Python 3.11+
- Node.js 20+
- npm

### Step 1: Backend Setup

```bash
cd backend
pip install -r ../requirements.txt
python main.py
```

Backend will start at http://localhost:8000

### Step 2: Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will start at http://localhost:5000

### Step 3: Open in Browser

Go to http://localhost:5000

## Azure Environment Variables (Optional)

Create a `.env` file in the backend folder with:

```
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your-api-key
AZURE_OPENAI_DEPLOYMENT=gpt-4
AZURE_OPENAI_API_VERSION=2024-02-01
AZURE_BLOB_CONNECTION_STRING=your-connection-string
AZURE_BLOB_CONTAINER=bridal-images
AZURE_POSTGRESQL_HOST=your-server.postgres.database.azure.com
AZURE_POSTGRESQL_PORT=5432
AZURE_POSTGRESQL_DB=bridal_ai
AZURE_POSTGRESQL_USER=your-username
AZURE_POSTGRESQL_PASSWORD=your-password
```

## API Endpoints

- `POST /api/upload-image` - Upload a face photo
- `POST /api/generate-makeup` - Generate makeup with AI pipeline
- `GET /api/recommend-style` - Get AI style recommendations
- `GET /docs` - Swagger API documentation
