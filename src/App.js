// routes
import Router from './routes';
import { useState } from 'react';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { AuthProvider } from './context/AuthContext';
import { getFirebaseToken, onMessageListener } from './firebase'

// ----------------------------------------------------------------------

export default function App() {
  
  return (
    <AuthProvider>
      <ThemeConfig>
        <ScrollToTop />
        <GlobalStyles />
        <BaseOptionChartStyle />
        <Router />
      </ThemeConfig>
    </AuthProvider>
  );
}
