import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import App from './App';
import './index.css';
import { BlockchainContextProvider } from './context/BlockchainContext';
import './i18nextConf';
import { ThemeContextProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // FIXME: depracated propety
  <ThirdwebProvider desiredChainId={ChainId.Goerli}>
    <BrowserRouter>
      <BlockchainContextProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </BlockchainContextProvider>
    </BrowserRouter>
  </ThirdwebProvider>
);
