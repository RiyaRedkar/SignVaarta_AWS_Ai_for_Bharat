let mediaRecorder;
let audioChunks = [];

const UPLOAD_API = "https://9v2g41ikl8.execute-api.ap-south-1.amazonaws.com/dev/upload-url";
const START_API  = "https://9v2g41ikl8.execute-api.ap-south-1.amazonaws.com/dev/start";

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const statusContainer = document.getElementById("statusContainer");
const statusText = document.getElementById("status");
const resultsSection = document.getElementById("resultsSection");
const clearBtn = document.getElementById("clearBtn");

// Initially disable stop button
stopBtn.disabled = true;

startBtn.onclick = async () => {
    try {
        audioChunks = [];

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.start();

        // Update UI for recording state
        startBtn.classList.add("recording");
        startBtn.disabled = true;
        stopBtn.disabled = false;
        statusContainer.classList.add("recording");
        statusText.innerText = "Recording... Speak now";

        mediaRecorder.ondataavailable = e => {
            audioChunks.push(e.data);
        };

    } catch (error) {
        console.error("Microphone access error:", error);
        statusText.innerText = "❌ Microphone access denied";
        alert("Please allow microphone access to use this feature.");
    }
};

stopBtn.onclick = async () => {
    mediaRecorder.stop();

    // Update UI for processing state
    startBtn.classList.remove("recording");
    statusContainer.classList.remove("recording");
    statusText.innerText = "Processing audio...";

    mediaRecorder.onstop = async () => {
        const blob = new Blob(audioChunks, { type: "audio/wav" });

        try {
            // Get upload URL
            const uploadRes = await fetch(UPLOAD_API, {
                method: "POST"
            });

            if (!uploadRes.ok) {
                throw new Error("Failed to get upload URL");
            }

            const uploadData = await uploadRes.json();
            const uploadUrl = uploadData.upload_url;
            const s3Uri = uploadData.s3_uri;

            // Upload audio to S3
            await fetch(uploadUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "audio/wav"
                },
                body: blob
            });

            statusText.innerText = "Transcribing and translating...";

            // Start transcription and translation
            const startRes = await fetch(START_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    audio_uri: s3Uri,
                    target_lang: document.getElementById("lang").value
                })
            });

            if (!startRes.ok) {
                throw new Error("Translation service error");
            }

            const result = await startRes.json();

            console.log("API Response:", result);

            // Display results
            document.getElementById("original").innerText = result.original_text || "No text detected";
            document.getElementById("english").innerText = result.english_text || "Translation not available";
            document.getElementById("translated").innerText = result.translated_text || "Translation not available";

            // Show results section
            resultsSection.style.display = "block";

            // Update status
            statusText.innerText = "✅ Completed successfully";

        } catch (error) {
            console.error("Error:", error);
            statusText.innerText = "❌ Error: " + error.message;
            document.getElementById("original").innerText = "Error: " + error.message;
        } finally {
            // Re-enable buttons
            startBtn.disabled = false;
            stopBtn.disabled = true;
        }
    };
};

// Clear results
clearBtn.onclick = () => {
    document.getElementById("original").innerText = "---";
    document.getElementById("english").innerText = "---";
    document.getElementById("translated").innerText = "---";
    resultsSection.style.display = "none";
    statusText.innerText = "Ready to record";
};
