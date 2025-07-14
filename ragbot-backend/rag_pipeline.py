from langchain.vectorstores.chroma import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_community.llms.ollama import Ollama
from get_embedding_function import get_embedding_function

CHROMA_PATH = "chroma"

PROMPT_TEMPLATE = """
Answer the question based only on the following context:

{context}

---

Answer the question based on the above context: {question}

And if answer is not found from the following context give the answer from the internet but mention that the answer was not found in the context.
"""

# Initialize everything once
embedding_function = get_embedding_function()
db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)
prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
llm = Ollama(model="mistral")

def query_rag(query_text: str):
    results = db.similarity_search_with_score(query_text, k=5)
    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt = prompt_template.format(context=context_text, question=query_text)
    response_text = llm.invoke(prompt)
    sources = [doc.metadata.get("id", None) for doc, _score in results]
    return {"answer": response_text, "sources": sources}
