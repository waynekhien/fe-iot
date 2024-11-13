import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import OpacityIcon from '@mui/icons-material/Opacity';
import LaptopIcon from '@mui/icons-material/Laptop';
import AirIcon from '@mui/icons-material/Air';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useState, useEffect , useCallback} from 'react';
import axios from 'axios';
import dayjs from 'dayjs'; // Sử dụng dayjs để định dạng thời gian
import './Dashboard.css';

const DeviceControl = () => {
  const [devices, setDevices] = useState({
    laptop: false,
    fan: false,
    led: false,
  });

  const handleToggle = async (device) => {
    const updatedStatus = !devices[device];

    try {
      // Gửi yêu cầu POST đến backend với trạng thái cập nhật
      const response = await axios.post('http://localhost:8000/api/control', {
        device: device,
        status: updatedStatus ? 'on' : 'off',
      });

      console.log('Device control updated:', response.data);

      // Cập nhật trạng thái thiết bị trên frontend sau khi backend xử lý thành công
      setDevices((prevDevices) => ({ ...prevDevices, [device]: updatedStatus }));

    } catch (error) {
      console.error('Error updating device control:', error);
    }
  };

  return (
    <Paper className="device-control">
      <Typography variant="h6" className="device-title">Điều Khiển Thiết Bị</Typography>
      {Object.keys(devices).map((device) => (
        <Box key={device} className="device-item">
          <Box className="device-icon">
            {device === 'laptop' && (
              <LaptopIcon className={`device-icon ${devices.laptop ? 'active' : ''}`} />
            )}
            {device === 'fan' && (
              <AirIcon className={`device-icon ${devices.fan ? 'active' : ''}`} />
            )}
            {device === 'led' && (
              <FlashOnIcon className={`device-icon ${devices.led ? 'active' : ''}`} />
            )}
            <Typography variant="body2">{device.charAt(0).toUpperCase() + device.slice(1)}</Typography>
          </Box>
          <Button
            variant="contained"
            onClick={() => handleToggle(device)}
            className={`device-button ${devices[device] ? 'on' : 'off'}`}
          >
            {devices[device] ? 'on' : 'off'}
          </Button>
        </Box>
      ))}
    </Paper>
  );
};


const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/datasensor/recent'); // Thay đổi URL theo API của bạn
        const formattedData = response.data.map(item => ({
          ...item,
          time: dayjs(item.time).format('YYYY-MM-DD HH:mm:ss'), // Định dạng lại thời gian
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Làm mới dữ liệu mỗi 10 giây
    const interval = setInterval(fetchData, 10000); // 10000ms = 10s

    // Xóa interval khi component bị unmount
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <Typography variant="h6">Đang tải dữ liệu...</Typography>;
  }

  return (
    <Box className="dashboard">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper className="statistic-item">
            <ThermostatIcon className="statistic-icon" />
            <Box>
              <Typography variant="h6">NHIỆT ĐỘ</Typography>
              <Typography variant="h4">{data[data.length - 1]?.temperature}°C</Typography> {/* Hiển thị nhiệt độ cuối cùng */}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className="statistic-item">
            <LightbulbIcon className="statistic-icon" />
            <Box>
              <Typography variant="h6">ÁNH SÁNG</Typography>
              <Typography variant="h4">{data[data.length - 1]?.light} LUX</Typography> {/* Hiển thị ánh sáng cuối cùng */}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className="statistic-item">
            <OpacityIcon className="statistic-icon" />
            <Box>
              <Typography variant="h6">ĐỘ ẨM</Typography>
              <Typography variant="h4">{data[data.length - 1]?.humidity}%</Typography> {/* Hiển thị độ ẩm cuối cùng */}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className="statistic-chart">
            <Typography variant="h6">Thống Kê</Typography>
            <LineChart width={400} height={250} data={data.slice(-5)}> {/* Chỉ lấy 5 giá trị gần nhất */}
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" /> {/* Đảm bảo rằng `time` hoặc trường tương ứng là chính xác */}
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="light" stroke="#8884d8" />
              <Line type="monotone" dataKey="temperature" stroke="#82ca9d" />
              <Line type="monotone" dataKey="humidity" stroke="#ffc658" />
            </LineChart>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Box className="device-control-container">
            <DeviceControl />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
