import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Avatar,
  Grid,
  CircularProgress,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import api from '../../services/axios';

// Define TypeScript interface for User
interface User {
  id: number;
  name: string;
  email: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch user data from the API
  const fetchUser = async (): Promise<void> => {
    try {
      const response = await api.get<User>('/user');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Container component="main" maxWidth="md">
        <Typography variant="h6" color="error" sx={{ mt: 8, textAlign: 'center' }}>
          Failed to load user data.
        </Typography>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar
              alt={user.name}
              sx={{ width: 100, height: 100, mr: 3 }}
            >
              <AccountCircleIcon sx={{ width: 80, height: 80 }} />
            </Avatar>
            <Typography component="h1" variant="h4">
              User Profile
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={user.name}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                value={user.email}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}
