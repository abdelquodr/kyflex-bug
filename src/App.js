import React from 'react';
import { CookiesProvider } from 'react-cookie'; //storing JWT
import { useInView } from 'react-intersection-observer';
import { BrowserRouter, Route } from 'react-router-dom';

import { NewHeader, Footer } from './components';
import Routes from './Routes.jsx';
import { BookingProvider } from './contexts/BookingContext';

// AOS
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Provider } from 'react-redux';
import store, { persistedStore } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import PageLoader from './components/PageLoader';
import { QueryParamProvider } from 'use-query-params';

// Initializing the Animate on Scroll functionality
AOS.init();

const App = () => {
  const { ref, inView: isHomeSearchInView } = useInView({ threshold: 0.9 });

  return (
    <CookiesProvider>
      <Provider store={store}>
        <PersistGate loading={<PageLoader loading={true} />} persistor={persistedStore}>
          <BrowserRouter>
            <QueryParamProvider ReactRouterRoute={Route}>
              <BookingProvider>
                <div className="w-100 h-100 d-flex flex-column justify-content-between">
                  <div style={{ paddingBlockStart: '66px' }}>
                    <NewHeader showSearch={!isHomeSearchInView} />
                    <Routes searchRef={ref} />
                  </div>
                  <Footer />
                </div>
              </BookingProvider>
            </QueryParamProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </CookiesProvider>
  );
};

export default App;
