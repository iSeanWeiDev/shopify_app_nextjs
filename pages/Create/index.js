import { useState, useEffect } from 'react';
import { useAppState } from '@/providers/state-provider';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Button,
  Chip,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import useStyles from './styles';

const ThemeCreate = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [loadedThemes, setLoadedThemes] = useState([]);
  const [formData, setFormData] = useState({
    age: '',
    name: 'hai'
  });
  const [appState, setAppState] = useAppState();

  useEffect(() => {
    setOpen(appState.create);
  }, [appState.create]);

  useEffect(() => {
    if (appState.themes) {
      setLoadedThemes(appState.themes);
    }
  }, [appState.themes]);

  const onTagsChange = (event, values) => {
    console.log(values);
  };

  const handleDialogClose = () => {
    setAppState({
      ...appState,
      create: false
    });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    setFormData({
      ...formData,
      [name]: event.target.value
    });
  };

  return (
    <Dialog open={open} onClose={handleDialogClose}>
      <DialogTitle disableTypography={false}>
        <Typography variant="h6">Pick a theme to duplicate:</Typography>
      </DialogTitle>
      <DialogContent style={{ minWidth: 400, paddingBottom: 30 }}>
        <FormControl variant="filled" className={classes.formContainer}>
          <InputLabel htmlFor="filled-age-native-simple">Theme</InputLabel>
          <Select
            native
            value={formData.age}
            onChange={handleChange}
            inputProps={{
              name: 'Theme',
              id: 'filled-age-native-simple'
            }}
          >
            {loadedThemes.map((theme, index) => (
              <option key={index} value={theme.id}>
                {theme?.name}
              </option>
            ))}
          </Select>
          <TextField
            className={classes.field}
            id="filled-multiline-static"
            label="Theme Description (optional)"
            multiline
            rows={4}
            variant="filled"
          />
          <Autocomplete
            className={classes.field}
            limitTags={2}
            multiple
            id="tags-filled"
            options={tags.map((option) => option.tag)}
            freeSolo
            onChange={onTagsChange}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip key={index} variant="default" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Tags (optional)"
                placeholder="Tags"
              />
            )}
          />
          <Button
            className={classes.modalFormButton}
            variant="contained"
            color="primary"
            disableElevation
          >
            Duplicate Theme
          </Button>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

export default ThemeCreate;
