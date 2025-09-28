
import chromadb

def get_embedding(text):
    # Placeholder for sentence-transformer embedding
    print("--- SKIPPING EMBEDDING --- (sentence-transformers not installed)")
    return [0] * 384 # all-MiniLM-L6-v2 produces a 384-dimensional vector

def store_vector(embedding, metadata):
    client = chromadb.Client()
    collection = client.get_or_create_collection("website_data")
    collection.add(
        ids=[metadata['url']],
        embeddings=[embedding],
        metadatas=[metadata]
    )
