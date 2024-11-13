// App.js
import { CssBaseline, Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom'; // Thêm dòng này
import Sidebar from './components/Sidebar';  
import Dashboard from './components/Dashboard';  
import Static from './components/Static'; // Thêm import cho trang Static
import History from './components/History'; // Thêm import cho trang History
import Profile from './components/Profile'; // Thêm import cho trang Profile
import Bai5 from './components/Bai5';

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/static" element={<Static />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bai5" element={<Bai5 />} />
      </Routes>
    </Box>
  );
}

export default App;
