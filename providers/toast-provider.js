import { useState, useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const MySnackbar = (props) => (
  <Snackbar
    open={props.open}
    autoHideDuration={6000}
    onClose={props.onClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
  >
    <Alert onClose={props.onClose} severity={props.severity}>
      {props.message}
    </Alert>
  </Snackbar>
);

MySnackbar.prototype = {
  open: PropTypes.bool,
  message: PropTypes.string,
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
  onClose: PropTypes.func
};

const AppToastContext = createContext(null);
AppToastContext.displayName = 'AppToastContext';

const AppToastProvider = ({ children, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const value = (text, option) => {
    setOpen(true);
    setMessage(text);
    setSeverity(option);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <AppToastContext.Provider value={value} {...rest}>
      <MySnackbar open={open} message={message} severity={severity} onClose={handleClose} />
      {children}
    </AppToastContext.Provider>
  );
};

const useAppToast = () => {
  return useContext(AppToastContext);
};

export { AppToastProvider, useAppToast };
