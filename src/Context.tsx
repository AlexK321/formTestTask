import { createContext, Dispatch, SetStateAction } from 'react';

const Context = createContext<Dispatch<SetStateAction<string | null>>>(() => null);

export default Context;
