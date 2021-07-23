import { renderHook, act } from '@testing-library/react-hooks';
import useTimer from './useTimer';

describe('Hook: useTimer', () => {
  const isSMSBlock = true;
  let dateNowSpy: jest.SpyInstance<number, []>;
  let localStorageSpy: jest.SpyInstance<string | null, [key: string]>;
  const localStorageDateTest = '1487076727000';
  const currentDateTest = 1487076708000;

  describe('When localStorage and Date is fake', () => {
    beforeEach(() => {
      dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => currentDateTest);
      localStorageSpy = jest
        .spyOn(localStorage, 'getItem')
        .mockImplementation(() => localStorageDateTest);
    });

    afterAll(() => {
      dateNowSpy.mockRestore();
      localStorageSpy.mockRestore();
    });

    it('should change recoveryTime', () => {
      jest.useFakeTimers();
      const { result } = renderHook(() => useTimer(isSMSBlock));

      act(() => {
        expect(result.current).toBe(19);

        jest.advanceTimersByTime(3000);
        expect(result.current).toBe(16);
      });
    });
  });

  describe('When localStorage and Date is real', () => {
    beforeEach(() => {
      dateNowSpy = jest.spyOn(Date, 'now');
    });

    afterAll(() => {
      dateNowSpy.mockRestore();
    });

    it('should change recoveryTime', () => {
      renderHook(() => useTimer(isSMSBlock));

      act(() => {
        expect(localStorage.getItem).toHaveBeenCalledTimes(1);
        expect(dateNowSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
