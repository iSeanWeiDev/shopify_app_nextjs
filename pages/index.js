import { useEffect } from 'react';
import AppMainLayout from '@/layouts/main-layout';
import ThemeList from './List';
import ThemeCreate from './Create';
import ThemeDelete from './Delete';
import ThemeSchedule from './Schedule';
import { useAppState } from '@/providers/state-provider';

const Index = (props) => {
  const [appState, setAppState] = useAppState();

  useEffect(() => {
    setAppState({
      ...appState,
      app: {
        shopName: props.shop,
        accessToken: props.accessToken
      }
    });
  }, [props.shop, props.accessToken]);

  return (
    <AppMainLayout>
      <ThemeList />
      <ThemeCreate />
      <ThemeDelete />
      <ThemeSchedule />
    </AppMainLayout>
  );
};

export default Index;
