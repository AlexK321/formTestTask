const formFields = ['userName', 'phoneNumber', 'email'];
const initialValues = {
  userName: 'qwe',
  phoneNumber: 'qweqwe',
  email: 'qweqweqwe',
};
const asd = null;

/* eslint-disable no-undef */
describe('test', () => {
  // на наличие ключа
  it('check for a key', () => {
    expect(formFields).toContain('userName');
  });

  // на точную длину
  it('check array length', () => {
    expect(formFields).toHaveLength(3);
  });

  // на существование обьекта
  it('check the existence of an object', () => {
    expect(initialValues).toBeTruthy();
  });

  // на мин длину
  it('check object min length', () => {
    expect(Object.keys(initialValues).length).toBeGreaterThanOrEqual(3);
  });

  // на макс длину
  it('check object min length', () => {
    expect(Object.keys(initialValues).length).not.toBeGreaterThanOrEqual(10);
  });

  // на отсутствие ключа
  it('check for missing key', () => {
    expect(formFields).not.toContain('address');
  });

  // на отстутсвие значения
  it('check for missing value', () => {
    expect(asd).toBeFalsy();
  });

  // пара ключ-значение
  it('check for key-value pair', () => {
    expect(initialValues.userName).toBe('qwe');
  });
});
