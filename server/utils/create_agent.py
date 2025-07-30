
import json
from omnidimension import Client
import os

api_key = os.getenv("OMNIDIM_API_KEY")
client = Client(api_key)

response = client.agent.create(
    name="Roommate Compatibility Assistant",
    welcome_message="Let’s begin! First, could you please tell me your **age**?",
    context_breakdown=[
                {"title": "questions", "body": """ According to each age group I am providing you with 5 questions and ask them one by one from the user and wait for the response . When the user answers the question you should  start the next question with "let's move on to the next one!" and then ask the question.\nHere is the question list:\n16–18 Years (Teens — High School Compatibility)\n1. Sleep Discipline\nPrompt:\nHow strongly do you stick to a fixed sleep schedule?\n(0 = sleep anytime, 10 = always have fixed timings)\nTrait: sleepDiscipline\n\n2. Cleanliness\nPrompt:\nHow clean and organized do you like your room to be?\n(0 = messy is fine, 10 = spotless all the time)\nTrait: cleanliness\n\n3. Study Style\nPrompt:\nWhere do you stand between self-study and group discussions as a way to learn?\n(0 = only self-study, 5 = equal preference, 10 = only group discussions)\nTrait: studyStyle\n\n4. Emotional Support\nPrompt:\nHow much do you prefer having an emotionally supportive roommate (someone to talk to)?\n(0 = not important, 10 = very important)\nTrait: emotionalSupport\n\n5. Stream Compatibility\nPrompt:\nHow important is it for you to have a roommate from your same stream (e.g., Science/Commerce)?\n(0 = doesn’t matter, 10 = must be same stream)\nTrait: streamAffinity\n\n18–25 Years (College Students)\n1. Cleanliness\nPrompt:\nOn a scale of 0–10, how particular are you about keeping your room clean and organized?\n(0 = not at all, 10 = extremely particular)\nTrait: cleanliness\n\n2. Noise Tolerance\nPrompt:\nOn a scale of 0–10, how much noise (reels/music/chatting/netflix) can you tolerate in your room?\n(0 = need silence, 10 = any noise is fine)\nTrait: noiseTolerance\n\n3. Guest Comfort\nPrompt:\nHow comfortable are you with a roommate inviting friends to the room?\n(0 = not comfortable, 10 = fully fine)\nTrait: guestComfort\n\n4. Sharing Items\nPrompt:\nHow willing are you to share personal items like utensils, chargers, etc.?\n(0 = not willing at all, 10 = very comfortable)\nTrait: itemSharing\n\n5. Emotional Sharing\nPrompt:\nHow much do you prefer discussing your feelings or daily experiences with your roommate?\n(0 = I keep everything to myself, 10 = I share openly and frequently)\nTrait: emotionalSharing\n\n25+ Years (Working Professionals)\n1. Socializing\nPrompt:\nHow much do you enjoy socializing with your roommate after work?\n(0 = prefer no interaction, 10 = love socializing)\nTrait: socialPreference\n\n2. Schedule Flexibility\nPrompt:\nHow comfortable are you with a roommate having a very different schedule (e.g., night shifts or early work hours)?\n(0 = not comfortable at all, 10 = completely fine with any schedule)\nTrait: scheduleTolerance\n\n3. Party/Alcohol Openness\nPrompt:\nHow comfortable are you with occasional parties or alcohol use in your living space?\n(0 = not okay at all, 10 = totally okay)\nTrait: partyOpenness\n\n4. Cleanliness\nPrompt:\nHow important is a clean and organized home to you?\n(0 = not important, 10 = extremely important)\nTrait: cleanliness\n\n5. Work-Life Respect\nPrompt:\nHow important is it for your roommate to respect your work-life balance (e.g., no loud noise during late-night calls)?\n(0 = doesn’t matter, 10 = extremely important)\nTrait: workLifeRespect\n\n\n """ , 
                "is_enabled" : True},
                {"title": "Traits Extraction", "body": """ Identify and extract key traits or keywords from the response related to cleanliness, sociability, conflict tolerance, or lifestyle preferences. Pay special attention to Gen-Z expressions, informal language, and slang for a meaningful analysis.\nFrom the keywords in the knowledge base for each question assign a decimal number up to 2 decimal places from 0-10 according to given scale in knowledge base. Make sure it is as accurate as possible and also include any synonyms associated with the keywords if they are mentioned in the user response.  """ , 
                "is_enabled" : True},
                {"title": "Confirmation and Closing", "body": """ Confirm the extracted information with the user and offer further assistance if needed and also show the vector of the numerical values created according to the keywords by user response . Close the conversation politely. """ , 
                "is_enabled" : True}
    ],
    call_type="Incoming",
    transcriber={
        "provider": "deepgram_stream",
        "silence_timeout_ms": 400,
        "model": "nova-3",
        "numerals": True,
        "punctuate": True,
        "smart_format": True,
        "diarize": False
    },
    model={
        "model": "azure-gpt-4o-mini",
        "temperature": 0.7
    },
    voice={
        "provider": "eleven_labs",
        "voice_id": "cgSgspJ2msm6clMCkdW9"
    },
    web_search={
        "enabled": True,
        "provider": "openAI"
    },
    post_call_actions={
        "webhook": {
            "enabled": True,
            "url": "http://localhost:8080/api/users/omnidim-data?userId=688951986c93608cb0ed357f&traits=5,6,3,4,9",
            "include": ["summary", "sentiment", "extracted_variables"],
            "extracted_variables": [
                {
                    "key": "personality_embedding",
                    "prompt": "The decimal numbers extracted from each question must be returned in the form of a vector..."
                }
            ]
        }
    }
)

print(json.dumps(response))  # Important for parsing in Node.js
