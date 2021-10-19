import React, { useEffect } from 'react';
import { useAppState } from '@/providers/state-provider';
import { useAppToast } from '@/providers/toast-provider';
import AxiosRequest from '@/utils/axios';
import ThemeListTable from './Table';

const ThemeList = () => {
  const [appState, setAppState] = useAppState();
  const appToast = useAppToast();

  useEffect(() => {
    if (appState.app.shopName && appState.app.accessToken) {
      const loadThemes = async () => {
        try {
          const { shopName, accessToken } = appState.app;
          const axiosRequest = new AxiosRequest(shopName, accessToken);

          await axiosRequest.post('/api/validate');

          const themes = await axiosRequest.get('/api/themes');
          const schedules = await axiosRequest.get('/api/schedules');
          setAppState({
            ...appState,
            themes: themes,
            schedules: schedules
          });
          appToast('Theme Flight App has been launched!', 'success');
        } catch (error) {
          appToast(error.message, 'error');
        }
      };
      loadThemes();
    }
  }, [appState.app.shopName, appState.app.accessToken]);

  return (
    <div>
      <ThemeListTable />
    </div>
  );
};

export default ThemeList;
