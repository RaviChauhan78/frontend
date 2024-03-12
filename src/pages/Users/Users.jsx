import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Avatar, Box, Button, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, Grow, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Slide, Switch, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tabs, TextField, Zoom } from '@material-ui/core';
import { useState } from 'react';
import Joi from 'joi';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import classNames from 'classnames';
import { getUsersAction } from '../../store/user/asyncActions';

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(1)
  },
  card: {
    position: 'relative',
    clear: 'both'
  },
  appBar: {
    boxShadow: theme.shadows[0]
  },
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

function Users() {
  const classes = useStyles();
  const [deleteModal, setDeleteModal] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const dispatch = useDispatch();

  const userListData = useSelector((state) => state?.user?.getUsers);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    document.title = 'Users - App';
    dispatch(getUsersAction());
  }, []);

  // useEffect(() => {
  //   const queryString = window.location.search;
  //   const params = new URLSearchParams(queryString);
  //   const userID = params.get('userID');
  //   const userName = params.get('userName');
  //   if (userID && userName) {
  //     walletView({ _id: userID, name: userName });
  //   }
  // }, []);


  useEffect(() => {
    if (userListData?.data?.success && Array.isArray(userListData?.data?.result)) {
      setUsers(userListData?.data?.result);
      userListData.data = null;
    }
  }, [userListData]);

  return (
    <div>
      <Card className='pageCover'>
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant='h5' color="textSecondary" className="flexSpacer">
              Users
            </Typography>
            {/* <Tooltip title={'Add New Category'} placement="left">
              <Button color='default' variant='outlined' onClick={() => { resetForm(); setOpenModal(true); }}>+ Add New</Button>
            </Tooltip> */}
          </Toolbar>
        </AppBar>
        <Paper>
          <TableContainer className='Custom_Datatable'>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>E-Mail</TableCell>
                  <TableCell>Mobile</TableCell>
                  {/* <TableCell align='right'>Action</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {users && users.map((row, index) => {
                  return (
                    <TableRow key={row?._id}>
                      <TableCell>{index + 1 + (page) * pageSize}</TableCell>
                      <TableCell style={{ minWidth: '150px' }}>{row?.name}</TableCell>
                      <TableCell style={{ minWidth: '150px' }}>{row?.email}</TableCell>
                      <TableCell style={{ minWidth: '150px' }}>{row?.mobile}</TableCell>

                      {/* <TableCell style={{ minWidth: '175px' }} align='right'>
                        <Tooltip title={'View'} placement="left">
                          <IconButton onClick={() => { setRowData(row); setTab(0); setOpenDetailsModal(true) }}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={'Wallet'} placement="left">
                          <IconButton onClick={() => walletView(row)}>
                            <AccountBalanceWalletIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell> */}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={totalCount}
            rowsPerPage={pageSize}
            page={page}
            rowsPerPageOptions={[5, 10, 20]}
            onChangePage={(e, page) => handlePageChange(page)}
            onChangeRowsPerPage={(e) => setPageSize(e.target.value)}
          />
        </Paper>
      </Card>

      {/* delete confirm dialog */}
      <Dialog
        open={deleteModal}
        TransitionComponent={Collapse}
        // keepMounted
        onClose={() => setDeleteModal(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this record?
            This action is irreversible and will permanently remove the data.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setDeleteModal(false)}>
            Cancel
          </Button>
          <Button color="primary" style={{ color: '#f44336' }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default Users
