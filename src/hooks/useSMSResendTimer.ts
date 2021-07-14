import { useEffect, useState } from 'react';
import { TIME_DELAY } from '../components/Form/constants';

const useSMSResendTimer = (): number => {
  const currentDate: Date = new Date();

  const [SMSResendTimer, setSMSResendTimer] = useState<number>(0);

  useEffect(() => {
    setSMSResendTimer(
      Math.round(
        //@ts-ignore
        (JSON.parse(localStorage.getItem('finishDate')) - currentDate) / 1000
      )
    );

    if (SMSResendTimer > 0 && SMSResendTimer < TIME_DELAY) {
      setTimeout(() => {
        setSMSResendTimer(SMSResendTimer - 1);
      }, 1000);
    }
  });

  return SMSResendTimer;
};

export default useSMSResendTimer;
