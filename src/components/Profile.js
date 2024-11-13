// components/Profile.js
import React from 'react';
import { Box, Typography, Link, Button } from '@mui/material';

const Profile = () => {
  return (
    <Box 
      sx={{ 
        height: '100vh', // Chiếm toàn bộ chiều cao trang
        display: 'flex', 
        flexDirection: 'column', // Căn chỉnh các phần tử theo chiều dọc
        alignItems: 'center', // Căn giữa theo chiều ngang
        justifyContent: 'center', // Căn giữa theo chiều dọc
      }}
    >
      {/* Container chính */}
      <Box
        sx={{
          p: 4, // Padding cho container
          width: '100%', // Đảm bảo chiếm toàn bộ chiều ngang
          maxWidth: '600px', // Giới hạn chiều rộng của ô
          backgroundColor: '#fff', // Màu nền trắng cho ô
          borderRadius: '8px', // Bo tròn các góc
          boxShadow: 3, // Thêm bóng đổ cho ô
          textAlign: 'center' // Căn giữa văn bản bên trong ô
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Profile Page
        </Typography>

        {/* Thêm ảnh đại diện */}
        <Box sx={{ mb: 3 }}>
          <img 
            src="/IMG_0935.JPG" 
            alt="Profile" 
            style={{ 
              width: '150px', // Chiều rộng ảnh
              height: '150px', // Chiều cao ảnh
              borderRadius: '50%', // Bo tròn ảnh để tạo kiểu hình tròn
              objectFit: 'cover' // Đảm bảo ảnh vừa vặn trong khung
            }} 
          />
        </Box>

        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Họ và tên:</strong> Nguyễn Gia Khiên
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Mã SV:</strong> B21DCCN459
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Lớp:</strong> D21HTTT02
        </Typography>

        {/* Link to file report */}
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Báo cáo:</strong> 
          <Button 
            variant="contained" 
            component="a" 
            href="/path/to/report.pdf" 
            download
            sx={{ ml: 1 }}
          >
            Tải về
          </Button>
        </Typography>

        {/* Link to GitHub and API Documentation */}
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>GitHub:</strong> 
          <Link href="https://github.com/yourusername" target="_blank" sx={{ ml: 1 }}>
            github.com/yourusername
          </Link>
        </Typography>

        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>API Documentation:</strong> 
          <Link href="https://yourapidoc.link" target="_blank" sx={{ ml: 1 }}>
            View API Docs
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Profile;
