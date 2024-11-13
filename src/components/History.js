import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, MenuItem, Select, InputLabel, FormControl, Button, Pagination, Typography } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import './History.css';  // Đảm bảo rằng CSS đã được import vào file JS


const HistoryPage = () => {
  const [searchDevice, setSearchDevice] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [searchTime, setSearchTime] = useState('');
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/history', {
          params: {
            device: searchDevice,
            status: searchStatus,
            time: searchTime, // Truyền thời gian dưới dạng chuỗi
            page,
            pageSize,
          }
        });

        setData(response.data.results);
        setTotalCount(response.data.totalCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [searchDevice, searchStatus, searchTime, page, pageSize]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    const value = event.target.value;
    if (value > 0) {
      setPageSize(Number(value));
      setPage(1);  // Reset page to 1 when pageSize changes
    }
  };

  const formatTime = (time) => {
    return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
  };

  if (loading) {
    return <Typography variant="h6">Đang tải dữ liệu...</Typography>;
  }

  const totalPages = Math.ceil(totalCount / pageSize);  // Tính số trang

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Action History</Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
          <TextField
            variant="outlined"
            fullWidth
            label="Search by Device"
            value={searchDevice}
            onChange={(e) => setSearchDevice(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="On">On</MenuItem>
              <MenuItem value="Off">Off</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <TextField
            variant="outlined"
            fullWidth
            label="Search by Time"
            value={searchTime}  // Sử dụng TextField để nhập thời gian
            onChange={(e) => setSearchTime(e.target.value)} // Cập nhật giá trị của thời gian
          />
        </Grid>
      </Grid>

      <Paper sx={{ mt: 2, width: '100%' }}>
        <TableContainer sx={{ width: '100%' }}>
          <Table sx={{ minWidth: 750 }} aria-label="history table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '10%' }}>ID</TableCell>
                <TableCell sx={{ width: '40%' }}>Device</TableCell>
                <TableCell sx={{ width: '30%' }}>Status</TableCell>
                <TableCell sx={{ width: '20%' }}>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.device}</TableCell>
                    <TableCell>
                      {/* Chỉ hiển thị trạng thái mà không có màu sắc */}
                      {row.status}
                    </TableCell>
                    <TableCell>{formatTime(row.time)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography variant="body1">Không có dữ liệu phù hợp</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>


          </Table>
        </TableContainer>
      </Paper>

      <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
        <Grid item>
          <TextField
            label="Page Size"
            type="number"
            value={pageSize}
            onChange={handlePageSizeChange}
            inputProps={{ min: 1 }}
            sx={{ width: 120 }}
          />
        </Grid>
        <Grid item>
          <Pagination
            count={totalPages} // Tính số trang có dữ liệu
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HistoryPage;
