document.addEventListener("DOMContentLoaded", () => {
  console.log("Quantora AI Loaded");

  const btn = document.getElementById("analyzeBtn");
  const result = document.getElementById("result");

  if (btn && result) {
    btn.addEventListener("click", () => {
      result.innerHTML = `
        <h3>Analysis Result</h3>
        <p><strong>Trend:</strong> Bullish</p>
        <p><strong>Confidence:</strong> 82%</p>
        <p><strong>AI Signal:</strong> Buy</p>
      `;
    });
  }
});
