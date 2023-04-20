// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import MuiDrawer from '@mui/material/Drawer';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import TabContext from '@mui/lab/TabContext';
// import TabPanel from '@mui/lab/TabPanel';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import {ProfileFilled, HistoryOutlined, HomeFilled} from '@ant-design/icons';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
// import React ,{useEffect,useState} from 'react';
// import { useNavigate } from 'react-router';
// import axios from 'axios';
// import Navbar from 'react-bootstrap/Navbar';
// import Logo from './Components/Images/incedologo.png';
// import AvatarItem from './Components/Avatar/Avatar';
// import NotificationItem from './Components/Avatar/Notification';
// import './App.css';
// import DashboardIcon from "@material-ui/icons/Dashboard";
// import DashboardComp from './Components/TabComponent/Dashboard/Dashboard';
// import jwt from 'jwt-decode';
// import { Spin } from 'antd';

// const drawerWidth = 150;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: 'hidden',
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(4)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(6)} + 1px)`,
//   },
// });

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );

// export default function MiniDrawer() {
//   const [loading, setLoading] = useState(true);
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const [tabValue, setValue] = React.useState("1");
//   const navigate = new useNavigate();
//   const [name, setName] = useState("");
//   const [resourceDetail, setResourceDetail] = useState([]);
//   const [resourceRequests, setResourceRequests] = useState([]);
//   const [managerRequests, setManagerRequests] = useState([]);
//   const [reqHistory, setRequestsHistory] = useState([]);
//   const [status, setStatus] = useState([]);
  
//   const handleDrawerLinks = (idx) => {
//     setValue(idx);
//   };

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const fetchData = () => {
//     Promise.all([
//       axios.get('http://localhost:8084/api/v1/resource/data', {headers: { 
//         Authorization : `Bearer ${localStorage.getItem("token")}`,
//         'Access-Control-Allow-Origin': '*'
//       }}),
//       axios.get('http://localhost:8084/api/v1/request/manager', {headers: {
//         Authorization : `Bearer ${localStorage.getItem("token")}`,
//         'Access-Control-Allow-Origin': '*'
//       }}),
//       axios.get('http://localhost:8084/api/v1/request/history', {headers: {
//         Authorization : `Bearer ${localStorage.getItem("token")}`,
//         'Access-Control-Allow-Origin': '*'
//       }}),
//       axios.get('http://localhost:8084/api/v1/request/resource', {headers: {
//         Authorization : `Bearer ${localStorage.getItem("token")}`,
//         'Access-Control-Allow-Origin': '*'
//       }}),
//       axios.get('http://localhost:8084/api/v1/status/getstatus', {headers: {
//         Authorization : `Bearer ${localStorage.getItem("token")}`,
//         'Access-Control-Allow-Origin': '*'
//       }})
//     ])
//     .then(([res1, res2, res3, res4, res5]) => {
//       setLoading(false); 
//       setResourceDetail(res1.data); 
//       setManagerRequests(res2.data);
//       setRequestsHistory(res3.data);
//       setResourceRequests(res4.data);
//       setStatus(res5.data);
//       setName(res1.data.name)
//       if (tabValue=='1' && res2.data.length + res3.data.length > 0) {
//         setValue('2');
//       }
//     })
//     .catch(error => {
//       navigate('/login')
//     });
//   }

//   useEffect(() => { 
//     fetchData();
//   }, []);

//   useEffect(() => { 
//     if (jwt(localStorage.getItem('token')).roles == 'ADMIN') {
//       const idx = "4";
//       setValue(idx);
//     }
//   }, [] );

//   return (
//     <div>
//     {loading ? (  
//       <div size="middle" style={{'height':'100vh', 'display':'flex', 'alignItems':'center', 'justifyContent':'center'}}>
//         <Spin size="large" />
//       </div>
//     ) : (<>
//     <Box sx={{ display: 'flex' }} >
//       <CssBaseline />
//       <AppBar open={open} style={{backgroundColor:"#222831"}} >
//         <Toolbar >
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{
//               marginRight: 2,
//               ...(open && { display: 'none' }),
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Navbar.Brand href="/starfrontend/home" ><img className='logo' src={Logo} alt='' ></img></Navbar.Brand>
//           <div className="d-flex justify-content-end col">
//           {((jwt(localStorage.getItem('token'))).roles == 'USER')?(<>
//             <div className='mx-1 row'><NotificationItem manager={managerRequests} resource={resourceRequests} setVal={setValue} fetchData={fetchData}/></div>
//             </>):(<></>)}
//             <AvatarItem initials={name[0]}/>
//             <div className='mt-2 mx-2' sx={{fontSize:'large'}} style ={{color:'#EEEEEE'}}>Hi {name.split(' ')[0]}</div>
//           </div>
//         </Toolbar>
//       </AppBar>
//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {((jwt(localStorage.getItem('token'))).roles == 'USER')?(<>
//           <ListItem key='Home' className={`${(tabValue == '1')?'highlightTab text-primary':''}`} disablePadding sx={{ display: 'block' }} onClick={() => handleDrawerLinks("1")}>
//             <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 1.5 }}>
//                 <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
//                 <HomeFilled className={`${(tabValue == '1')?'text-primary':''}`} />
//                 </ListItemIcon>
//                 <ListItemText primary='Home' sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>
//           {(managerRequests.length === 0 && reqHistory.length == 0)?(''):(
//           <><ListItem className={`${(tabValue == '2')?'highlightTab text-primary':''}`} disablePadding sx={{ display: 'block' }} onClick={() => handleDrawerLinks("2")}>
//             <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 1.5 }}>
//                 <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
//                   <ProfileFilled className={`${(tabValue == '2')?'text-primary':''}`} />
//                 </ListItemIcon>
//                 <ListItemText primary='Requests' sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>
//           <ListItem className={`${(tabValue == '3')?'highlightTab text-primary':''}`}  disablePadding sx={{ display: 'block' }} onClick={() => handleDrawerLinks("3")}>
//             <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 1.5 }}>
//                 <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
//                   <HistoryOutlined className={`${(tabValue == '3')?'text-primary':''}`} />
//                 </ListItemIcon>
//                 <ListItemText primary='History' sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem></>
//           )}
//           </>):(
//           <ListItem className={`${(tabValue == '4')?'highlightTab text-primary':''}`}  disablePadding sx={{ display: 'block' }} onClick={() => handleDrawerLinks("4")}>
//             <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 1.5 }}>
//               <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
//                 <DashboardIcon className={`${(tabValue == '4')?'text-primary':''}`} />
//               </ListItemIcon>
//               <ListItemText primary="Dashboard" disablePadding sx={{ opacity: open ? 1 : 0 }}/>
//             </ListItemButton>
//           </ListItem>
//           )}
//         </List>
//       </Drawer>
//       <TabContext value={tabValue}>
//         <TabPanel value="1">
//           <Box sx={{ flexGrow: 1}}>
//             <DrawerHeader />
//             <ResourceTable reqData={resourceRequests} status={status}/>
//           </Box>
//         </TabPanel>
//         <TabPanel value="2">
//             <DrawerHeader />
//             <ManagerTable  managerReq={managerRequests} managerId={resourceDetail.userId} status={status} fetchData={fetchData}/>
//         </TabPanel>
//         <TabPanel value="3">
//             <DrawerHeader />
//             <HistoryTable  reqHistory={reqHistory} managerId={resourceDetail.userId} fetchData={fetchData}/>
//         </TabPanel>
//         <TabPanel value="4">
//             <DrawerHeader />
//             <DashboardComp/>
//         </TabPanel>
//         {/* <TabPanel value="5">
//             <DrawerHeader />
//            <ProfilePage  Resdata = {resourceDetail} fetchData={fetchData} ></ProfilePage>
//         </TabPanel> */}
//       </TabContext>
//     </Box>
  
//     {((jwt(localStorage.getItem('token'))).roles == 'USER')?(
//     <div class="fixed-bottom w-100 bg-dark footerDiv" sx={{width:'100%'}}>
//       <div className='text-center text-light text-small'>
//         <small>© 2023 Incedo</small>
//       </div>
//     </div>):('')}
//     </>)}</div>
//   );
// }



import React from 'react';
import Logout from './Components/Logout/Logout';

function Nav() {
  return (
    <div>
      <div>home</div>
      <Logout/>
    </div>
  )
}

export default Nav