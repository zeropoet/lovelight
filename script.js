const canvas = document.getElementById("sigilCanvas");
const ctx = canvas.getContext("2d");
const sealButton = document.getElementById("sealButton");
const codeOutput = document.getElementById("codeOutput");
let audioFile = null;

document.getElementById("audioInput").addEventListener("change", (e) => {
  audioFile = e.target.files[0];
  drawSigil();
});

function drawSigil() {
  const now = new Date();
  const seed = now.getTime().toString();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 3;

  const radius = 180;
  const angle = parseInt(seed.slice(-3)) / 999 * 2 * Math.PI;
  ctx.beginPath();
  ctx.arc(256, 256, radius, 0, angle);
  ctx.stroke();

  const code = "SIG-" + seed.slice(-6);
  codeOutput.textContent = "Moment Code: " + code;
}

sealButton.addEventListener("click", async () => {
  if (!audioFile) {
    alert("Please upload an audio file first.");
    return;
  }

  // Get canvas image data
  const imageData = canvas.toDataURL("image/png");
  const imageBlob = await (await fetch(imageData)).blob();

  // Save image and audio to memory
  const reader = new FileReader();
  reader.onload = async function () {
    const audioBuffer = reader.result;

    console.log("Pretend we're processing video now with ffmpeg.wasm");

    // Placeholder: in real use, use ffmpeg.wasm to process
    alert("This is where ffmpeg.wasm would create your .mp4.");

    // For now, download image and audio separately
    const imgLink = document.createElement("a");
    imgLink.href = imageData;
    imgLink.download = "sigil.png";
    imgLink.click();

    const audioLink = document.createElement("a");
    audioLink.href = URL.createObjectURL(audioFile);
    audioLink.download = "moment-audio" + (audioFile.name.endsWith(".m4a") ? ".m4a" : ".wav");
    audioLink.click();
  };
  reader.readAsArrayBuffer(audioFile);
});
