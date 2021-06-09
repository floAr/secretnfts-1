import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { HeaderProvider } from "./contexts/HeaderContext";
import { WalletProvider } from "./contexts/WalletContext";
import { SecretProvider } from "./contexts/SecretContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

ReactDOM.render(
  <BrowserRouter>

    <ThemeProvider>
      <WalletProvider>

        <SecretProvider>
          <HeaderProvider>
            <LanguageProvider>
              <React.Fragment>
                <App />
              </React.Fragment>
            </LanguageProvider>
          </HeaderProvider>
        </SecretProvider>

      </WalletProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

