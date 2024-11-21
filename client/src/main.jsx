import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './stores/store';
import App from './App';

const RootApp = () => {
  const sourceUrls = useSelector((state) => state.sourceUrls);
  const imageData = useSelector((state) => state.imageData);
  const index = useSelector((state) => state.index);
  const notes = useSelector((state) => state.notes);

  return <App sourceUrls={sourceUrls} imageData={imageData} 
    index={index} notes={notes}/>;
};

const container = document.getElementById('root');
if (!container) throw new Error('No root element found');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <RootApp />
    </BrowserRouter>
  </Provider>
);
