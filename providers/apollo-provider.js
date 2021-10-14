import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { useAppBridge } from '@shopify/app-bridge-react';
import { userLoggedInFetch } from '@/utils/hooks';

export const AppApolloProvider = (props) => {
  const app = useAppBridge();

  const client = new ApolloClient({
    fetch: userLoggedInFetch(app),
    fetchOptions: {
      credentials: 'include'
    }
  });

  const Component = props.Component;

  return (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );
};
