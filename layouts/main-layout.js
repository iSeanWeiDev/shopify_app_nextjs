import React, { useState } from 'react';
import clsx from 'clsx';
import { CssBaseline } from '@material-ui/core';
import { AppNavbar, AppSidebar, AppFooter } from '@/components/App';
import { useMainStyles } from './styles';

const AppMainLayout = ({ children }) => {
  const classes = useMainStyles();
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppNavbar open={open} onChange={() => setOpen(!open)} />
      <AppSidebar open={open} onChange={() => setOpen(!open)} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        {children}
      </main>
      <AppFooter />
    </div>
  );
};

export default AppMainLayout;
