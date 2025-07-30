const express = require('express');
const axios = require('axios');
const { spawn } = require('child_process');
const path = require('path');
const router = express.Router();

router.post('/start-session', async (req, res) => {
  const scriptPath = path.join(__dirname, '..', 'utils', 'create_agent.py');
  const pythonPath = process.env.PYTHON_PATH || 'python';

  const py = spawn(pythonPath, [scriptPath]);

  let output = '';
  let errorOutput = '';

  py.stdout.on('data', (data) => {
    output += data.toString();
  });

  py.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

  py.on('close', async (code) => {
    if (code !== 0) {
      console.error('[Omnidim] Python script failed:\n', errorOutput);
      return res.status(500).json({ error: 'Agent creation failed in Python script' });
    }

    let pipelineId;

    try {
      const response = JSON.parse(output);
      pipelineId = response.pipeline_id;
      if (!pipelineId) throw new Error('Missing pipeline_id in Python output');
    } catch (err) {
      console.error('[Omnidim] JSON parsing error:', err.message);
      return res.status(500).json({ error: 'Invalid response from Python script' });
    }

    try {
      const session = await axios.post(
        'https://api.omnidim.io/v1/pipeline/session',
        { pipeline_id: pipelineId },
        {
          headers: {
            Authorization: `Bearer ${process.env.OMNIDIM_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const { session_id, ws_url } = session.data;

      res.json({ session_id, ws_url });
    } catch (apiErr) {
      console.error('[Omnidim] Failed to start session via API:', apiErr.response?.data || apiErr.message);
      res.status(500).json({ error: 'Failed to create Omnidim session' });
    }
  });
});

module.exports = router;
