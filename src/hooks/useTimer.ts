import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { MILLISECONDS } from '../components/Form/constants';

const useTimer = (isSMSBlock: boolean | null): number => {
  const [recoveryTime, setRecoveryTime] = useState<number>(0);
  const interval: MutableRefObject<any> = useRef();

  useEffect(() => {
    const localStorageFinishDate = JSON.parse(localStorage.getItem('finishDate') || '0');
    const initialRecoveryTime = (localStorageFinishDate - Number(Date.now())) / MILLISECONDS;

    if (initialRecoveryTime > 0) {
      setRecoveryTime(Math.round(initialRecoveryTime));
      interval.current = setInterval(() => {
        setRecoveryTime((previousRecoveryTime) => previousRecoveryTime - 1);
      }, MILLISECONDS);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [isSMSBlock]);

  return recoveryTime;
};

export default useTimer;
