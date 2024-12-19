import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/axios';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack
} from '@mui/material';

export default function TaskListForm() {
  const navigate = useNavigate();
  const { listId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (listId) {
      fetchTaskList();
    }
  }, [listId]);

  const fetchTaskList = async () => {
    try {
      const response = await api.get(`/task-lists/${listId}`);
      setFormData({
        name: response.data.name,
      });
    } catch (error) {
      console.error('Error fetching task list:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (listId) {
        await api.put(`/task-lists/${listId}`, formData);
      } else {
        await api.post('/task-lists', formData);
      }
      navigate('/tasks');
    } catch (error) {
      console.error('Error saving task list:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            {listId ? 'Edit Task List' : 'Create New Task List'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Task List Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button 
                  variant="outlined"
                  onClick={() => navigate('/tasks')}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save'}
                </Button>
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
} 