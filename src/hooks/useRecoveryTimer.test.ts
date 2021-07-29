import { renderHook, act } from '@testing-library/react-hooks';
import useRecoveryTimer from './useRecoveryTimer';

describe('Hook: useRecoveryTimer', () => {
  const isSMSBlock = true;
  let dateNowSpy: jest.SpyInstance<number, []>;
  let localStorageSpy: jest.SpyInstance<string | null, [key: string]>;
  const localStorageDateTest = '1487076727000';
  const currentDateTest = 1487076708000;

  describe('when initial recovery time > 0', () => {
    beforeEach(() => {
      dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => currentDateTest);
      localStorageSpy = jest
        .spyOn(localStorage, 'getItem')
        .mockImplementation(() => localStorageDateTest);
    });

    afterEach(() => {
      dateNowSpy.mockRestore();
      localStorageSpy.mockRestore();
    });

    it('should call localStorage.getItem', () => {
      jest.useFakeTimers();
      renderHook(() => useRecoveryTimer(isSMSBlock));
      expect(localStorageSpy).toHaveBeenCalledTimes(1);
    });

    it('should return changed recoveryTime', () => {
      jest.useFakeTimers();
      const { result } = renderHook(() => useRecoveryTimer(isSMSBlock));
      const testInterval = 3000;
      const expectedRecoveryTime = [19, 16];

      act(() => {
        expect(result.current).toBe(expectedRecoveryTime[0]);

        jest.advanceTimersByTime(testInterval);
        expect(result.current).toBe(expectedRecoveryTime[1]);
      });
    });

    //   describe('when hook unmount', () => {
    //     let clearIntervalSpy = jest.fn(() => {
    //       console.log(123);
    //     });

    //     beforeEach(() => {
    //       clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    //     });

    //     afterEach(() => {
    //       clearIntervalSpy.mockRestore();
    //     });

    //     it('should call clearInterval', () => {
    //       global.clearInterval = jest.fn(() => {
    //         console.log(123);
    //       });

    //       const result = renderHook(() => useRecoveryTimer(isSMSBlock));

    //       expect(global.clearInterval).toHaveBeenCalledTimes(0);
    //     });
    //   });
    // });
  });

  describe('when intiial recovery time <= 0', () => {
    it('should return recoveryTime=0', () => {
      const { result } = renderHook(() => useRecoveryTimer(isSMSBlock));

      act(() => {
        expect(result.current).toBe(0);
      });
    });
  });
});
