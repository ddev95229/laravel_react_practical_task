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
  Stack,
} from '@mui/material';

interface TaskFormData {
  title: string;
  description: string;
}

export default function TaskForm() {
  const navigate = useNavigate();
  
  const { listId, taskId } = useParams<{ listId: string; taskId?: string }>();
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  const fetchTask = async (): Promise<void> => {
    try {
      const response = await api.get<{ title: string; description?: string }>(`/tasks/${taskId}`);
      setFormData({
        title: response.data.title,
        description: response.data.description || '',
      });
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      if (taskId) {
        await api.put(`/tasks/${taskId}`, formData);
      } else if (listId) {
        await api.post(`/task-lists/${listId}/tasks`, formData);
      }
      navigate('/tasks');
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            {taskId ? 'Edit Task' : 'Create New Task'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Task Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
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