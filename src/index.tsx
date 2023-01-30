import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux'
import { minhaStore, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';



const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(  
  <React.StrictMode>
    <Provider store={minhaStore}>
      <PersistGate persistor={persistor}>        
          <App />     
      </PersistGate>
    </Provider>
  </React.StrictMode>  
);