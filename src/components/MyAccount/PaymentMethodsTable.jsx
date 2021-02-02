import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    '& .MuiTableCell-head': {
      fontSize: '16px',
    },
  },
  wrapper: {
    maxWidth: 650,
  },
});

const mockData = [
  {
    id: 1,
    card: 'Visa',
    number: '27853223756',
    expirationDate: '09/22',
  },
  {
    id: 2,
    card: 'Dinner',
    number: '5863458345',
    expirationDate: '01/28',
  },
];

const PaymentMethodsTable = () => {
  const classes = useStyles();

  const showLastFour = str => {
    const replacedSymbols = str.length - 4;
    const regExStr = '^\\d{1,' + replacedSymbols + '}';
    const regEx = new RegExp(regExStr, 'g');

    return str.replace(regEx, x => x.replace(/./g, '*'));
  };

  return (
    <TableContainer component={Paper} className={classes.wrapper}>
      <Table className={classes.table} aria-label='transaction table'>
        <TableHead>
          <TableRow>
            <TableCell>Card</TableCell>
            <TableCell>Number</TableCell>
            <TableCell>Expiration Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockData.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.card}</TableCell>
              <TableCell>{showLastFour(item.number)}</TableCell>
              <TableCell>{item.expirationDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentMethodsTable;
