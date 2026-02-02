# Firebase Studio

---

### ✨ دعم تطوير أدوات الذكاء الاصطناعي للجميع ✨

مشروع `studio` هو أداة مجانية ومفتوحة المصدر تهدف إلى تسهيل الوصول لتقنيات الذكاء الاصطناعي وتطويرها. دعمكم عبر GitHub Sponsors سيساعدنا على إضافة ميزات جديدة، صيانة المشروع، وتوفير المزيد من الأدوات المبتكرة للمجتمع العربي.

**[ادعم المشروع على GitHub Sponsors](https://github.com/sponsors/ZOOKA-AI)**

---

## 🚀 Overview

Studio is a modern full-stack application combining:
- **Frontend**: Next.js 15 with TypeScript, React, and Tailwind CSS
- **Backend**: Python FastAPI with AI integrations
- **AI**: Google Gemini AI for intelligent features
- **Database**: Firebase Firestore

## 📋 Features

- 🎯 Role-based dashboard (Admin, Supervisor, Worker)
- 📊 Real-time reporting and analytics
- 🤖 AI-powered report summarization
- 💡 Intelligent material suggestions
- 📅 Task scheduling and management
- 📸 Image upload and documentation
- 🔍 Advanced search and filtering

## 🛠️ Tech Stack

### Frontend
- Next.js 15.3
- TypeScript
- React 18
- Tailwind CSS
- Radix UI Components
- Firebase SDK

### Backend
- Python 3.9+
- FastAPI
- Google Generative AI (Gemini)
- Uvicorn

## 🏃 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- Firebase account
- Google AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ZOOKA-AI/studio.git
   cd studio
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cd ..
   ```

4. **Configure environment variables**
   ```bash
   # Frontend
   cp .env.example .env.local
   # Edit .env.local with your Firebase config
   
   # Backend
   cp backend/.env.example backend/.env
   # Edit backend/.env with your API keys
   ```

### Running the Application

#### Option 1: Run Everything Together
```bash
./start.sh
```

#### Option 2: Run Separately

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
source venv/bin/activate
python main.py
```

The application will be available at:
- Frontend: http://localhost:9002
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## 📁 Project Structure

```
studio/
├── src/                    # Next.js source code
│   ├── app/               # App router pages
│   ├── components/        # React components
│   ├── context/           # React contexts
│   ├── ai/                # Genkit AI flows
│   └── lib/               # Utilities
├── backend/               # Python backend
│   ├── main.py           # FastAPI app
│   ├── services/         # Service modules
│   │   └── ai_service.py # AI integrations
│   ├── requirements.txt  # Python dependencies
│   └── README.md         # Backend documentation
├── docs/                  # Documentation
├── public/               # Static assets
└── start.sh              # Startup script
```

## 🤖 AI Features

The application includes powerful AI capabilities:

### Report Summarization
Automatically generate summaries and key points from daily reports using Google Gemini AI.

### Material Suggestions
Get intelligent material recommendations based on work descriptions and requirements.

### Text Analysis
Analyze text for sentiment, entities, and insights.

## 🔧 Development

### Frontend Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run linter
npm run typecheck    # Type checking
```

### Backend Development
```bash
cd backend
python test_ai.py    # Test AI services
uvicorn main:app --reload  # Run with auto-reload
```

## 📚 Documentation

- [Backend Documentation](./backend/README.md)
- [Blueprint](./docs/blueprint.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 💬 Support

For support and questions, please open an issue on GitHub or contact us through GitHub Sponsors.

---

Made with ❤️ by ZOOKA-AI