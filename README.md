# 📌 Description  
**Text Summarization Chrome Extension**  
This project implements a **text summarization API** using **Flask**. The API uses AI model from "facebook/bart-large-cnn". The API receives text input and returns a concise summary using NLP techniques.

# 🚀 How to Run  
1. **Set up the virtual environment**  
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```
   
2. **Install dependencies**  
   ```bash
   pip install -r requirements.txt
   ```
   
3. **Run the API server**  
   ```bash
   python server.py
   ```

4. **Open: Google Chrome extension, load unpacked this folder**   
   Make sure to enable developer mode.

# ➕ Miscellaneous
1. **Python version**  
   Python 3.10.4 suitable for the dependencies used.

2. **Summarization may be wrong!**  
   This project uses free model from Huggingface API.
