import { useEffect, useState } from 'react';
import { TIME_DELAY, MILLISECONDS } from '../components/Form/constants';

const useSMSResendTimer = (): number => {
  const currentDate: Date = new Date();

  const [SMSResendTimer, setSMSResendTimer] = useState<number>(0);

  useEffect(() => {
    const SMSResendTime =
      //@ts-ignore
      (JSON.parse(localStorage.getItem('finishDate')) - currentDate) / MILLISECONDS;

    setSMSResendTimer(Math.round(SMSResendTime));
    let timer: ReturnType<typeof setTimeout>;

    if (SMSResendTimer > 0 && SMSResendTimer < TIME_DELAY) {
      timer = setTimeout(() => {
        setSMSResendTimer((previousSMSResendTimer) => previousSMSResendTimer + 1);
      }, MILLISECONDS);
    }

    return () => {
      clearTimeout(timer);
    };
  });

  return SMSResendTimer;
};

export default useSMSResendTimer;
