import React, { useState } from 'react';
import clsx from 'clsx';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@material-ui/core';
import { Menu as MenuIcon, Add as AddIcon } from '@material-ui/icons';
import { FormButton } from '@/components/Form';
import { useAppState } from '@/providers/state-provider';
import useStyles from './styles';

const AppNavbar = ({ open, onChange }) => {
  const classes = useStyles();
  const [appState, setAppState] = useAppState();

  return (
    <AppBar
      position="fixed"
      color="inherit"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open
      })}
    >
      <Toolbar className={classes.toolbar}>
        <Box display="flex" alignItems="center">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => onChange()}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <img height={35} src={require('../../../assets/logo.svg')} alt="ThemeFlight logo" />
        </Box>
        <FormButton
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setAppState({ ...appState, create: true })}
        >
          Theme
        </FormButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavbar;
