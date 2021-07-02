import getInitialValues, { changeInitialValue } from './getInitialValue';

Object.fromEntries = (l: any[]) => l.reduce((a, [k, v]) => ({ ...a, [k]: v }), {});

describe('when get filled from url and change formData', () => {
  describe('when filled > 0 && filled < maxItems', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: new URL('http://localhost:3000/?filled=1'),
        writable: true,
      });
    });

    it('should change initialValue', () => {
      const initialValue = {
        userName: 'userName',
        phoneNumber: 'phoneNumber',
        email: 'email',
      };
      const expectInitialValue = {
        userName: 'userName',
      };

      expect(getInitialValues(initialValue)).toEqual(expectInitialValue);
      expect(window.location.href).toEqual('http://localhost:3000/?filled=1');
    });
  });

  describe('when filled = 0 && filled > maxItems', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: new URL('http://localhost:3000/?filled=0'),
      });
    });

    it('should not change initialValue', () => {
      const initialValue = {
        userName: 'userName',
        phoneNumber: 'phoneNumber',
        email: 'email',
      };

      expect(getInitialValues(initialValue)).toEqual(initialValue);
      expect(window.location.href).toBe('http://localhost:3000/');
    });
  });
});

describe('when change formData', () => {
  const initialValue = {
    userName: 'userName',
    phoneNumber: 'phoneNumber',
    email: 'email',
  };

  it('should change formData', () => {
    expect(changeInitialValue(initialValue, 1)).toEqual({
      userName: 'userName',
    });
    expect(changeInitialValue(initialValue, 2)).toEqual({
      phoneNumber: 'phoneNumber',
      userName: 'userName',
    });
    expect(changeInitialValue(initialValue, 3)).toEqual({
      email: 'email',
      phoneNumber: 'phoneNumber',
      userName: 'userName',
    });
  });
});
