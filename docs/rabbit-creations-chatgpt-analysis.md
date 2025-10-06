# Rabbit Creations — ChatGPT Analysis (from TXT)

ChatGpt Deep Research Summary and insights

🔹 Display & UI
Small Display (2.88") + Scroll-Wheel-First Design

The UI must be linear and sequential, navigable entirely with scrollUp/scrollDown events.

Avoid grids, multi-column layouts, or deep menus. Present core functionality immediately.

Generative UI (Gen UI) Compatibility

User-applied themes may override fonts, colors, and spacing. Use relative units (em, rem) and high-contrast assets.

Safe Area Variables

Likely available (--rabbit-safe-area-inset-*) to prevent UI elements from being hidden behind system bars.

Enhancement: Optimize for “glanceable” interactions—display results quickly without extra navigation.

🔹 Streaming & Backend Interaction
Cloud-Centric Model (LAM & LLM)

All AI/assistant functions run in the cloud; device is a thin client.

Communication uses a persistent WebSocket via PluginMessageHandler.

Responses may include text, structured JSON, or Base64 audio data (WAV).

Enhancement:
Build async-friendly UIs with clear loading states.

Use structured prompts to request JSON-formatted responses for data-driven displays.

🔹 Audio Features
System Audio Control (window.rabbit.audio)

setVolume(level) and getVolume() APIs exist, but scale (0–7 / 0–15 / 0–30) is undocumented—must be tested on-device.

Hardware scroll wheel does volume control only when PTT button is held or during playback—otherwise intercepted by OS.

Text-to-Speech (window.rabbit.core.say)

High-quality ElevenLabs voice output built in.

Audio Data from LLM Responses

Can include Base64-encoded WAV, which you can decode and play using the Web Audio API.

Enhancement:
For volume: implement software-based volume sliders in-app using window.rabbit.audio (instead of relying on scroll wheel).

Provide auditory feedback (e.g., confirmations, alerts) using TTS.

🔹 Hardware Control
Scroll Wheel

Contextual and mostly intercepted by the OS:

Navigation: scroll events passed to Creations in UI lists.

Reserved: settings (scroll up twice), r-cade launcher (scroll down twice), vision mode, camera rotation, media controls, system volume.

Problem: You cannot override wheel-based volume in normal mode—must use API-based volume control.

Side Button (Push-to-Talk)

Long press: always reserved for voice input.

Single press: may be captured by Creations when foregrounded.

Double/multi-presses: system reserved.

Other Sensors

Accelerometer exists (was used for shake gesture). Currently undocumented in SDK.

Enhancement:
Use the wheel only for navigation inside your app’s UI, not for media control.

For volume, brightness, vibration, etc., rely on window.rabbit.core and window.rabbit.audio APIs.

🔹 Data & Security
Storage API (window.creationStorage)

plain: for non-sensitive data.

secure: encrypted but not fully trustworthy—treat as obfuscation, not strong security.

Enhancement:
Use plain storage for app state/config.

If secure storage is used (tokens, settings), apply Base64 encoding/decoding yourself.

🔹 Strategic Recommendations for Your App
Adopt API-Based Audio Control – Implement in-app controls with window.rabbit.audio, since scroll wheel volume is OS-reserved.

Design Linear, Scroll-Friendly UIs – Optimize display for sequential navigation; avoid clutter.

Enhance Streaming Responsiveness – Add loading states, use structured JSON responses for dynamic displays, and test latency handling.

Leverage TTS & Haptics – Use say() for spoken feedback and vibrate() for subtle alerts.

Confirm Permissions in creation.json – Likely include audioControl, tts, vibrate, plainStorage, secureStorage, and possibly microphone.

✅ In short:
 Your scroll wheel limitation is by design in rabbitOS 2, since the wheel is now reserved for system navigation and contextual overrides. To implement volume control, your app must use the window.rabbit.audio API, not the hardware wheel.

ChatGPT said:

🔹 1. Audio Control (window.rabbit.audio)
Since scroll wheel volume is OS-reserved, use API calls inside your app:
// Example: Volume control (assume scale is 0–15, test on device!)
const MAX_VOLUME = 15;

// Set volume to 50%
const targetVolume = Math.round(MAX_VOLUME * 0.5);
window.rabbit.audio.setVolume(targetVolume);

// Get current volume
const currentVolume = window.rabbit.audio.getVolume();
console.log(`Current volume is ${currentVolume} out of ${MAX_VOLUME}`);

// Mute device
window.rabbit.audio.setVolume(0);

🔹 2. Text-to-Speech Feedback (window.rabbit.core.say)
Use built-in ElevenLabs TTS for user feedback:
// Speak text aloud
window.rabbit.core.say("Welcome! Your playlist is ready to stream.");

// Speak results from your app
function announceResult(resultText) {
  window.rabbit.core.say(`Result is: ${resultText}`);
}

🔹 3. Haptic Feedback (window.rabbit.core.vibrate)
Provide tactile confirmations:
// Simple vibration (200ms)
window.rabbit.core.vibrate();

// Custom pattern (100ms vibrate, 50ms pause, 100ms vibrate)
window.rabbit.core.vibrate([100, 50, 100]);

🔹 4. LLM / Backend Messaging
Send queries and handle responses asynchronously via PluginMessageHandler.
// Send query to backend
PluginMessageHandler.postMessage({
  message: "What is the top trending song today?",
  useLLM: true,
  wantsR1Response: true,
  wantsJournalEntry: false
});

// Handle responses
window.onPluginMessage = function(event) {
  console.log("Server message:", event.data);

  // Handle text response
  if (event.data && event.data.message) {
    document.getElementById("response").innerText = event.data.message;
    window.rabbit.core.say(event.data.message); // optional spoken output
  }

  // Handle structured data
  if (event.data && event.data.data) {
    try {
      const jsonData = JSON.parse(event.data.data.kernel.assistantResponse);
      console.log("Parsed JSON response:", jsonData);
    } catch (e) {
      console.log("Fallback text:", event.data.data.kernel.assistantResponse);
    }
  }
};

🔹 5. Secure & Plain Storage (window.creationStorage)
For app state, settings, or tokens.
Plain storage (non-sensitive):
// Save simple data
window.creationStorage.plain.setItem("theme", "dark");

// Retrieve data
const theme = window.creationStorage.plain.getItem("theme");
console.log("Current theme:", theme);

// Clear all
window.creationStorage.plain.clear();

Secure storage (with Base64 encoding):
// Save sensitive data (e.g., token)
const apiToken = "user-secret-123";
const encodedToken = btoa(apiToken);
window.creationStorage.secure.setItem("apiToken", encodedToken);

// Retrieve and decode
const stored = window.creationStorage.secure.getItem("apiToken");
if (stored) {
  const decodedToken = atob(stored);
  console.log("Decoded token:", decodedToken);
}

✅ With these snippets, you can:
Control volume in-app without relying on the wheel.

Add spoken & haptic feedback.

Handle LLM responses dynamically (text + JSON).

Store user settings and tokens safely.

ChatGPT said:
Great question — the SDK is still under-documented, but the research report reveals some dynamic tools and enhancements you can use beyond audio and storage. I’ll break these down with examples so you can see how they could plug into your Creations app.

🔹 1. Core System Functions (window.rabbit.core)
Besides say() and vibrate(), other inferred or partially confirmed methods can extend interactivity:
launchUrl(url) – open external links.

 window.rabbit.core.launchUrl("https://www.rabbit.tech/creations");

(Likely) getNetworkStatus() – check Wi-Fi or LTE availability (undocumented).

(Likely) getDeviceInfo() – retrieve device info (OS version, model).

(Likely) setBrightness(level) – adjust screen brightness dynamically.

👉 Enhancement: Use launchUrl for hybrid experiences (e.g., opening a YouTube video, pulling external resources).

🔹 2. Generative UI (Gen UI) Awareness
Users can re-theme the system dynamically with natural language (e.g., “make it look like Windows 95”).
Creations don’t control this, but you can make your app resilient to user-driven UI changes.

 body {
  font-size: 1rem; /* scalable with system theme */
  color: var(--rabbit-safe-foreground, #fff);
  background: var(--rabbit-safe-background, #000);
  padding: var(--rabbit-safe-area-inset-top, env(safe-area-inset-top));
}

👉 Enhancement: Your app won’t break if fonts shrink or colors invert.

🔹 3. Media & Streaming Integration
Scroll wheel is intercepted by system media player for playback controls.

But you can use APIs + structured LLM responses to dynamically display/play media.

Example: Fetch structured song metadata via LLM:
PluginMessageHandler.postMessage({
  message: "Give me the top 3 trending songs in JSON format with title and artist.",
  useLLM: true,
  wantsR1Response: false
});

Response could be parsed into a dynamic playlist UI inside your Creation.

🔹 4. Asynchronous Messaging & Multi-Mode Output
Responses may include text, JSON, or Base64-encoded audio.

You can decode audio and play it in-browser using Web Audio API:

function playBase64Audio(base64Wav) {
  const audioCtx = new AudioContext();
  const byteArray = Uint8Array.from(atob(base64Wav), c => c.charCodeAt(0));
  audioCtx.decodeAudioData(byteArray.buffer, buffer => {
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start(0);
  });
}

👉 Enhancement: This enables custom voice experiences (e.g., play backend-synthesized audio clips inside your app instead of just system TTS).

🔹 5. Hardware Event Handling
Side button (single press) can be captured in foreground apps → use for custom quick actions (e.g., bookmark a page, pause media).

Accelerometer (undocumented) – early builds used shake-to-open-settings. Could be probed for gesture-based features.

Example pseudo-code (if exposed in window.rabbit):
window.addEventListener("deviceMotion", e => {
  if (e.acceleration && e.acceleration.x > 5) {
    console.log("Shake detected!");
    window.rabbit.core.vibrate([100, 50, 100]);
  }
});

🔹 6. Permissions (creation.json)
Dynamic capabilities depend on permissions you request. Likely strings:
{
  "name": "My Dynamic App",
  "version": "1.0.0",
  "entryPoint": "https://myapp.com/index.html",
  "permissions": ["audioControl", "tts", "vibrate", "plainStorage", "secureStorage", "microphone"]
}

👉 Enhancement: Proper permissions unlock microphone for custom voice recording, haptics for gaming feedback, and audio control for in-app streaming tools.

🔹 7. Latency-Friendly Design
Because all LLM/LAM calls are cloud-based:
Provide loading states, spinners, or haptic pings when awaiting responses.

Example:

 document.getElementById("status").innerText = "Thinking...";
window.rabbit.core.vibrate(); // subtle ping to confirm request sent

✅ Summary of Extra Enhancements / Tools You Can Use
Core APIs → TTS, vibration, open URLs, maybe brightness/network checks.

Gen UI Awareness → design flexible, theme-resistant UIs.

Media Streaming → use LLM to fetch structured media data, integrate with window.rabbit.audio.

Dynamic Audio Playback → decode & play Base64 audio for custom voices/sounds.

Hardware Controls → side button short-press events, accelerometer for gestures.

Permissions System → unlock microphone, haptics, audio control, storage.

Latency Handling → async-first design with instant feedback.

ChatGPT said:
Got it ✅ — here’s a Feature Playbook for Rabbit R1 Creations development. I split it into two app types you’re most likely to build:
Media / Streaming Apps (music, video, podcasts, etc.)

Utility Apps (tools like notes, calculators, reminders, productivity aids)

Each section prioritizes SDK features and dynamic enhancements that make sense for that category.

🎵 Media / Streaming Creations
Goal: Deliver smooth playback, interactive controls, and quick feedback despite rabbitOS system restrictions.
🔹 Core Priorities
Audio API (window.rabbit.audio)

Direct programmatic volume control.

In-app sliders or preset buttons (mute / 50% / max).

Fallback since scroll wheel is reserved.

TTS (window.rabbit.core.say)

Announce track titles, “Now playing…”, or playlist summaries.

Great for eyes-free use.

Dynamic Audio Playback

Decode Base64 audio from LLM backend → play directly with Web Audio API.

Allows synthesized voices, custom jingles, or dynamic audio responses.

Media Metadata via LLM

Request structured JSON for top charts, recommendations, or podcast feeds.

{
  "title": "Song Title",
  "artist": "Artist Name",
  "length": "3:21"
}

Display as a scrollable playlist UI.

Haptics for Media Control

Vibrate on play/pause toggle, track change, or error (e.g., network lost).

🔹 Secondary Enhancements
Side Button Short-Press → custom action (pause/play).

launchUrl() → open external streaming links (YouTube, Spotify web embeds).

Latency-Friendly Feedback → spinner + short vibration when buffering.

🛠️ Utility Creations
Goal: Quick, glanceable, scroll-friendly apps that get tasks done instantly.
🔹 Core Priorities
Linear UI Design

Scroll-wheel-first interaction → one item per row, step-by-step navigation.

Calculator shows keypad on launch. Notes app shows list → tap note → edit.

TTS (say())

Speak results aloud:

Calculator: “Result is 42.”

Notes: “Note saved.”

Vibration Feedback

Confirm actions (save, delete, complete task).

Plain + Secure Storage

plainStorage: Store preferences, history, last-used data.

secureStorage: Store sensitive tokens (with Base64 encoding).

Asynchronous LLM Calls

Example: Notes app → “Summarize this list” → backend returns structured response.

Calculator → “Convert 15 USD to EUR.”

🔹 Secondary Enhancements
Brightness Control (setBrightness) → utility apps with “focus mode” (reading, journaling).

Network Status Checks → show if offline mode needed.

Side Button Single Press → “quick save” or “quick calculation.”

📊 Comparison Summary
Feature / Tool
Media App Priority 🎵
Utility App Priority 🛠️
window.rabbit.audio (volume)
⭐⭐⭐⭐ High
⭐ Low
say() (TTS feedback)
⭐⭐⭐ High
⭐⭐⭐ High
Haptics (vibrate())
⭐⭐⭐ Medium
⭐⭐⭐ High
Base64 Audio Playback (custom)
⭐⭐⭐⭐ High
⭐ Medium
Metadata via LLM (JSON parsing)
⭐⭐⭐⭐ High
⭐⭐⭐ Medium
Storage APIs (plain + secure)
⭐⭐ Medium
⭐⭐⭐⭐ High
launchUrl()
⭐⭐⭐ Medium
⭐⭐ Low
Brightness / Network Checks
⭐ Low
⭐⭐ Medium
Side Button (short press capture)
⭐⭐ Medium
⭐⭐ Medium

✅ Takeaway:
Media apps → focus on audio APIs, metadata handling, and streaming integration.

Utility apps → focus on storage, haptics, TTS, and latency-friendly design.
