import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import { HeaderProvider } from "./contexts/HeaderContext";
import { WalletProvider } from "./contexts/WalletContext";
import { SecretProvider } from "./contexts/SecretContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CollectionsProvider } from "./contexts/CollectionsContext";

ReactDOM.render(
  <Router>
    <ThemeProvider>
      <WalletProvider>
        <SecretProvider>
          <HeaderProvider>
            <LanguageProvider>
              <CollectionsProvider>
                <React.Fragment>
                  <App />
                </React.Fragment>
              </CollectionsProvider>
            </LanguageProvider>
          </HeaderProvider>
        </SecretProvider>
      </WalletProvider>
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);

