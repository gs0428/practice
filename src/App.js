import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, useRef, useMemo} from 'react';

// 타이머 함수
function useInterval(callback, delay) { 
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if(delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function App() {
  
  const [count, setCount] = useState(0); 
  const [landingTitle, setLandingTitle] = useState("");
  // useMemo는 랜더링 최적화. 즉, completedTitle 재생성을 막을 수 있음
  const completedTitle = useMemo(() => {
    return "타이핑 구현 테스트";
  });
  useInterval(() => {
    // 카운트가 문장의 길이보다 길거나 같으면 멈춤
    if (count >= completedTitle.length) {
      return;
    }

    
    setLandingTitle((pre) => {
      // 문자열은 비어있으면 false가 출력됨
      // 그러므로 처음에 실행 될때는 첫 번째 인자가 나오고 그 다음부터는 나머지 요소들이 출력됨
      let result = pre ? pre + completedTitle[count] : completedTitle[0];

      // 카운트 1씩 증가
      setCount((pre) => pre + 1);

      // 전부 출력된 결과를 보여줌
      return result;
    });
    // 숫자의 단위는 ms(밀리 세컨드)
  }, 150)
  return (
    <div className="App">
      <span >
        <h1>{landingTitle}</h1>
      </span>
      
    </div>
  );
}

export default App;