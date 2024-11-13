import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import BookIcon from '@mui/icons-material/Book'; // Import icon mới
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', backgroundColor: '#21222C' },
      }}
    >
      <List>
        <ListItem 
          button 
          component={Link} 
          to="/" 
          sx={{ 
            color: '#fff', 
            backgroundColor: location.pathname === '/' ? '#9c27b0' : 'transparent', 
            '&:hover': { backgroundColor: '#9c27b0' } 
          }}
        >
          <ListItemIcon><DashboardIcon style={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem 
          button 
          component={Link} 
          to="/static" 
          sx={{ 
            color: '#fff', 
            backgroundColor: location.pathname === '/static' ? '#9c27b0' : 'transparent', 
            '&:hover': { backgroundColor: '#9c27b0' } 
          }}
        >
          <ListItemIcon><AssessmentIcon style={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Data Sensor" />
        </ListItem>
        <ListItem 
          button 
          component={Link} 
          to="/history" 
          sx={{ 
            color: '#fff', 
            backgroundColor: location.pathname === '/history' ? '#9c27b0' : 'transparent', 
            '&:hover': { backgroundColor: '#9c27b0' } 
          }}
        >
          <ListItemIcon><HistoryIcon style={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Action History" />
        </ListItem>
        <ListItem 
          button 
          component={Link} 
          to="/profile" 
          sx={{ 
            color: '#fff', 
            backgroundColor: location.pathname === '/profile' ? '#9c27b0' : 'transparent', 
            '&:hover': { backgroundColor: '#9c27b0' } 
          }}
        >
          <ListItemIcon><PersonIcon style={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem 
          button 
          component={Link} 
          to="/bai5" 
          sx={{ 
            color: '#fff', 
            backgroundColor: location.pathname === '/bai5' ? '#9c27b0' : 'transparent', 
            '&:hover': { backgroundColor: '#9c27b0' } 
          }}
        >
          <ListItemIcon><BookIcon style={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Bài 5" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
