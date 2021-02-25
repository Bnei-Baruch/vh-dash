import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Chip, List, MenuItem, Popover } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    '& .MuiTableCell-head': {
      fontSize: 16,
      '@media (max-width: 600px)': {
        fontSize: 14,
      },
    },
  },
  rotateUp: {
    transform: 'rotateZ(180deg)',
    transition: 'transform 0.5s',
  },
  rotateDown: {
    transform: 'rotateZ(0deg)',
    transition: 'transform 0.5s',
  },
  sortedCell: {
    cursor: 'pointer',
    position: 'relative',
    paddingRight: '20px',
  },
  arrowDown: {
    position: 'absolute',
    width: '16px',
    height: '16px',
    bottom: '2px',
    right: '0',
  },
  payment: {
    color: '#757575',
  },
  actionCell: {
    cursor: 'pointer',
  },
});

const mockData = [
  {
    id: 1,
    paidOn: '2020-11-11',
    purpose: 'Books',
    paymentMethod: 'Check',
    paymentType: 'one-time',
    amount: 78.76,
    currency: 'USD',
    status: 'Pending',
    action: 'Action',
  },
  {
    id: 2,
    paidOn: '2020-11-19',
    purpose: 'Books',
    paymentMethod: 'Check',
    paymentType: 'one-time',
    amount: 78.76,
    currency: 'USD',
    status: 'Failed',
    action: 'Action',
  },
  {
    id: 3,
    paidOn: '2020-11-12',
    purpose: 'Books',
    paymentMethod: 'Check',
    paymentType: 'one-time',
    amount: 78.76,
    currency: 'USD',
    status: 'Cancelled',
    action: 'Action',
  },
  {
    id: 4,
    paidOn: '2020-11-3',
    purpose: 'Books',
    paymentMethod: 'Check',
    paymentType: 'one-time',
    amount: 78.76,
    currency: 'USD',
    status: 'Paid',
    action: 'Action',
  },
];
// TODO: Remove after implementation on BE
// Sort mockData
mockData.sort((a, b) => new Date(b.paidOn) - new Date(a.paidOn));

const TransactionTable = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [data, setData] = useState(mockData);
  const [isSorted, setIsSorted] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const sortPaidOn = sorted => {
    const copiedData = [...mockData];
    const sortedData = copiedData.sort(
      (a, b) => new Date(a.paidOn) - new Date(b.paidOn),
    );
    const resultData = sorted ? sortedData : mockData;

    setData(resultData);
    setIsSorted(sorted);
  };

  const handleClick = event => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const convertDateToAnotherFormat = date => {
    const newDate = new Date(date);
    const getFullYear = () => newDate.getFullYear();
    const getMonthWithZero = () => getZeroValue(newDate.getMonth() + 1);
    const getDayWithZero = () => getZeroValue(newDate.getDate());

    const getZeroValue = value => ('0' + value).slice(-2);

    const dateMethods = [getDayWithZero, getMonthWithZero, getFullYear];

    return dateMethods.map(method => method()).join('/');
  };

  const setStatusColor = value => {
    switch (value) {
      case 'Pending':
        return '#9CCB3B';
      case 'Cancelled':
        return '#FF9800';
      case 'Failed':
        return '#D32F2F';
      default:
        return '#1E88E5';
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='transaction table'>
        <TableHead>
          <TableRow>
            <TableCell>
              <span
                onClick={() => sortPaidOn(!isSorted)}
                className={classes.sortedCell}
              >
                {t('Dashboard.Account.paidOn')}
                <ArrowDownwardIcon
                  className={`${classes.arrowDown} ${
                    isSorted ? classes.rotateUp : classes.rotateDown
                  }`}
                />
              </span>
            </TableCell>
            <TableCell>{t('Dashboard.Account.purpose')}</TableCell>
            <TableCell>{t('Dashboard.Account.paymentMethod')}</TableCell>
            <TableCell>{t('Dashboard.Account.paymentType')}</TableCell>
            <TableCell>{t('Dashboard.Account.amount')}</TableCell>
            <TableCell>{t('Dashboard.Account.currency')}</TableCell>
            <TableCell>{t('Dashboard.Account.status')}</TableCell>
            <TableCell align='center'>{t('Dashboard.Account.action')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => (
            <TableRow key={item.id}>
              <TableCell>{convertDateToAnotherFormat(item.paidOn)}</TableCell>
              <TableCell>{item.purpose}</TableCell>
              <TableCell>{item.paymentMethod}</TableCell>
              <TableCell className={classes.payment}>
                {item.paymentType}
              </TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.currency}</TableCell>
              <TableCell>
                <Chip
                  label={item.status}
                  style={{
                    backgroundColor: setStatusColor(item.status),
                    color: '#FFF',
                    height: '20px',
                    borderRadius: '10px',
                  }}
                />
              </TableCell>
              <TableCell align='center'>
                <MoreHorizIcon
                  onClick={handleClick}
                  className={classes.actionCell}
                />
                <Popover
                  anchorEl={anchorEl}
                  open={!!anchorEl}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                >
                  <List>
                    <MenuItem onClick={handleMenuClose}>
                      {t('Dashboard.Account.cancelPayment')}
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      {t('Dashboard.Account.downloadInvoice')}
                    </MenuItem>
                  </List>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;
