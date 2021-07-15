import { TIME_DELAY } from './constants';

const setTimeDelay = (): void => {
  const date: Date = new Date();
  const finishDate = date.setSeconds(date.getSeconds() + TIME_DELAY);

  localStorage.setItem('finishDate', JSON.stringify(finishDate));
};

export default setTimeDelay;
