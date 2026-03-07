let mediaRecorder;
let audioChunks = [];

const UPLOAD_API = "https://9v2g41ikl8.execute-api.ap-south-1.amazonaws.com/dev/upload-url";
const START_API  = "https://9v2g41ikl8.execute-api.ap-south-1.amazonaws.com/dev/start";

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const statusText = document.getElementById("status");

startBtn.onclick = async () => {

    audioChunks = [];

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.start();

    // SHOW LISTENING
    statusText.innerText = "🎤 Listening...";

    mediaRecorder.ondataavailable = e => {
        audioChunks.push(e.data);
    };

    startBtn.disabled = true;
    stopBtn.disabled = false;
};

stopBtn.onclick = async () => {

    mediaRecorder.stop();

    // SHOW PROCESSING
    statusText.innerText = "⏳ Processing...";

    mediaRecorder.onstop = async () => {

        const blob = new Blob(audioChunks, { type: "audio/wav" });

        try {

            const uploadRes = await fetch(UPLOAD_API, {
                method: "POST"
            });

            const uploadData = await uploadRes.json();

            const uploadUrl = uploadData.upload_url;
            const s3Uri = uploadData.s3_uri;

            await fetch(uploadUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "audio/wav"
                },
                body: blob
            });

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

            const result = await startRes.json();

            console.log("API Response:", result);

            document.getElementById("original").innerText = result.original_text || "No text detected";
            document.getElementById("english").innerText = result.english_text || "Translation not available";
            document.getElementById("translated").innerText = result.translated_text || "Translation not available";

            // RESULT READY
            statusText.innerText = "✅ Completed";

        } catch (error) {
            console.error("Error:", error);
            statusText.innerText = "❌ Error occurred";
            document.getElementById("original").innerText = "Error: " + error.message;
        }
    };

    startBtn.disabled = false;
    stopBtn.disabled = true;
};