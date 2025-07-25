const express = require("express");
const fs = require("fs");
const ytdl = require("@distube/ytdl-core");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

// setup middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("/public"));

app.get("/", (req, res) => {
  res.send(`
    <form action="/download" method="get">
      <input type="text" name="url" placeholder="Enter YouTube URL" style="width:300px;">
      <button type="submit">Download</button>
    </form>
  `);
});

app.get("/download", async (req, res) => {
  const videoURL = req.query.url;

  if (!ytdl.validateURL(videoURL)) {
    return res.status(400).send("❌ Invalid YouTube URL");
  }

  const info = await ytdl.getInfo(videoURL);
  const title = info.videoDetails.title.replace(/[^\w\s]/gi, ""); // sanitize filename

  res.header("Content-Disposition", `attachment; filename="${title}.mp4"`);

  ytdl(videoURL, { quality: "highest" }).pipe(res);
});

app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
