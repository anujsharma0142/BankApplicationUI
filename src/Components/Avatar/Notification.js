import { Badge } from 'antd';
import NotificationsIcon from '@mui/icons-material/Notifications';
import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useState, useEffect } from 'react';
import { Spin } from 'antd';


export default function Notification({manager, resource, setVal, fetchData}) {
  const [loading, setLoading] = useState(true);
  const [managerReqCount, setManagerCount] = useState(0);
  const [userPendingCount, setPendingCount] = useState(0);
  const [userReqCount, setReqCount] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (nav) => {
    setAnchorEl(null);
  };

  const setValues = () => {
    setManagerCount(manager.filter(item => (item.seen == false)).length);
    setPendingCount(resource.filter(item => (item.seen == false && item.status == "Pending")).length);
    setReqCount(resource.filter(item => (item.seen == false && item.status != "Pending")).length);
    setLoading(false); 
  }
  useEffect(() => { 
    setValues();
  }, []);

  return (
    <div>
    {loading ? (  
      <div size="middle" style={{'height':'100vh', 'display':'flex', 'alignItems':'center', 'justifyContent':'center'}}>
        <Spin size="large" />
      </div>
    ) : (<>
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Notifications">
          <IconButton
            onClick={handleClick}
            size="small"
            // sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Badge count={userReqCount + userPendingCount + managerReqCount}>
            <NotificationsIcon sx={{ width: 32, height: 32, color:"#EEEEEE"}}></NotificationsIcon>
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu 
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        {(managerReqCount != 0)?<>
            <MenuItem>
              <div className='btn bg-light' onClick={() => {setVal("2"); fetchData(); setValues()}}>You've {managerReqCount} pending reqeusts that requrie your attention</div>
            </MenuItem>    
        </>:<></>}
        {(userPendingCount != 0)?<>
            <MenuItem>
              <div className='btn bg-light' onClick={() => {setVal("1"); fetchData(); setValues()}}>System has generated {userPendingCount} new overtime request for you</div>
            </MenuItem>    
        </>:<></>}
        {(userReqCount != 0)?<>
            <MenuItem>
              <div className='btn bg-light' onClick={() => {setVal("1"); fetchData(); setValues()}}>Your {userReqCount} request has been recently reviewed</div>
            </MenuItem>    
        </>:<></>}
      </Menu>
    </React.Fragment>
    </>)}</div>
  );
} 