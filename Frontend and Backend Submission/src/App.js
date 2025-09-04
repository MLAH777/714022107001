import React, { useState } from "react";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async () => {
    if (!longUrl) {
      setError("Please enter a URL.");
      return;
    }

    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const response = await fetch(
        "http://localhost:5000/shorten",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtLmwuYWFzaGlraGFyaXNod2FyMjJjeXNAc3Jpc2hha3RoaS5hYy5pbiIsImV4cCI6MTc1Njk3NzI4OSwiaWF0IjoxNzU2OTc2Mzg5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZGM3OTcxYjQtNTg2MC00OGFmLTg5YWQtNjY0ZGY1ZDg3Y2RlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWFzaGlrIGhhcmlzaHdhciBtIGwiLCJzdWIiOiI4MmUwZGE4Mi0zYWYzLTQ4YTktYTA4ZS05Y2M2YzEzYjMwYTYifSwiZW1haWwiOiJtLmwuYWFzaGlraGFyaXNod2FyMjJjeXNAc3Jpc2hha3RoaS5hYy5pbiIsIm5hbWUiOiJhYXNoaWsgaGFyaXNod2FyIG0gbCIsInJvbGxObyI6IjcxNDAyMjEwNzAwMSIsImFjY2Vzc0NvZGUiOiJCVWVadUQiLCJjbGllbnRJRCI6IjgyZTBkYTgyLTNhZjMtNDhhOS1hMDhlLTljYzZjMTNiMzBhNiIsImNsaWVudFNlY3JldCI6IlFodFFmbm1QWm5WZWtldmYifQ.vh4rbhosYEbrRqnmWDFlTuu37H9LflO6UnibYqGaThc"
          },
          body: JSON.stringify({ longUrl })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      const data = await response.json();
      setShortUrl(data.shortUrl || "No short URL returned");
    } catch (err) {
      setError("Something went wrong: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}>
      <h1>🔗 React URL Shortener</h1>

      <input
        type="text"
        placeholder="Enter your long URL here..."
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        style={{ width: "60%", padding: "10px", fontSize: "16px" }}
      />

      <br /><br />

      <button
        onClick={handleShorten}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        disabled={loading}
      >
        {loading ? "Shortening..." : "Shorten It!"}
      </button>

      <br /><br />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {shortUrl && (
        <p>
          ✅ Short URL:{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}

export default App;