import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/styles/index.scss'
import {Provider} from "react-redux";
import {persist, store} from "./store/redux";
import {PersistGate} from "redux-persist/integration/react";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <PersistGate persistor={persist}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
);
