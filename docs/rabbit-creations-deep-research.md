# Rabbit Creations — Deep Research (PDF Extract)

(no subject)
1 message
Leticia Loreto <leticialoreto1991@gmail.com> Mon, Sep 29, 2025 at 8:44 PM
To: Joe <palomo32@gmail.com>
Comprehensive Developer's Guide to the Rabbit R1 Creations SDK
Platform Architecture and Development Environment
An effective approach to developing applications, or "Creations," for the Rabbit R1 device necessitates a
foundational understanding of its unique system architecture. The device is not a conventional
smartphone, nor does it operate on a traditional application model. Instead, it leverages a hybrid
architecture combining a bespoke version of the Android Open Source Project (AOSP) for its on-device
operations with a powerful, cloud-centric backend that handles all artiﬁcial intelligence and complex
task execution. This design has profound implications for the development lifecycle, application
performance, and the overall capabilities afforded to third-party developers.
Core Architecture: A Bespoke AOSP Foundation
The operating system of the Rabbit R1, known as rabbitOS, is fundamentally built upon the Android
Open Source Project (AOSP). This architectural decision is the most signiﬁcant factor inﬂuencing the
nature of the Creations SDK. Rather than engineering a completely new native operating system and
application framework, Rabbit has chosen to utilize the mature and robust foundation of Android.
Analysis and reverse-engineering efforts conducted by the developer community have conﬁrmed that
rabbitOS is a relatively standard AOSP build, with the primary user experience being delivered through a
custom launcher application that serves as the device's main interface.
The reliance on AOSP directly informs the "app as a WebView" model that deﬁnes the Creations
platform. Third-party applications are not compiled native Android packages (.apk ﬁles) but are instead
standard web applications rendered within a WebView component inside the main rabbitOS launcher.
This approach presents a deliberate trade-off. On one hand, it dramatically lowers the barrier to entry for
developers, allowing anyone proﬁcient in standard web technologies—HTML, CSS, and JavaScript—to
build experiences for the device. On the other hand, it introduces performance constraints inherent to
web technologies when compared to native code.
This architectural choice clariﬁes the purpose of the Creations SDK. The entire suite of proprietary
JavaScript objects, including window.rabbit and window.creationStorage, functions as an API bridge.
This bridge serves as the essential communication layer between the sandboxed web environment of a
Creation and the underlying native capabilities of rabbitOS and the device hardware. The features,
limitations, and stability of this JavaScript bridge deﬁne the entire development landscape. The
community's ability to extract the R1 launcher and run it successfully on a standard Android
smartphone further demonstrates that the core logic is contained within a single Android application,
solidifying the understanding that Creations are web content loaded into this host application.
The Cloud-Centric Model: Large Action Model (LAM) and Backend Services
A central pillar of the Rabbit R1's functionality and marketing is its proprietary Large Action Model
(LAM). It is critical for developers to understand that the LAM, along with the Large Language Models
(LLMs) that power its conversational abilities, operates entirely on Rabbit's cloud servers, not on the R1
device itself. The device's primary function is that of a thin client: it is designed to capture user intent
through its hardware interfaces (microphone, camera, buttons) and transmit this intent to the cloud for
processing. All computationally intensive tasks, from answering complex queries to executing multi-
step actions on third-party services, are handled by the backend infrastructure.
Reverse-engineering of the device's network traﬃc has revealed that its primary communication
channel is a persistent WebSocket connection to the endpoint wss://r1-api.rabbit.tech/session. All

interactions with the LAM and other backend services are funneled through this connection. This cloud-
centric model means that developers are not building on-device AI applications but are instead creating
web-based frontends that interface with a remote, powerful, and shared AI service.
The performance and responsiveness of any Creation are therefore fundamentally tied to network
conditions. The round-trip latency between the device and Rabbit's servers is a primary architectural
constraint that must be considered in all aspects of application design. User interfaces should be built
to handle asynchronous operations gracefully, providing clear feedback and loading states while
awaiting server responses. This model also provides context for the device's $199 one-time purchase
price with no recurring subscription fees. Rabbit's business model is predicated on the assumption that
the cumulative cost of cloud-based AI inference per user will remain economically viable over the
lifespan of the device, a signiﬁcant technical and ﬁnancial consideration that underscores the platform's
reliance on its backend services.
Hardware Event Handling API
Overview
The Rabbit R1 features a minimalist set of physical controls designed to facilitate its primary function
as a voice-ﬁrst AI companion. The main inputs are the side-mounted Push-to-Talk (PTT) button and a
clickable analog scroll wheel. While the 2.88-inch display is a touchscreen, its use is generally reserved
for speciﬁc contexts like the virtual keyboard or scrolling through generated UI cards, rather than for
primary navigation.
Due to the inaccessibility of the oﬃcial SDK's source code examples, this section documents the known
user-facing hardware interactions and maps them to their system-level functions. This provides a clear
framework for understanding which user actions are reserved by the operating system and which are
likely to be passed as events to a running Creation. The behavior of the hardware controls is highly
modal; their function changes depending on the current state of the operating system. A Creation can
likely only receive hardware events when it is the active, focused application, and even then, the OS may
intercept or override these events in certain global contexts, such as an incoming notiﬁcation or a
system-level alert.
Side Button (Push-to-Talk)
The side button is the most frequently used physical control on the R1. Its functions are overloaded,
with behavior dependent on the duration and number of presses.
* Press and Hold: This is the primary interaction for voice commands. The OS begins listening for a
voice prompt when the button is held down and stops when it is released. It is highly probable that the
corresponding longPressStart and longPressEnd events are globally captured by rabbitOS to manage
audio recording and are not available for custom use within a Creation, unless that Creation has been
granted explicit control over the microphone via a permission in its creation.json manifest.
* Single Press: When the device is on the home screen, a single, short press will put the device into or
wake it from sleep mode. This sideClick event is the most likely candidate for a general-purpose button
press that can be captured and handled by a Creation when it is in the foreground.
* Double Press: A quick double press of the side button globally activates "vision mode," which launches
the camera interface. This shortcut is almost certainly reserved by the system and will not be passed to
a Creation.
* Multiple Quick Presses: The operating system reserves speciﬁc multi-press patterns for system-level
troubleshooting. Pressing the button ﬁve times in quick succession performs a "memory refresh," which
re-establishes the connection to Rabbit's cloud services. Pressing the button eight times in quick
succession powers off the device. These sequences are system-level interrupts and are unavailable to
developers.
Scroll Wheel
The scroll wheel is the primary means of navigating the rabbitOS interface, underscoring the device's
non-touch-centric design philosophy. Its function is highly contextual.
* Navigation: In menus, such as the settings screen or lists within a Creation, the scroll wheel is used to
move focus up and down between items. A running Creation should expect to receive scrollUp and
scrollDown events to handle navigation within its own UI.

* System Shortcuts: From the home screen, speciﬁc scroll gestures are reserved as shortcuts. Scrolling
up twice opens the settings menu, and scrolling down twice opens the r-cade game launcher.
* Contextual Control: The scroll wheel's function changes in different OS modes. In vision mode, it
physically rotates the camera module. When the PTT button is held down, it adjusts the system volume.
During music playback, scrolling down skips to the next track, while scrolling up opens the music
queue. These contextual overrides mean that a Creation running in the background (e.g., playing music)
will not receive scroll events, as they will be intercepted by the system's media controller.
Other Hardware Events
Early versions of rabbitOS used a shaking gesture to open the settings menu. While this has since been
replaced by a scroll gesture, it indicates the presence of an accelerometer and the potential for gesture-
based events within the underlying AOSP system. However, the availability of these events through the
Creations SDK is undocumented and should not be considered a stable or reliable API for development.
Table 2.1: Mapping of Physical Actions to Documented System Functions
The following table provides a consolidated reference for system-reserved hardware actions.
Developers should use this to understand expected user interaction patterns and to avoid building
features that conﬂict with global OS-level functionality.
| Physical Action | Context | Resulting System Function | Source(s) |
|---|---|---|---|
| Press and Hold Side Button | Any | Initiates voice command listening. |  |
| Single Press Side Button | On Home Screen / Asleep | Toggles sleep mode. |  |
| Double Press Side Button | Any | Activates vision mode (camera). |  |
| 5x Quick Press Side Button | Any | Performs a memory refresh (cloud reconnect). |  |
| 8x Quick Press Side Button | Any | Powers off the device. |  |
| Scroll Wheel | On Home Screen | Scroll up twice for settings; down twice for r-cade. |  |
| Scroll Wheel | In Vision Mode | Rotates the physical camera module. |  |
| Scroll Wheel | While PTT Button is Held | Adjusts system volume. |  |
| Scroll Wheel | During Music Playback | Scrolls down for next track; up for queue. |  |
| Shake Device | Any (Legacy OS versions) | Opened settings menu. |  |
On-Device Data Persistence (window.creationStorage)
API Overview and Purpose
Standard web storage mechanisms like localStorage and sessionStorage are unsuitable for an
environment like rabbitOS, where multiple untrusted web applications (Creations) run on the same
device. These standard APIs offer no robust mechanism for data isolation or security between different
origins loaded within the same host application. To address this, the Creations SDK provides a
proprietary, sandboxed storage API exposed through the window.creationStorage object.
The provision of this custom API is a deliberate and necessary architectural decision. It serves as a
critical security and sandboxing layer, allowing rabbitOS to enforce strict data isolation between
different Creations. Each Creation is given its own private data store, preventing it from accessing or
modifying the data of any other Creation. Furthermore, this native bridge allows the SDK to offer an
encrypted storage option that can leverage the underlying cryptographic hardware and APIs of the
AOSP platform, such as the Android Keystore system, to protect sensitive data at rest.
Insecure Storage (window.creationStorage.plain)
The window.creationStorage.plain namespace provides a mechanism for storing non-sensitive, plain-
text data, analogous to the standard localStorage API. While no direct code examples are available from
the oﬃcial repository, the API methods can be conﬁdently inferred based on industry-standard web
storage patterns.
* setItem(key, value): This method is used to persist a key-value pair. Both the key and value must be
strings. To store complex data structures like JavaScript objects or arrays, they must ﬁrst be serialized
into a string format, typically using JSON.stringify().
* getItem(key): This method retrieves the string value associated with the speciﬁed key. If the key does
not exist, it will likely return null. When retrieving serialized data, the application logic must deserialize
the string back into a JavaScript object using JSON.parse().

* removeItem(key): This method deletes the key-value pair associated with the speciﬁed key.
* clear(): This method removes all key-value pairs stored by the Creation in the plain storage
namespace.
Example Usage (Inferred):
// Storing a user's high score (a simple string)
window.creationStorage.plain.setItem('highScore', '10000');
// Storing a complex settings object
const userSettings = {
  theme: 'dark',
  notiﬁcations: true,
  diﬃculty: 'hard'
};
window.creationStorage.plain.setItem('userSettings', JSON.stringify(userSettings));
// Retrieving and parsing the settings object
const storedSettingsString = window.creationStorage.plain.getItem('userSettings');
if (storedSettingsString) {
  const settings = JSON.parse(storedSettingsString);
  console.log('User theme is:', settings.theme);
}
// Removing a speciﬁc item
window.creationStorage.plain.removeItem('highScore');
// Clearing all data for the Creation
window.creationstorage.plain.clear();
Encrypted Storage (window.creationStorage.secure)
The window.creationStorage.secure namespace is designed for storing sensitive information, such as
user-speciﬁc settings, authentication tokens, or other private data. It is expected to use the same
method signatures as the .plain namespace: setItem, getItem, removeItem, and clear.
However, developers must approach this API with signiﬁcant caution. A recent, publicly disclosed
security incident revealed that Rabbit had hardcoded sensitive API keys for third-party services directly
into their application code. This practice indicates a potential lack of mature security protocols within
the development team. While the .secure storage API is intended to provide encryption, the quality and
robustness of its implementation are unknown. Until Rabbit provides transparent documentation on the
underlying cryptographic methods used (e.g., encryption algorithms, key management practices) and
ideally undergoes a third-party security audit, developers should not use this API to store any data that
could result in signiﬁcant user harm if compromised, such as personally identiﬁable information (PII),
passwords, or private cryptographic keys.
A further critical implementation detail relates to data encoding. Native cryptographic functions in
Android operate on byte arrays, not JavaScript strings. The bridge between the WebView and the native
code requires a standardized method for transmitting binary data. The industry standard for this is
Base64 encoding. Therefore, it is highly probable that any data to be stored using the .secure API must
ﬁrst be converted to a Base64 string using the btoa() function. Similarly, data retrieved using getItem
will be a Base64 string that must be decoded back to its original form using atob(). This is a crucial and
non-obvious step that is essential for the correct functioning of the API.
Example Usage (Inferred, with mandatory Base64 encoding):
// Storing a sensitive API token
const apiToken = 'secret-user-token-12345';
const encodedToken = btoa(apiToken); // Base64 encode the string

window.creationStorage.secure.setItem('apiToken', encodedToken);
// Retrieving and decoding the API token
const storedEncodedToken = window.creationStorage.secure.getItem('apiToken');
if (storedEncodedToken) {
  const decodedToken = atob(storedEncodedToken); // Decode from Base64
  console.log('Retrieved API Token:', decodedToken);
}
// Storing a complex object securely
const userProﬁle = {
  userId: 'user-001',
  email: 'user@example.com'
};
const proﬁleString = JSON.stringify(userProﬁle);
const encodedProﬁle = btoa(proﬁleString); // Stringify, then Base64 encode
window.creationStorage.secure.setItem('userProﬁle', encodedProﬁle);
// Retrieving and decoding the object
const storedEncodedProﬁle = window.creationStorage.secure.getItem('userProﬁle');
if (storedEncodedProﬁle) {
  const decodedProﬁleString = atob(storedEncodedProﬁle); // Decode from Base64
  const proﬁle = JSON.parse(decodedProﬁleString); // Then parse the JSON
  console.log('User email:', proﬁle.email);
}
Core System and Audio APIs
Core System Functions (window.rabbit.core)
The window.rabbit.core object serves as the primary JavaScript interface for a Creation to interact with
the device's core system services that are not directly related to audio or storage. This API allows a web
application to trigger native device actions, providing a richer, more integrated user experience than a
standard web page. Based on conﬁrmed usage and logical inference, the following functions are part of
this API.
* say(text): This function utilizes the system's text-to-speech (TTS) engine to vocalize a given string of
text. The voice synthesis is provided through a partnership with ElevenLabs, known for its high-quality,
low-latency voice models. This allows Creations to provide auditory feedback or speak content to the
user in the device's default voice.
   * Parameter: text (string) - The text to be spoken.
   * Example: window.rabbit.core.say('Welcome to the Weather Creation. The current temperature is 21
degrees Celsius.');
* vibrate(pattern): This function controls the device's haptic feedback motor. This is essential for
providing non-visual cues to the user, such as conﬁrming an action or providing a notiﬁcation.
   * Parameter: pattern (Array of numbers) - The vibration pattern, likely speciﬁed as an array of integers
representing milliseconds. For example, `` would vibrate for 100ms, pause for 50ms, and then vibrate
again for 100ms.
   * Example: window.rabbit.core.vibrate(); // A single 200ms vibration
* launchUrl(url): This function is used to open a URL. The exact behavior is unconﬁrmed; it might open
the URL in a dedicated, sandboxed system browser view, or it could potentially pass the URL to the
Large Action Model (LAM) for processing, depending on the system's conﬁguration.
   * Parameter: url (string) - The fully qualiﬁed URL to launch.
   * Example: window.rabbit.core.launchUrl('https://www.rabbit.tech/creations');
While these three functions are known, the window.rabbit.core API is almost certainly more extensive. A

complete and robust SDK would logically include functions for interacting with other core system
features. Potential, but unconﬁrmed, functions might include:
* getNetworkStatus(): To check if the device is connected to Wi-Fi or a cellular network.
* getDeviceInfo(): To retrieve information like the rabbitOS version, which is known to be sent in API
headers to the backend.
* setBrightness(level): To programmatically control the screen's brightness.
The absence of oﬃcial documentation for these functions represents a signiﬁcant knowledge gap. The
deﬁnitive method for discovering the full API surface is to load a simple web page on a physical R1
device and inspect the window.rabbit.core object using remote debugging tools.
System Audio Control (window.rabbit.audio)
The window.rabbit.audio object provides programmatic control over the device's system-wide audio
volume. While users can adjust the volume manually through hardware controls  or system settings ,
this API allows Creations to manage volume directly, which is particularly useful for media applications
or games.
* setVolume(level): Sets the system audio volume to a speciﬁc level.
   * Parameter: level (number) - The desired volume level.
* getVolume(): Returns the current system audio volume level as a number.
A critical but undocumented detail is the scale of the volume level. Unlike standard web or desktop
environments that often use a 0-100 scale, embedded and mobile operating systems frequently use a
much smaller integer scale, such as 0-7, 0-15, or 0-30. For example, if the R1 uses a 0-15 scale, calling
window.rabbit.audio.setVolume(50) would likely result in the volume being set to the maximum level of
15, which could be a jarring and unpleasant experience for the user. Developers must empirically test
this function on a physical device to determine the exact range of valid volume values before
implementing any volume control features.
Example Usage (Assuming a 0-15 scale):
// Set volume to 50%
const MAX_VOLUME = 15;
const targetVolume = Math.round(MAX_VOLUME * 0.5);
window.rabbit.audio.setVolume(targetVolume); // Sets volume to 7 or 8
// Get the current volume and log it
const currentVolume = window.rabbit.audio.getVolume();
console.log(`Current volume is ${currentVolume} out of ${MAX_VOLUME}`);
// Mute the device
window.rabbit.audio.setVolume(0);
LLM and Voice Interaction (PluginMessageHandler)
Communication Protocol and Abstraction
Direct interaction with the Rabbit R1's backend AI services, including the Large Language Model (LLM),
is not handled through conventional REST APIs or direct WebSocket connections from within a
Creation. Instead, the SDK provides a high-level interface object, PluginMessageHandler, which serves
as a proxy for all communication with the backend.
This design is an intentional abstraction layer. The main rabbitOS launcher application is responsible for
establishing and maintaining the single, persistent, and authenticated WebSocket connection to
Rabbit's servers. The PluginMessageHandler within the Creation's WebView acts as a message queue.
When a Creation calls postMessage(), it is not opening a new network connection; it is simply passing a
message to the host OS, which then forwards that message over the already-established channel. This
architecture simpliﬁes development by abstracting away the complexities of connection management,
authentication, and message serialization, while also enhancing security by preventing individual
Creations from directly accessing the device's authentication tokens or managing their own network
connections.

Sending Messages to the LLM (PluginMessageHandler.postMessage)
To send a request to the backend, a Creation must call the PluginMessageHandler.postMessage()
function with a single argument: a JavaScript object representing the payload. This payload contains
the user's query and a set of ﬂags that instruct the backend on how to process the request.
The structure of the payload, as inferred from reverse-engineering efforts and expected functionality,
includes the following key parameters:
* message: A string containing the natural language query or command for the LLM.
* useLLM: A boolean ﬂag. When set to true, it indicates that the message should be processed by the
primary Large Language Model for a conversational or knowledge-based response.
* wantsR1Response: A boolean ﬂag. When true, it signals that the backend should generate and return a
response suitable for the R1 device, which may include both text and synthesized speech.
* wantsJournalEntry: A boolean ﬂag. When true, it requests that the interaction (both the query and the
response) be saved to the user's journal in the Rabbithole web portal.
Example: Simple LLM Query
This example sends a question to the LLM and requests a standard response to be displayed and
spoken by the device.
PluginMessageHandler.postMessage({
  message: 'What is the distance between the Earth and the Moon in kilometers?',
  useLLM: true,
  wantsR1Response: true,
  wantsJournalEntry: true
});
Example: Requesting a Structured JSON Response
To receive structured data, such as JSON, the developer must employ prompt engineering. The
message string itself must explicitly instruct the LLM to format its response in the desired structure.
The backend does not have a separate mode for JSON; it relies on the LLM's ability to follow formatting
instructions within the prompt.
PluginMessageHandler.postMessage({
  message: "Give me the current weather for San Francisco, CA. Your response must be a single, valid
JSON object containing only three keys: 'temperature' (in Celsius), 'conditions' (as a string), and
'humidity' (as a percentage string).",
  useLLM: true,
  wantsR1Response: true,
  wantsJournalEntry: false // Might not want to log every API-like call
});
This technique is essential for building data-driven Creations that can parse and display information
from the LLM in a structured UI, rather than just displaying a block of text. The reliability of this method
depends entirely on the LLM's capability to consistently adhere to the formatting instructions in the
prompt.
Receiving Server Messages (window.onPluginMessage)
Handling Asynchronous Responses
All communication with the backend is asynchronous. After a Creation sends a request using
PluginMessageHandler.postMessage(), it must listen for the response by deﬁning the
window.onPluginMessage event handler function. This function is invoked by the host OS whenever a
message from the server is ready to be delivered to the Creation. The function receives a single event
object, and the relevant data is contained within its data property.
The structure of the event.data object can vary depending on the type of message received from the
server. A robust implementation of onPluginMessage must inspect the contents of this object to
determine how to handle the response appropriately.
Example: Basic onPluginMessage Handler

window.onPluginMessage = function(event) {
  console.log('Received message from server:', event.data);
  // Check for a simple text message
  if (event.data && event.data.message) {
    // Display the message in the UI
    document.getElementById('response-text').innerText = event.data.message;
  }
  // Check for a complex data object
  if (event.data && event.data.data) {
    handleComplexData(event.data.data);
  }
};
function handleComplexData(data) {
  // Further processing for structured data
  if (data.kernel && data.kernel.assistantResponse) {
    const responseText = data.kernel.assistantResponse;
    // Attempt to parse as JSON for structured requests
    try {
      const jsonData = JSON.parse(responseText);
      updateUIWithJson(jsonData);
    } catch (e) {
      // If not JSON, treat as plain text
      updateUIWithText(responseText);
    }
  }
}
Differentiating Response Types: data.data vs. data.message
The event.data object appears to use two primary properties to deliver information: data.message and
data.data.
* data.message: This property seems to be used for simpler, string-based communication. This could
include status updates (e.g., "Processing your request..."), acknowledgments, or simple text-only
responses from the backend.
* data.data: This property is used for more complex, structured data. Reverse-engineering of the
platform's communication protocol has shown that full responses from the LLM are encapsulated
within this object. The structure is often nested, such as {"kernel": {"assistantResponse": "..."}} for text-
based answers. For responses that include synthesized speech, the object is even more complex,
containing a text ﬁeld with word-level timing information and a BASE64_WAV ﬁeld with the audio data,
nested under an assistantResponseDevice key.
A Creation's onPluginMessage handler must be prepared to parse these different structures. When a
structured JSON response is requested, the application logic should attempt to JSON.parse() the
content of the assistantResponse string. If the parsing fails, it should fall back to treating the content as
plain text. If the response contains an assistantResponseDevice object with audio data, the application
would need to handle the Base64-encoded WAV ﬁle, potentially by decoding it and playing it using the
Web Audio API.
Error Communication
A critical area of uncertainty is how the backend communicates errors back to a Creation. There is no
available documentation on the format of error messages. Errors could be communicated through a
speciﬁc status code, a boolean error ﬂag in the response object, or simply as a natural language string

in the message property (e.g., "I'm sorry, I couldn't process that request."). The lack of a deﬁned error
handling protocol presents a signiﬁcant risk for developers aiming to build robust and reliable
applications. Extensive empirical testing, including sending malformed requests and triggering various
failure conditions, will be necessary to reverse-engineer the platform's error reporting format.
Conﬁguration (creation.json)
Every Creation requires a manifest ﬁle named creation.json. This ﬁle serves a purpose analogous to
AndroidManifest.xml in Android development or package.json in a Node.js project. It provides the
rabbitOS system with essential metadata about the web application, including its name, version, entry
point, and, most importantly, the speciﬁc device permissions it requires to function correctly. When a
user installs a Creation, typically by scanning a QR code, the system fetches this manifest to
understand how to integrate and sandbox the application.
The creation.json ﬁle is expected to be a simple JSON object with several key-value pairs. While the
exact full speciﬁcation is not documented, a standard structure would include:
* name: The display name of the Creation.
* version: The version number of the Creation (e.g., "1.0.0").
* entryPoint: The full URL to the index.html ﬁle of the web application.
* permissions: An array of strings, where each string is a unique key representing a speciﬁc device
capability that the Creation needs to access.
Permissions Array
The permissions array is the most critical part of the manifest, as it governs the Creation's access to the
device's hardware and sensitive APIs. The operating system uses this list to grant or deny access to the
corresponding native functions bridged by the SDK. For example, if a Creation does not include "vibrate"
in its permissions array, any call to window.rabbit.core.vibrate() will likely fail silently or throw an error.
Crucially, no deﬁnitive list of available permission strings was found in any of the analyzed
documentation or community resources. This represents the single most signiﬁcant information gap in
the Creations SDK. Without this list, developers are unable to build applications that utilize key device
features. Based on the known API surface and the capabilities of similar embedded systems, the
following are logical and highly probable candidates for permission strings:
* microphone: To access the device's microphone for audio recording.
* camera: To access the camera for photos or video (though this may be a system-reserved function).
* vibrate: To use the haptic feedback motor via window.rabbit.core.vibrate().
* tts: To use the text-to-speech engine via window.rabbit.core.say().
* plainStorage: To access window.creationStorage.plain.
* secureStorage: To access the encrypted window.creationStorage.secure.
* audioControl: To use the window.rabbit.audio API to set and get volume.
Determining the exact, case-sensitive strings for this permissions array is a top-priority task for any
team beginning development on the R1 platform. The most reliable method to obtain this information
would be to decompile the main rabbitOS launcher .apk ﬁle and analyze the source code responsible for
parsing the creation.json manifest.
UI and Design Best Practices
Display and Interaction Model
Developing a successful user interface for a Rabbit R1 Creation requires a fundamental shift away from
conventional smartphone app design. The device's hardware and interaction model impose a unique set
of constraints that must be respected.
The R1 features a small, 2.88-inch portrait-oriented touchscreen. While touch-enabled, its primary role is
for text input via a virtual keyboard and for scrolling through speciﬁc UI elements like Gen UI cards. The
main method of navigation is the physical scroll wheel. This "scroll-wheel-ﬁrst" paradigm is the single
most important constraint for UI design. Interfaces must be structured linearly, allowing users to
navigate through all interactive elements sequentially using only "up" and "down" actions. Complex
layouts such as grids, multi-column views, or free-form canvases are fundamentally incompatible with
the primary interaction model and will result in a poor user experience.
The overall design philosophy of rabbitOS promotes "content-focused interfaces". This means that a

Creation should immediately present relevant information or its core functionality, rather than displaying
menus, splash screens, or complex navigation hierarchies. The experience should be optimized for
glanceability and one-handed use. For instance, a calculator Creation should display the calculator
interface on launch, not a menu with "Standard Calculator" and "Scientiﬁc Calculator" options. The goal
is to minimize user interaction and "get things done faster".
Impact of Generative UI (Gen UI)
Generative UI is an experimental rabbitOS feature that allows users to customize the system's interface
using natural language prompts. A user can, for example, request a "Windows 95 theme" or a "hyper-
minimal UI using just black and white and super thin lines". This feature is executed by the system and
is not directly controllable by a Creation. However, it has signiﬁcant implications for UI design.
A Creation's UI may be rendered within a system shell that has been dramatically altered by a user's Gen
UI prompt. A user-deﬁned theme could enforce a very small font size, low-contrast colors, or speciﬁc
font families. To ensure an application remains usable under these unpredictable conditions,
developers should avoid hardcoding visual styles. Best practices include:
* Using relative CSS units (e.g., em, rem) for font sizes and spacing, allowing them to scale with any
system-level base font size changes.
* Ensuring suﬃcient color contrast in assets and designs to remain legible even if the background color
is changed by the system.
* Building ﬂexible and simple layouts that do not break if font sizes or element spacing change
unexpectedly.
System CSS Variables and Safe Area
Modern web development on devices with non-rectangular displays or system-level UI elements (like
status bars) relies on CSS environment variables to deﬁne a "safe area" for content. These variables
allow a web page to extend to the full screen while ensuring that content is not obscured by system
components.
Given that rabbitOS is based on AOSP, it is highly probable that its WebView provides such variables to
Creations. While no speciﬁc variable names are documented, they would likely follow the standard CSS
Environment Variables speciﬁcation. The most important of these would be:
* --rabbit-safe-area-inset-top (or a similar name)
* --rabbit-safe-area-inset-right
* --rabbit-safe-area-inset-bottom
* --rabbit-safe-area-inset-left
Developers should design their UIs to respect these insets, particularly at the top of the screen where a
system status bar might be present.
Example CSS Usage (Inferred):
body {
  /* Use the Rabbit-speciﬁc variable, with a fallback to the standard */
  padding-top: var(--rabbit-safe-area-inset-top, env(safe-area-inset-top));
  padding-left: var(--rabbit-safe-area-inset-left, env(safe-area-inset-left));
  padding-right: var(--rabbit-safe-area-inset-right, env(safe-area-inset-right));
  padding-bottom: var(--rabbit-safe-area-inset-bottom, env(safe-area-inset-bottom));
}
As with other undocumented features, the exact names of these CSS variables must be conﬁrmed by
inspecting the computed styles of elements on a physical R1 device.
Conclusion and Strategic Recommendations
Summary of Findings
The Rabbit R1 Creations platform offers a unique opportunity for web developers to build applications
for a new category of AI-centric hardware. The analysis of the available information reveals a platform
architecture that is both accessible and constrained. The use of AOSP and a WebView-based
application model lowers the technical barrier to entry, but the system's reliance on a cloud-based Large
Action Model introduces network latency as a primary performance consideration. The device's

minimalist hardware, particularly its scroll-wheel-ﬁrst navigation, imposes strict requirements for
simple, linear user interface design.
However, the Creations SDK is critically under-documented. Core components of the API, including the
full surface of the window.rabbit.core object, the precise behavior of window.creationStorage.secure,
and the format of server-side error messages, are not publicly deﬁned. The most signiﬁcant and
impactful knowledge gap is the complete absence of a list of valid permission strings for the
creation.json manifest, which is a fundamental prerequisite for accessing most of the device's unique
capabilities. Furthermore, past security lapses regarding the handling of API keys warrant a cautious
and defensive approach when developing applications that handle any form of user data.
Actionable Recommendations
For a software development team tasked with building Creations for the Rabbit R1, the following
strategic actions are recommended before committing to signiﬁcant development efforts:
* Prioritize On-Device Inspection and API Discovery: The immediate ﬁrst step must be to acquire a
physical R1 device. Using remote web inspection tools (e.g., via a USB connection and Android Debug
Bridge), the team must load a test web page to perform a full runtime inspection of the global window
object. This will provide a deﬁnitive, real-world map of the entire undocumented JavaScript API surface,
including all methods and properties available under window.rabbit.core, window.rabbit.audio, and
window.creationStorage. This empirical data is essential to de-risk the project and form a reliable
foundation for development.
* Reverse-Engineer the creation.json Permissions: The team must obtain the rabbitOS launcher .apk ﬁle,
either from a device or from community repositories. Using standard Android application decompilation
tools (e.g., jadx), the engineering team must analyze the Java/Kotlin source code that is responsible for
parsing the creation.json ﬁle. This is the most direct and reliable method to identify the complete and
exact list of valid strings that can be used in the permissions array. Without this information, the
development of any non-trivial Creation is blocked.
* Adopt a Defensive Security Posture: Given the platform's security history, all development should
proceed with a "zero-trust" approach to the SDK's security features. The window.creationStorage.secure
API should not be used for storing any data that would cause signiﬁcant user harm if leaked. It should
be treated as an obfuscation mechanism rather than a guaranteed-secure cryptographic store, pending
transparent documentation and a formal third-party security audit from Rabbit.
* Design for Latency and Linearity: All UI/UX design and engineering efforts must be guided by two core
principles: linearity and latency. Every UI must be fully navigable using only the scroll wheel. Every
interaction that involves the backend LLM or LAM must be implemented as an asynchronous operation,
with the UI providing immediate and persistent feedback (e.g., loading indicators, status messages) to
the user while awaiting a response from the server. Prototyping and user testing on the physical device
will be critical to reﬁning the user experience under these constraints.
Leticia Loreto
