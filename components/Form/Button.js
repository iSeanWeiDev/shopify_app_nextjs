import { Button, withStyles } from '@material-ui/core';

const FormButton = withStyles({
  root: {
    backgroundColor: '#0150f5',
    '&:hover': {
      backgroundColor: '##00419e',
      borderColor: '#0150f5',
      boxShadow: 'none'
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '##00419e',
      borderColor: '#0150f5'
    },
    '&:focus': {
      boxShadow: 'none'
    }
  }
})(Button);

export default FormButton;
