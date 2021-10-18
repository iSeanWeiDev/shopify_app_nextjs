import { useState, useEffect } from 'react';
import { useAppState } from '@/providers/state-provider';
import { useAppToast } from '@/providers/toast-provider';
import { Dialog, DialogActions, DialogTitle, Typography, Button } from '@material-ui/core';
import AxiosRequest from '@/utils/axios';
import useStyles from './styles';
import AxiosRequest from '@/utils/axios';

const ThemeDelete = () => {
  const classes = useStyles();
  const appToast = useAppToast();
  const [open, setOpen] = useState(false);
  const [appState, setAppState] = useAppState();

  useEffect(() => {
    setOpen(appState.delete);
  }, [appState.delete]);

  const handleDialogClose = () => {
    setAppState({
      ...appState,
      selected: null,
      delete: false
    });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      appToast('You cancelled the removing the theme!', 'info');
      setAppState({
        ...appState,
        selected: null,
        delete: false
      });
    }
  };

  const handleContinue = async () => {
    try {
      const { shopName, accessToken } = appState.app;
      const axiosRequest = new AxiosRequest(shopName, accessToken);

      const deleteResponse = await axiosRequest.delete(`/api/themes/${appState.selected}`);
      console.log(deleteResponse);
      let tmp = appState.themes;
      tmp = tmp.filter((el) => el.id !== appState.selected);
      setAppState({
        ...appState,
        themes: tmp,
        selected: null,
        delete: false
      });
    } catch (error) {
      appToast(error.message, 'error');
    }
  };

  return (
    <Dialog
      open={open}
      className={classes.root}
      onClose={handleDialogClose}
      onKeyDown={handleKeyDown}
    >
      <DialogTitle>
        <Typography variant="h6" component="h2">
          Are you sure you want to delete this theme?
        </Typography>
      </DialogTitle>
      <DialogActions>
        <Button color="secondary" onClick={handleDialogClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleContinue}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ThemeDelete;
