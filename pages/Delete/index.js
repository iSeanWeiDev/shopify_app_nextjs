import { useState, useEffect } from 'react';
import { useAppState } from '@/providers/state-provider';
import { useAppToast } from '@/providers/toast-provider';
import { Dialog, DialogActions, DialogTitle, Typography, Button } from '@material-ui/core';
import useStyles from './styles';

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
      delete: false
    });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      appToast('You cancelled the removing the theme!', 'info');
      setAppState({
        ...appState,
        delete: false
      });
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
        <Button color="secondary">Cancel</Button>
        <Button color="primary">Continue</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ThemeDelete;
