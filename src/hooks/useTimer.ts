import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { MILLISECONDS } from '../components/Form/constants';

const useTimer = (isSMSBlock: boolean | null): number => {
  const [recoveryTime, setRecoveryTime] = useState<number>(0);
  const timer: MutableRefObject<any> = useRef<number>();

  useEffect(() => {
    const localStorageFinishDate = JSON.parse(localStorage.getItem('finishDate') || '0');
    const initialRecoveryTime = (localStorageFinishDate - Number(new Date())) / MILLISECONDS;

    if (initialRecoveryTime > 0) {
      setRecoveryTime(Math.round(initialRecoveryTime));
      timer.current = setInterval(() => {
        setRecoveryTime((previousRecoveryTime) => previousRecoveryTime - 1);
      }, MILLISECONDS);
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [isSMSBlock]);

  return recoveryTime;
};

export default useTimer;
