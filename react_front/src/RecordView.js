import { useReactMediaRecorder } from "react-media-recorder";
import React, { useState } from "react";

const RecordView = () => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    clearBlobUrl
  } = useReactMediaRecorder({ audio: true });

  const [url, setUrl] = useState(mediaBlobUrl);
  const resetRecording = () => {
    console.log("clicked");
    // setUrl(clearBlobUrl);
    clearBlobUrl();
  };
	
  const sendtoFlask = () => {
	  console.log("sent to Flask")
  }

  return (
    <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
		  <h2></h2>
      <audio src={mediaBlobUrl} controls />
		  <h2></h2>
      <button onClick={clearBlobUrl}>Reset Recording</button>
	  <h2></h2>
	  <button onClick={sendtoFlask}>Send to Flask</button>
    </div>
  );
};

export default RecordView;
