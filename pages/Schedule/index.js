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
import AxiosRequest from '@/utils/axios';
import { distanceDate } from '@/utils/date-helper';
import { useAppToast } from '@/providers/toast-provider';
import useStyles from './styles';

const ThemeSchedule = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const appToast = useAppToast();
  const [checked, setChecked] = useState(false);
  const [appState, setAppState] = useAppState();
  const [formData, setFormData] = useState({
    startAt: '',
    endAt: ''
  });
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

  const handleCalendarChange = (key, event) => {
    setFormData({
      ...formData,
      [key]: event.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const distance = distanceDate(formData.startAt);
      if (distance.includes('ago')) {
        const error = new Error('The schedule date cannot be set in the past.');
        throw error;
      }
      const { shopName, accessToken } = appState.app;
      const axiosRequest = new AxiosRequest(shopName, accessToken);
      const updatedSchedule = await axiosRequest.patch(
        `/api/schedules/${appState.selected}`,
        formData
      );
      let tmp = appState.schedules;
      const idx = tmp.indexOf((el) => el.id === updatedSchedule.id);
      tmp[idx] = updatedSchedule;
      setAppState({
        ...appState,
        schedules: tmp,
        schedule: false,
        selected: null
      });
    } catch (error) {
      appToast(error.message, 'error');
    }
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
            // value={new Date(formData.startAt)}
            onChange={(e) => handleCalendarChange('startAt', e)}
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
              // value={new Date(formData.endAt)}
              onChange={(e) => handleCalendarChange('endAt', e)}
              defaultValue={moment().add('1', 'hour').format('YYYY-MM-DDTHH:mm')}
              InputLabelProps={{
                shrink: true
              }}
            />
          )}
          <Button
            className={classes.modalFormButton}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
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
