import { useReactMediaRecorder } from "react-media-recorder";
import React, { useState } from "react";
import axios from "axios";

var Front_url;

Front_url = "https://jinuu.pythonanywhere.com/react_to_flask";

const RecordView = () => {
	
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    clearBlobUrl
  } = useReactMediaRecorder({ audio: true, type: "audio/wav" });

  const [url, setUrl] = useState(mediaBlobUrl);
  const [emotion, setEmotion] = useState("");
	
  const resetRecording = () => {
    console.log("clicked");
    // setUrl(clearBlobUrl);
    clearBlobUrl();
  };
	
  const sendtoFlask = async () => {
    const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
    const audioFile = new File([audioBlob], 'voice.wav', { type: 'audio/wav' });
    const formData = new FormData(); // preparing to send to the server

    formData.append('file', audioFile);  // preparing to send to the server
	 
	const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
	  
    axios.post(Front_url, formData, config)
	  .then((response) => {
		   setEmotion(response['data']['emotion'])
		   console.log(response['data']['emotion'])}
		   );
	console.log("sent to flask")
  }
	
  return (
    <div>
      <p>{status}</p>
      <button onClick={() => {setEmotion(""); startRecording();}}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
		  <h2></h2>
      <audio src={mediaBlobUrl} controls />
		  <h2></h2>
      <button onClick={()=> {setEmotion("");clearBlobUrl();}}>Reset Recording</button>
	  <h2></h2>
	  <button onClick={sendtoFlask}>Send to Flask</button>
      <h2></h2>
	  emotion : {emotion}
    </div>
  );
};

export default RecordView;
