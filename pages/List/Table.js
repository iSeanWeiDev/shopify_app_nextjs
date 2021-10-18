import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  TablePagination
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  ShowChart as ShowChartIcon,
  AccessTime as AccessTimeIcon,
  Public as WorldIcon,
  EventAvailable as EventAvailableIcon,
  Settings as SettingsIcon
} from '@material-ui/icons';
import { loremIpsum } from 'react-lorem-ipsum';
import { useAppState } from '@/providers/state-provider';
import { convertISOToDate } from '@/utils/date-helper';
import { useTableStyles } from './styles';
import { THEME_LIST_TABLE } from './constant';

const ThemeListTable = () => {
  const classes = useTableStyles();
  const [appState, setAppState] = useAppState();
  const [rows, setRows] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setRows(appState.themes);
    setSchedules(appState.schedules);
  }, [appState.themes, appState.schedules]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {THEME_LIST_TABLE.map((el, index) => (
              <TableCell key={index} align={el.align} width={el.width}>
                <Typography variant="subtitle1" component="p">
                  <b>{el.label}</b>
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" align="left" scope="row">
                <Typography variant="h6" component="h2">
                  {row.name}
                </Typography>
                <Typography variant="body1" component="p">
                  {loremIpsum({ random: true, avgWordsPerSentence: 10, p: 1 })[0].substring(0, 100)}
                </Typography>
              </TableCell>
              <TableCell component="td" align="left">
                {row?.tags}
              </TableCell>
              <TableCell component="td" align="center">
                {convertISOToDate(row.themeCreatedAt)}
              </TableCell>
              <TableCell component="td" align="center">
                {row?.scheduled_at}
              </TableCell>
              <TableCell component="td" align="center">
                {row.status === 'ACTIVATED' && (
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <div className={classes.status_live}>
                      <WorldIcon />
                      <Typography variant="body1">Live</Typography>
                    </div>
                  </Box>
                )}
                {schedules.findIndex((el) => el.themeId === row.id) > -1 && (
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <div className={classes.status_scheduled}>
                      <EventAvailableIcon />
                      <Typography variant="body1">Scheduled</Typography>
                    </div>
                  </Box>
                )}
              </TableCell>
              <TableCell component="td" align="center">
                <IconButton
                  size="small"
                  aria-label="delete"
                  onClick={() => setAppState({ ...appState, schedule: true, selected: row.id })}
                >
                  <AccessTimeIcon />
                </IconButton>
                <IconButton size="small" aria-label="delete">
                  <ShowChartIcon />
                </IconButton>
                <IconButton
                  size="small"
                  aria-label="delete"
                  onClick={() => setAppState({ ...appState, delete: true, selected: row.id })}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton size="small" aria-label="setting">
                  <SettingsIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={appState.themes ? appState.themes.length : 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15, 20, 50]}
        className={classes.pagination}
      />
    </TableContainer>
  );
};

export default ThemeListTable;
