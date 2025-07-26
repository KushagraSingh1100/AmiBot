# 🤖 AmiBot — Your AI Assignment Buddy

**AmiBot** is a personalized RAG (Retrieval-Augmented Generation) chatbot built to assist **Amity University students** with their assignment-related questions.

It combines advanced language modeling with a local document knowledge base to deliver accurate, contextual responses — making it easier for students to focus, understand, and complete academic tasks.

---

## 🔍 What It Does

- 📚 **Understands assignment questions**  
- 📥 **Retrieves relevant content from internal academic documents**  
- 💬 **Generates clear, context-aware answers**  
- 🚀 **Available via a smooth and responsive chat interface**

---

## 🧠 Tech Stack

### Backend
- **LangChain** – RAG pipeline orchestration
- **ChromaDB** – Lightweight, local vector database for document storage
- **Ollama** – Local LLM runtime (e.g. LLaMA, Mistral, etc.)
- **FastAPI** – API layer

### Frontend
- **React** – SPA architecture
- **Tailwind CSS** – Utility-first styling
- **Vite** – Fast dev environment

---
## ⚙️ Setup Instructions

### 🛠 Backend

1. **Install Python dependencies**

```bash
cd ragbot-backend
source .venv/bin/activate
pip install -r requirements.txt
```

2. **Start Ollama with your preferred model**
```bash
ollama run llama3
```

3. **Run the backend API**
```bash
uvicorn app:app --reload
```

### 🎨 Frontend

**Install frontend dependencies**

```bash
cd ragbot-frontend
npm install
```

**Start the dev server**
```bash
npm run dev
```

## 👨‍🎓 Built For

🎓 **Amity University Students**  
Helps simplify assignment work by giving AI-powered answers based on uploaded coursework and syllabi.

---

## 🙋‍♂️ Author

**Kushagra Singh**  
Developer & Student at Amity University  
[LinkedIn](https://www.linkedin.com/in/kushagra-singh-7288a4297/) • [GitHub](https://github.com/KushagraSingh1100)
