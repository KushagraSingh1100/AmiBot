# 🤖 AmiBot — Your AI Assignment Buddy

**AmiBot** is a personalized RAG (Retrieval-Augmented Generation) chatbot built to assist **Amity University students** with their assignment-related questions.

It combines advanced language modeling with a local document knowledge base to deliver accurate, contextual responses — making it easier for students to focus, understand, and complete academic tasks.

---

## 🔍 What It Does

- 📚 Understands assignment questions  
- 📥 Retrieves relevant content from internal academic documents  
- 💬 Generates clear, context-aware answers  
- 👤 Supports authenticated users with personalized chat sessions  
- 🚀 Provides a smooth and responsive chat interface  

---

## 🧠 Tech Stack

### Backend
- **LangChain** – RAG pipeline orchestration  
- **ChromaDB** – Local vector database  
- **Ollama** – Local LLM runtime (LLaMA, Mistral, etc.)  
- **FastAPI** – Backend API  
- **JWT Authentication** – Secure user login  
- **MongoDB (Beanie ODM)** – User and session persistence  

### Frontend
- **React** – Single Page Application  
- **Redux Toolkit & RTK Query** – Global state management and API handling  
- **redux-persist** – Persisted authentication and session state  
- **Tailwind CSS** – Utility-first styling  
- **Vite** – Fast development environment  

---

## 🧩 Key Features

### 🔐 User Authentication
- Secure **Signup & Login** using JWT tokens  
- Token-based authorization for protected APIs  
- Persistent authentication across browser sessions  

### 🧵 Session Management
- Each conversation runs under a **unique session ID**  
- Sessions are tied to authenticated users  
- Chat history is stored and retrievable  
- Users can resume previous conversations seamlessly  

### 🗂 State Management (Frontend)
- Centralized state using **Redux Toolkit**  
- Auth, active session, and messages managed globally  
- API calls handled efficiently via **RTK Query**  
- Automatic cache management and revalidation  

---

## ⚙️ Setup Instructions

### 🛠 Backend

1. Install Python dependencies
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
