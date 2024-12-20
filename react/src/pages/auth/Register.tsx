import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import api from '../../services/axios';
import { useState } from 'react';

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type ApiResponse = {
  token: string;
};

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const response = await api.post<ApiResponse>('/register', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/tasks');
    } catch (err: unknown) {
      if (err instanceof Error) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        setError(axiosError.response?.data?.message || 'Registration failed');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password_confirmation"
            label="Password Confirmation"
            type="password"
            value={formData.password_confirmation}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 