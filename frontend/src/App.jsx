import React from 'react';
import Header from './components/Header';
import ProgressDots from './components/ProgressDots';
import Form from './components/Form';
import WalletContextProvider from './components/WalletContextProvider';


function App() {
  return (
    <div className="container">
      <WalletContextProvider>
        <Header />
        <main>
          <ProgressDots />
          <Form />
        </main>
      </WalletContextProvider>
    </div>
  );
}

export default App;
