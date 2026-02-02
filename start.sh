#!/bin/bash

# Start script for Studio application (both frontend and backend)

echo "🚀 Starting Studio Application..."

# Check if Python virtual environment exists
if [ ! -d "backend/venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv backend/venv
fi

# Activate virtual environment and install dependencies
echo "📦 Installing Python dependencies..."
source backend/venv/bin/activate
pip install -q -r backend/requirements.txt

# Check if .env file exists
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Warning: backend/.env file not found. Copying from .env.example"
    cp backend/.env.example backend/.env
    echo "⚠️  Please edit backend/.env with your API keys"
fi

# Start backend server in background
echo "🔧 Starting Python backend on port 8000..."
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 2

# Start frontend
echo "🎨 Starting Next.js frontend on port 9002..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Studio Application is running!"
echo "   Frontend: http://localhost:9002"
echo "   Backend API: http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers"

# Handle cleanup on exit
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT

# Wait for processes
wait
