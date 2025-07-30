import requests
import websocket
import threading
import json
import base64
import pyaudio
import time

# Replace with your actual values
OMNIDIM_API_KEY = "your_omnidim_api_key_here"
PIPELINE_ID = "your_pipeline_id_here"
BACKEND_API_URL = "http://localhost:8080/api/voice-response" 

# Get session and ws URL from Node.js backend
def get_session_from_backend(user_id):
    response = requests.post(
        "http://localhost:8080/api/omnidim/start-session",  # <-- your Node.js proxy
        json={"userId": user_id}
    )
    if response.status_code != 200:
        raise Exception("Failed to get session from backend.")
    return response.json()

# Audio recording parameters
CHUNK = 1024
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 16000

def on_message(ws, message):
    try:
        data = json.loads(message)
        if data.get('event') == 'response':
            print("OmnidiM response:", data['text'])
            
            # 👇 Extract number from response text
            keyword = extract_number_from_text(data['text'])
            print("Extracted number:", keyword)

            # 👇 Send to backend
            requests.post(BACKEND_API_URL, json={"number": keyword})
            ws.close()
    except Exception as e:
        print("Error processing message:", e)

def on_error(ws, error):
    print("WebSocket Error:", error)

def on_close(ws, close_status_code, close_msg):
    print("WebSocket closed")

def on_open(ws):
    def run():
        print("WebSocket opened. Recording audio...")

        p = pyaudio.PyAudio()
        stream = p.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK)

        for _ in range(int(RATE / CHUNK * 5)):  # 5 seconds of audio
            data = stream.read(CHUNK)
            encoded = base64.b64encode(data).decode("utf-8")
            ws.send(json.dumps({"audio_data": encoded}))
        
        stream.stop_stream()
        stream.close()
        p.terminate()

        # Send end-of-audio signal
        ws.send(json.dumps({"audio_data": None}))
    threading.Thread(target=run).start()

def extract_number_from_text(text):
    import re
    nums = re.findall(r'\d+', text)
    return int(nums[0]) if nums else 0

if __name__ == "__main__":
    user_id = "kanika-singhal"  # optional if your backend uses it

    try:
        session_data = get_session_from_backend(user_id)
        session_id = session_data["session_id"]
        ws_url = session_data["ws_url"]

        ws = websocket.WebSocketApp(
            ws_url,
            on_open=on_open,
            on_message=on_message,
            on_error=on_error,
            on_close=on_close
        )
        ws.run_forever()
    except Exception as e:
        print("Error starting Omnidim pipeline:", e)
