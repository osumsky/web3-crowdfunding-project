import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import App from './App';
import './index.css';
import { StateContextProvider } from './context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // FIXME: depracated propety
  <ThirdwebProvider desiredChainId={ChainId.Goerli}>
    <BrowserRouter>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </BrowserRouter>
  </ThirdwebProvider>
);
