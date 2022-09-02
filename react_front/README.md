# 한국어 데이터 학습, 웹 서비스 준비

생성 일시: 2022년 9월 3일 오전 12:49
조 이름: Mad Scientist
주차: 8주차
팀: Creative Lab
활동 날짜: 2022년 9월 4일

# 프론트 엔드 (리액트)

### 환경구축 / 실행방법

<aside>
💡 프론트 엔드 개발에는 구름 ide를 사용했고, react를 기반으로 페이지를 만들었다. 구름 ide의 장점은 서버를 무료로 호스팅해주는 서비스를 제공한다는 점이다.

</aside>

1. 먼저 구름 ide에 회원가입을 하고, 새 컨테이너를 만들고 실행한다. 이때 ‘항상 켜두기’ 옵션으로 실행한다. ([[구름IDE/REACT] 구름IDE 환경으로 리액트 시작하기#1 (tistory.com)](https://ddangz.tistory.com/6)를 참고!)

1. “npm install -g create-react-app” 명령어를 통해 create-react-app 모듈을 설치한다.

1. “npm install -g n”, “n stable” 명령어를 통해 node.js를 업데이트 한다. ([How to Update Node and NPM to the Latest Version (freecodecamp.org)](https://www.freecodecamp.org/news/how-to-update-node-and-npm-to-the-latest-version/)를 참고)

1. “create-react-app react_front” 를 입력해 ./react_front 폴더에 react 앱을 생성한다.

1. react_front/src에서 App.js를 아래와 같이 고친다.

```jsx
import React, { Component } from 'react';
import mad from './Mad.svg';
import './App.css';
import RecordView from './RecordView.js'

class App extends Component {
  render() {
    return (
		<div>
			<h1>Mad Scientist</h1> <img src={mad} className="App-logo" alt="logo" />
			<h2>Speech Emotion Recognition</h2>
			<RecordView></RecordView>
		</div>
    );
  }
}

export default App;
```

1. react_front/src에 RecordView.js를 생성해, 아래와 같이 작성한다.

```jsx
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
```

1. 아래 사진을 다운로드받아 .svg 형식으로 변환한 이후, react_front/Mad.svg로 업로드 한다. (구글에 png to svg 검색)
    
    ![Untitled](%E1%84%92%E1%85%A1%E1%86%AB%E1%84%80%E1%85%AE%E1%86%A8%E1%84%8B%E1%85%A5%20%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5%20%E1%84%92%E1%85%A1%E1%86%A8%E1%84%89%E1%85%B3%E1%86%B8,%20%E1%84%8B%E1%85%B0%E1%86%B8%20%E1%84%89%E1%85%A5%E1%84%87%E1%85%B5%E1%84%89%E1%85%B3%20%E1%84%8C%E1%85%AE%E1%86%AB%E1%84%87%E1%85%B5%2075bf5720f81d4ab0b22398dc7c379189/Untitled.png)
    

1. “npm install react-media-recorder”를 통해 음성녹음 패키지를 설치한다.

1. “cd react_front”, “npm run start”를 통해 서버를 실행한다.

1. 구름 ide의 실행화면에서 “프로젝트” > “실행 URL과 포트”의 url을 통해 외부에서도 웹 페이지에 접속할 수 있다.

** github 저장소에서 clone 하게 되면 코드들을 직접 고칠 필요 없이 개발 환경 세팅에 관련된 명령어들만 입력해주면 된다. 저장소 위치: [ji-nuuu/speech_emotion_recognition: deep daiv 1st mad scientist (github.com)](https://github.com/ji-nuuu/speech_emotion_recognition)

### 프론트 작동방식

- 음성녹음을 프론트 서버에 저장하는 것 까지를 구현했다. 이후 계획은 백엔드 서버와 연결해 감정분석 결과를 페이지에 보여주는 것이다. 계획은 다음과 같다.
- “send to flask” 버튼을 누르면 flask로 구현한 백엔드 서버에 음성파일을 .wav 형식으로 전송한다. 백엔드 서버에서는 저장된 모델을 통해 감정분석을 하고, 그 결과를 프론트 서버로 다시 전송한다. 프론트 서버는 감정 데이터를 받아서 웹 페이지에 보여준다.
- 백 엔드와 프론트 엔드는 http의 ‘post’ 메서드를 통해 통신하도록 할 계획이다. ([GET방식 과 POST방식 :: 개발자로 홀로 서기 (tistory.com)](https://mommoo.tistory.com/60), [React(42) 리액트 훅 - POST 방식으로 요청 보내기 (tistory.com)](https://devbirdfeet.tistory.com/131))

![Untitled](%E1%84%92%E1%85%A1%E1%86%AB%E1%84%80%E1%85%AE%E1%86%A8%E1%84%8B%E1%85%A5%20%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5%20%E1%84%92%E1%85%A1%E1%86%A8%E1%84%89%E1%85%B3%E1%86%B8,%20%E1%84%8B%E1%85%B0%E1%86%B8%20%E1%84%89%E1%85%A5%E1%84%87%E1%85%B5%E1%84%89%E1%85%B3%20%E1%84%8C%E1%85%AE%E1%86%AB%E1%84%87%E1%85%B5%2075bf5720f81d4ab0b22398dc7c379189/Untitled%201.png)

(09.03 기준) 

### 참고

1. 구름 ide에서 리액트 실행하는 방법: 
    
    [[구름IDE/REACT] 구름IDE 환경으로 리액트 시작하기#1 (tistory.com)](https://ddangz.tistory.com/6)
    
     [구름IDE 리액트 항상켜두기 / 리액트 백그라운드 실행 가이드(2) (tistory.com)](https://hellcoding.tistory.com/entry/%EA%B5%AC%EB%A6%84ide-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%95%AD%EC%83%81%EC%BC%9C%EB%91%90%EA%B8%B02)
    
    [How to Update Node and NPM to the Latest Version (freecodecamp.org)](https://www.freecodecamp.org/news/how-to-update-node-and-npm-to-the-latest-version/)
    
2. 리액트의 기본에 관한 재생목록: 
    
    [React 2022 개정판 - YouTube](https://www.youtube.com/playlist?list=PLuHgQVnccGMCOGstdDZvH41x0Vtvwyxu7)
    
3. 리액트 음성녹음 코드
    
     [busy-danilo-y74b09 - CodeSandbox](https://codesandbox.io/s/busy-danilo-y74b09)