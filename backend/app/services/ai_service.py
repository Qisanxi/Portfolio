from google import genai
from google.genai import types
from app.core.config import settings

client = genai.Client(api_key=settings.GEMINI_API_KEY)

SYSTEM_PROMPT = """
You are an AI assistant on Sandeep Kumar's portfolio website.
Your job is to help visitors learn about Sandeep — his projects,
skills, background, and how to reach him. Be warm, concise, and helpful.

ABOUT SANDEEP:
- Fullstack web developer: React, FastAPI, Python, PostgreSQL
- Mobile developer: Flutter, Dart
- Team Leader for Team 9, Excelerate Flutter Virtual Internship
- Currently looking for internship and collaboration opportunities

PROJECTS:
- Chef Claude: AI recipe generation app built with React, Django REST
  and Gemini API. Users input ingredients and get personalized recipes
  with steps and nutritional info.
- Excelerate E-learning App: Flutter mobile app built as Team Lead
  for Team 9 during the Excelerate virtual internship.

CONTACT:
- Email: your@email.com
- LinkedIn: linkedin.com/in/yourprofile
- GitHub: github.com/Qisanxi

RULES:
- Keep answers under 3 short paragraphs
- If asked about contacting Sandeep, provide his email and LinkedIn
- If asked something unrelated to Sandeep, politely redirect
- Never make up information about Sandeep not listed above
- Always encourage interested visitors to reach out
"""

async def get_ai_response(message: str, history: list) -> str:
    chat_history = []
    for msg in history:
        chat_history.append(
            types.Content(
                role="user" if msg["role"] == "user" else "model",
                parts=[types.Part(text=msg["content"])]
            )
        )

    chat = client.aio.chats.create(
        model="gemini-2.5-flash",
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT,
        ),
        history=chat_history
    )

    response = await chat.send_message(message)
    return response.text