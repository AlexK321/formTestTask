import { TIME_DELAY } from './constants';

const saveTimeDelay = (): void => {
  const date: Date = new Date();
  const finishDate = date.setSeconds(date.getSeconds() + TIME_DELAY);

  localStorage.setItem('finishDate', JSON.stringify(finishDate));
};

export default saveTimeDelay;
