import React, { useEffect } from 'react';
import { useAppState } from '@/providers/state-provider';
import { useAppToast } from '@/providers/toast-provider';
import { axiosPostRequest } from '@/utils/axios';
import ThemeListTable from './Table';

const ThemeList = () => {
  const [appState, setAppState] = useAppState();
  const appToast = useAppToast();

  useEffect(() => {
    const loadThemes = async () => {
      try {
        const res = await axiosPostRequest('/api/validate', {
          shopName: window.location.hostname,
          accessToken: window.localStorage.getItem('access_token')
        });
        console.log(res);
        // setAppState({
        //   ...appState,
        //   themes: themes.data
        // });
        appToast('Theme Flight App has been launched!', 'success');
      } catch (error) {
        appToast(error.message, 'error');
      }
    };
    loadThemes();
  }, []);

  return (
    <div>
      <ThemeListTable />
    </div>
  );
};

export default ThemeList;
