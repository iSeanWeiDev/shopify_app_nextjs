import { useState, useContext, createContext } from 'react';

const AppStateContext = createContext(null);
AppStateContext.displayName = 'AppStateContext';

const initialState = {
  themes: null,
  create: false,
  delete: false,
  schedule: false
};

const AppStateProvider = ({ ...props }) => {
  const [state, setState] = useState(initialState);
  const value = [state, setState];

  return <AppStateContext.Provider value={value} {...props} />;
};

const useAppState = () => {
  return useContext(AppStateContext);
};

export { AppStateProvider, useAppState };
