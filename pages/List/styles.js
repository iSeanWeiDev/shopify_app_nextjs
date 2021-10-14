import { makeStyles } from '@material-ui/core';
import { green, orange } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({}));

export const useTableStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`
  },
  status_live: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 90,
    height: 40,
    color: green['600'],
    border: `1px solid ${green['600']}`,
    borderRadius: 40,
    '& svg': {
      marginRight: theme.spacing(1)
    }
  },
  status_scheduled: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 130,
    height: 40,
    color: orange['600'],
    border: `1px solid ${orange['600']}`,
    borderRadius: 40,
    '& svg': {
      marginRight: theme.spacing(1)
    }
  },
  pagination: {
    marginRight: theme.spacing(8)
  }
}));
