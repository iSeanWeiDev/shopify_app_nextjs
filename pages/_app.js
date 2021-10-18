// import App from 'next/app';
import { useEffect } from 'react';
import { AppProvider } from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react';
import translations from '@shopify/polaris/locales/en.json';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppApolloProvider } from '@/providers/apollo-provider';
import { AppStateProvider } from '@/providers/state-provider';
import { AppToastProvider } from '@/providers/toast-provider';
import theme from './theme';
import './app.css';

const ThemeFlightApp = ({ Component, pageProps, host, shop, access_token }) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <AppProvider i18n={translations}>
      <Provider
        config={{
          apiKey: API_KEY,
          host: host,
          forceRedirect: true
        }}
      >
        <ThemeProvider theme={theme}>
          <AppToastProvider>
            <AppStateProvider>
              <AppApolloProvider
                Component={Component}
                shop={shop}
                accessToken={access_token}
                {...pageProps}
              />
            </AppStateProvider>
          </AppToastProvider>
        </ThemeProvider>
      </Provider>
    </AppProvider>
  );
};

ThemeFlightApp.getInitialProps = async ({ ctx }) => {
  return {
    host: ctx.query.host,
    access_token: ctx.query.access_token,
    shop: ctx.query.shop
  };
};

export default ThemeFlightApp;
