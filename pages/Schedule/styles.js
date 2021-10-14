import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    position: 'absolute',
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  modalWindow: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '10%'
  },
  formContainer: {
    width: '100%',
    marginTop: 10,
    '.MuiFormControl-root': {
      width: '100%'
    }
  },
  modalFormButton: {
    marginTop: 15
  },
  field: {
    marginTop: 15
  }
}));

export default useStyles;
