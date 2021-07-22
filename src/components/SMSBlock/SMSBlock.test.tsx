// import React from 'react';
// import { shallow, ShallowWrapper } from 'enzyme';
// import axios from 'axios';
// import SMSBlock from './SMSBlock';
// import { FormData } from '../../Types/interfaces';
// import SubmitResult from '../SubmitResult/SubmitResult';
// //import SubmitResult from '../SubmitResult/SubmitResult';
// //import { CORRECT_SMS_CODE } from '../Form/constants';

// interface ParamTypes {
//   setSMSBlock: (arg0: boolean) => void;
//   formDataValues?: FormData;
// }

// jest.mock('axios');

// describe('Component: SMSBlock', () => {
//   const testProps: ParamTypes = {
//     setSMSBlock: jest.fn(),
//     formDataValues: {
//       userName: 'test',
//       phoneNumber: 'test',
//       email: 'test',
//     },
//   };

//   const setUp = (props?: ParamTypes) => shallow(<SMSBlock {...props} />);
//   let component: ShallowWrapper;

//   beforeEach(() => {
//     component = setUp(testProps);
//   });

//   it('match snapshot component', () => {
//     expect(component).toMatchSnapshot();
//   });

//   it('should call setSMSBlock', () => {
//     const button = component.find('Button');

//     button.simulate('click');
//     expect(testProps.setSMSBlock).toHaveBeenCalledTimes(1);
//   });

//   // describe('when call onSearch', () => {
//   //   beforeEach(() => {
//   //     const search = component.find('Search');

//   //     search.simulate('search');
//   //   });

//   //   describe('when form is finished with result ', () => {
//   //     beforeEach(() => {
//   //       const search = component.find('Search');

//   //       search.simulate('search');
//   //     });

//   //     it('should render SubmitResult', () => {
//   //       console.log(component.debug());
//   //       expect(component.find(SubmitResult)).toHaveLength(1);
//   //     });
//   //   });
//   // });

//   // test onSearch
//   describe('when request status exists', () => {
//     beforeEach(() => {
//       (axios.post as jest.Mock).mockResolvedValue({ data: { smsCode: '1111' } });
//       component = setUp(testProps);
//     });

//     describe('when form is finished with result ', () => {
//       beforeEach(() => {
//         const search = component.find('Search');

//         search.simulate('search');
//       });

//       it('should render SubmitResult', () => {
//         console.log(component.debug());
//         expect(component.find(SubmitResult)).toHaveLength(1);
//       });
//     });
//   });

//   xdescribe('when request ///', () => {
//     beforeEach(() => {
//       (axios.post as jest.Mock).mockRejectedValue('test error');
//     });
//     component = setUp(testProps);
//     const search = component.find('Search');

//     describe('when form is finished with result ', () => {
//       beforeEach(() => {
//         search.simulate('search');
//       });

//       it('should render SubmitResult', () => {
//         expect(component).toEqual({});
//       });
//     });
//   });

//   describe('when request status exists', () => {
//     beforeEach(() => {
//       (axios.post as jest.Mock).mockResolvedValue({ data: { smsCode: '1112' } });
//       component = setUp(testProps);
//     });

//     describe('when form is finished with result ', () => {
//       beforeEach(() => {
//         const search = component.find('Search');

//         search.simulate('search');
//         search.simulate('search');
//         //search.simulate('search');
//       });

//       it('should render SubmitResult', () => {
//         // const search = component.find('Search');

//         // search.simulate('search');
//         // search.simulate('search');
//         // search.simulate('search');

//         const description = component.find('.sms-warning');

//         console.log(description.debug());
//         console.log(description.children().debug());
//         //expect(1).toEqual(1);
//         expect(description.text()).toEqual('Неправильный код. Осталось попытки.');
//       });
//     });
//   });
// });
