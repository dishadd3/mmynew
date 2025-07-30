import time
import json
import sys

# Simulated Omnidim session ID & WebSocket URL
# In real integration, use actual Omnidim SDK/API to get these
session_id = f"session_{int(time.time())}"
ws_url = f"ws://localhost:8080/ws/{session_id}"

# Emulate processing time
print(json.dumps({
    "session_id": session_id,
    "ws_url": ws_url
}))
sys.stdout.flush()