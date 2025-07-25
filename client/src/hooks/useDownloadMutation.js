import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const getVideo = async ({ url, onProgress }) => {
  const response = await axios({
    url: import.meta.env.DEV
      ? `http://localhost:5000/download?url=${encodeURIComponent(url)}`
      : `https://youtube-downloader-2rhk.onrender.com/download?url=${encodeURIComponent(
          url
        )}`,
    method: "GET",
    responseType: "blob",
    onDownloadProgress: (progressEvent) => {
      if (onProgress) {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percent);
      }
    },
  });

  // Create blob download
  const blob = new Blob([response.data]);
  const downloadUrl = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = "video.mp4";
  document.body.appendChild(a);
  a.click();
  a.remove();
};

const useDownloadMutation = (setProgress) => {
  return useMutation({
    mutationFn: (data) =>
      getVideo({
        url: data.url,
        onProgress: setProgress,
      }),
    onSuccess: () => console.log("Download complete"),
  });
};

export default useDownloadMutation;
