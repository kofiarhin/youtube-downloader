import { useState } from "react";
import "./app.styles.scss";
import useDownloadMutation from "./hooks/useDownloadMutation";

const App = () => {
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const { mutate, isLoading } = useDownloadMutation(setProgress);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return;
    setProgress(0);
    mutate({ url });
  };

  return (
    <div id="app">
      <h1 className="heading center">YouTube Downloader</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="url">Url</label>
        <input
          type="text"
          placeholder="Enter url here..."
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
        <button type="submit">Download</button>
      </form>

      {isLoading && (
        <div className="progress">
          <p>Downloading: {progress}%</p>
          <progress value={progress} max="100" />
        </div>
      )}
    </div>
  );
};

export default App;
