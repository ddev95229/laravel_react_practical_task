import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Profile() {
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
            <Avatar sx={{ width: 100, height: 100, mr: 3 }}>
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
                defaultValue="John Doe"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                defaultValue="johndoe"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                defaultValue="john.doe@example.com"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary">
                Edit Profile
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
} 