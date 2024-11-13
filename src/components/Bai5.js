import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import OpacityIcon from '@mui/icons-material/Opacity';
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs'; // Sử dụng dayjs để định dạng thời gian

const Bai5 = () => {
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
    <Box className="bai5-dashboard">
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
      </Grid>
    </Box>
  );
};

export default Bai5;
