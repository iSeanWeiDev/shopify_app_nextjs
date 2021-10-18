import React, { useEffect } from 'react';
import { useAppState } from '@/providers/state-provider';
import { useAppToast } from '@/providers/toast-provider';
import { axiosPostRequest, axiosGetRequest } from '@/utils/axios';
import ThemeListTable from './Table';

const ThemeList = () => {
  const [appState, setAppState] = useAppState();
  const appToast = useAppToast();

  useEffect(() => {
    if (appState.app.shopName && appState.app.accessToken) {
      const loadThemes = async () => {
        try {
          const resultOfValidate = await axiosPostRequest('/api/validate', {
            ...appState.app
          });

          if (resultOfValidate.msg === 'NOT_FOUND_API_WEBHOOK') {
            appToast(
              'Current store doesnt setup the webhooks, please feel free to contact us',
              'warning'
            );
          }

          const themes = await axiosGetRequest('/api/themes', {
            ...appState.app
          });

          console.log(themes);

          setAppState({
            ...appState,
            themes: themes
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
