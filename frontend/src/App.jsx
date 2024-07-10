import React from 'react';
import Header from './components/Header';
import ProgressDots from './components/ProgressDots';
import UploadCover from './components/UploadCover';
import Form from './components/Form';

function App() {
  return (
    <div className="container">
      <Header />
      <main>
        <ProgressDots />
        <Form />
      </main>
    </div>
  );
}

export default App;
