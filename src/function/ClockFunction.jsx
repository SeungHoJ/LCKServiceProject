import { useEffect, useState } from 'react';

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); // 1초마다 시간 업데이트

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  return <div style={{textAlign : 'right',fontSize : '20px'}}>{time.toLocaleTimeString()}</div>;
}
