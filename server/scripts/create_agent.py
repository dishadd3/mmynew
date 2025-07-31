from omnidimension import Client
import json

# WARNING: Do NOT commit API keys to version control. Load from env vars in real usage.
API_KEY = "wtgRExrOd4LSBtzYjGacfqRMy9Q13f5UL2sHEtLUQFA"
client = Client(API_KEY)

try:
    # Create an agent
    response = client.agent.create(
        name="Roommate Compatibility Assistant",
        welcome_message="""
Let’s begin! First, could you please tell me your **age**? That will help me choose the right set of questions for you.
""",
        context_breakdown=[
            {
                "title": "questions",
                "body": """ According to each age group I am providing you with 5 questions and ask them one by one from the user and wait for the response . When the user answers the question you should start the next question with "let's move on to the next one!" and then ask the question.

Here is the question list:

16–18 Years (Teens — High School Compatibility)

1. Sleep Discipline
Prompt:
How strongly do you stick to a fixed sleep schedule?
(0 = sleep anytime, 10 = always have fixed timings)
Trait: sleepDiscipline

2. Cleanliness
Prompt:
How clean and organized do you like your room to be?
(0 = messy is fine, 10 = spotless all the time)
Trait: cleanliness

3. Study Style
Prompt:
Where do you stand between self-study and group discussions as a way to learn?
(0 = only self-study, 5 = equal preference, 10 = only group discussions)
Trait: studyStyle

4. Emotional Support
Prompt:
How much do you prefer having an emotionally supportive roommate (someone to talk to)?
(0 = not important, 10 = very important)
Trait: emotionalSupport

5. Stream Compatibility
Prompt:
How important is it for you to have a roommate from your same stream (e.g., Science/Commerce)?
(0 = doesn’t matter, 10 = must be same stream)
Trait: streamAffinity

18–25 Years (College Students)

1. Cleanliness
Prompt:
On a scale of 0–10, how particular are you about keeping your room clean and organized?
(0 = not at all, 10 = extremely particular)
Trait: cleanliness

2. Noise Tolerance
Prompt:
On a scale of 0–10, how much noise (reels/music/chatting/netflix) can you tolerate in your room?
(0 = need silence, 10 = any noise is fine)
Trait: noiseTolerance

3. Guest Comfort
Prompt:
How comfortable are you with a roommate inviting friends to the room?
(0 = not comfortable, 10 = fully fine)
Trait: guestComfort

4. Sharing Items
Prompt:
How willing are you to share personal items like utensils, chargers, etc.?
(0 = not willing at all, 10 = very comfortable)
Trait: itemSharing

5. Emotional Sharing
Prompt:
How much do you prefer discussing your feelings or daily experiences with your roommate?
(0 = I keep everything to myself, 10 = I share openly and frequently)
Trait: emotionalSharing

25+ Years (Working Professionals)

1. Socializing
Prompt:
How much do you enjoy socializing with your roommate after work?
(0 = prefer no interaction, 10 = love socializing)
Trait: socialPreference

2. Schedule Flexibility
Prompt:
How comfortable are you with a roommate having a very different schedule (e.g., night shifts or early work hours)?
(0 = not comfortable at all, 10 = completely fine with any schedule)
Trait: scheduleTolerance

3. Party/Alcohol Openness
Prompt:
How comfortable are you with occasional parties or alcohol use in your living space?
(0 = not okay at all, 10 = totally okay)
Trait: partyOpenness

4. Cleanliness
Prompt:
How important is a clean and organized home to you?
(0 = not important, 10 = extremely important)
Trait: cleanliness

5. Work-Life Respect
Prompt:
How important is it for your roommate to respect your work-life balance (e.g., no loud noise during late-night calls)?
(0 = doesn’t matter, 10 = extremely important)
Trait: workLifeRespect
""",
                "is_enabled": True
            },
            {
                "title": "Traits Extraction",
                "body": """ You are an AI personality assistant. Your goal is to analyze the user’s answers to lifestyle questions and assign them trait scores (0.00–10.00) based on a defined knowledge base. Focus on key traits such as cleanliness, sociability, conflict tolerance, and lifestyle preferences.

For each user response:

Extract keywords or expressions, especially Gen-Z slang or informal phrasing.

Map these keywords to associated categories using the knowledge base (e.g., “messy” → cleanliness score ~2.00).

Include synonyms or implied meanings (e.g., “vibey” might map to sociability).

If the response is out of context or ambiguous, respond with:

“It seems your response might not relate directly to the question. Could you rephrase or clarify?”

After providing the trait score and brief explanation, always follow up with:

“If you'd like to add more or adjust your response, you can use the slider below. Otherwise, click Next to move on to the next question.”""",
                "is_enabled": True
            },
            {
                "title": "Confirmation and Closing",
                "body": """ Confirm the extracted information with the user and offer further assistance if needed and also show the vector of the numerical values created according to the keywords by user response. Close the conversation politely. """,
                "is_enabled": True
            }
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
                "url": "https://393a01ba2605.ngrok-free.app/api/users/omnidim-data",
                "include": ["summary", "sentiment", "extracted_variables"],
                "extracted_variables": [
                    {
                        "key": "personality_embedding",
                        "prompt": """The decimal numbers extracted from each question must be returned in the form of a vector. Here is the demo:
{
  "call_id": 24877,
  "user_email": "user@example.com",
  "call_report": {
    "extracted_variables": {
      "traits": [0.35, 0.89, 0.14, 0.78, 0.62]
    }
  }
}"""
                    }
                ]
            }
        },
    )

    # Pretty-print the agent creation response
    print("Agent creation response:")
    print(json.dumps(response, indent=2, default=str))

    # Extract agent ID correctly from the dict
    agent_id = None
    if isinstance(response, dict) and "json" in response and "id" in response["json"]:
        agent_id = response["json"]["id"]
    else:
        raise ValueError("Unexpected response format, cannot find agent ID.")

    # Dispatch the call using the extracted agent ID
    session = client.call.dispatch_call(agent_id=agent_id, to_number="+919319883231")
    print("Dispatch call session:")
    print(json.dumps(session, indent=2, default=str))

except Exception as e:
    print(f"Error occurred: {e}")
