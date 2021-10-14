import { useState, useEffect } from 'react';
import { useAppState } from '@/providers/state-provider';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField
} from '@material-ui/core';
import moment from 'moment/moment';
import useStyles from './styles';

const ThemeSchedule = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [appState, setAppState] = useAppState();

  useEffect(() => {
    setOpen(appState.schedule);
  }, [appState.schedule]);

  const handleDialogClose = () => {
    setAppState({
      ...appState,
      schedule: false
    });
  };

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Dialog open={open} onClose={handleDialogClose}>
      <DialogTitle>Schedule a theme go live (EDT):</DialogTitle>
      <DialogContent>
        <FormControl variant="filled" className={classes.formContainer}>
          <TextField
            className={classes.field}
            id="datetime-local"
            label="Start Date & Time"
            type="datetime-local"
            defaultValue={moment().add('1', 'hour').format('YYYY-MM-DDTHH:mm')}
            InputLabelProps={{
              shrink: true
            }}
          />
          <FormControlLabel
            className={classes.field}
            control={<Checkbox checked={checked} onChange={handleCheckChange} name="checked" />}
            label="Schedule End Date"
          />
          {checked && (
            <TextField
              className={classes.field}
              id="datetime-local"
              label="End Date & Time"
              type="datetime-local"
              defaultValue={moment().add('2', 'hours').format('YYYY-MM-DDTHH:mm')}
              InputLabelProps={{
                shrink: true
              }}
            />
          )}
          <Button
            className={classes.modalFormButton}
            variant="contained"
            color="primary"
            disableElevation
          >
            Schedule
          </Button>
        </FormControl>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default ThemeSchedule;
