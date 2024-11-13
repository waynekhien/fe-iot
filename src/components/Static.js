import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TextField, Button, Pagination, Typography, IconButton
} from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import axios from 'axios';
import dayjs from 'dayjs';

const StaticPage = () => {
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [light, setLight] = useState('');
  const [time, setTime] = useState('');
  const [pageSize, setPageSize] = useState(10); // Đặt pageSize mặc định là 10
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState('id'); // Sắp xếp mặc định theo ID
  const [sortOrder, setSortOrder] = useState('ASC'); // Thứ tự mặc định là ASC

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/datasensor`, {
        params: {
          temperature: temperature || null,
          humidity: humidity || null,
          light: light || null,
          time: time || null,
          pageSize: pageSize, // Sử dụng pageSize mặc định hoặc người dùng nhập
          page: page, // Thêm trang hiện tại
          sortField,
          sortOrder
        }
      });
      setData(response.data.results);
      setTotalCount(response.data.totalCount || response.data.results.length); // Đếm tổng kết quả nếu có
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [temperature, humidity, light, time, pageSize, page, sortField, sortOrder]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = () => {
    setPage(1);
    fetchData();
  };

  const handlePageSizeChange = (event) => {
    const value = event.target.value;
    setPageSize(value ? parseInt(value, 10) : 10); // Nếu không nhập, giữ pageSize mặc định là 10
    setPage(1);
  };

  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortOrder(prevOrder => (prevOrder === 'ASC' ? 'DESC' : 'ASC'));
    } else {
      setSortField(field);
      setSortOrder('ASC');
    }
  };

  const formatTime = (time) => dayjs(time).format('YYYY-MM-DD HH:mm:ss');

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Data Sensor</Typography>

      <Grid container spacing={2} alignItems="center">
        {[ 
          { label: 'Temperature', value: temperature, onChange: setTemperature, field: 'temperature' },
          { label: 'Humidity', value: humidity, onChange: setHumidity, field: 'humidity' },
          { label: 'Light', value: light, onChange: setLight, field: 'light' },
          { label: 'Time (YYYY-MM-DD HH:mm:ss)', value: time, onChange: setTime, field: 'time' }
        ].map(({ label, value, onChange, field }, idx) => (
          <Grid item xs={3} key={idx}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder={label}
              value={value}
              onChange={(event) => onChange(event.target.value)}
            />
            <IconButton onClick={() => handleSortChange(field)}>
              {sortField === field
                ? (sortOrder === 'ASC' ? <ArrowUpward /> : <ArrowDownward />)
                : <ArrowUpward />}
            </IconButton>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{ mt: 2 }}
      >
        Search
      </Button>

      <Paper sx={{ mt: 2, width: '100%' }}>
        <TableContainer sx={{ width: '100%' }}>
          <Table sx={{ minWidth: 750 }} aria-label="data table">
            <TableHead>
              <TableRow>
                <TableCell onClick={() => handleSortChange('id')}>
                  ID {sortField === 'id' && (sortOrder === 'ASC' ? <ArrowUpward /> : <ArrowDownward />)}
                </TableCell>
                <TableCell onClick={() => handleSortChange('temperature')}>
                  Temperature {sortField === 'temperature' && (sortOrder === 'ASC' ? <ArrowUpward /> : <ArrowDownward />)}
                </TableCell>
                <TableCell onClick={() => handleSortChange('humidity')}>
                  Humidity {sortField === 'humidity' && (sortOrder === 'ASC' ? <ArrowUpward /> : <ArrowDownward />)}
                </TableCell>
                <TableCell onClick={() => handleSortChange('light')}>
                  Light {sortField === 'light' && (sortOrder === 'ASC' ? <ArrowUpward /> : <ArrowDownward />)}
                </TableCell>
                <TableCell onClick={() => handleSortChange('time')}>
                  Time {sortField === 'time' && (sortOrder === 'ASC' ? <ArrowUpward /> : <ArrowDownward />)}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.temperature}</TableCell>
                  <TableCell>{row.humidity}</TableCell>
                  <TableCell>{row.light}</TableCell>
                  <TableCell>{formatTime(row.time)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
        <Grid item>
          <TextField
            variant="outlined"
            label="Page Size"
            type="number"
            value={pageSize}
            onChange={handlePageSizeChange}
            sx={{ width: 120 }}
          />
        </Grid>
        <Grid item>
          <Pagination
            count={Math.ceil(totalCount / pageSize)}
            page={page}
            onChange={(event, newPage) => setPage(newPage)}
            color="primary"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StaticPage;
