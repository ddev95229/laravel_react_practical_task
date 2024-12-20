import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/axios';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  Link
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

type FormData = {
  email: string;
  password: string;
};

type ApiResponse = {
  token: string;
};

export default function Login() {
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {

      const response = await api.post<ApiResponse>('/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/tasks');
      
    } catch (err: unknown) {
      if (err instanceof Error) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        setError(axiosError.response?.data?.message || 'Login failed');
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
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            autoFocus
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
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Link href="/register" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
} 