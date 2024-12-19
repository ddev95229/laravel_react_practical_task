import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/axios';
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Fab,
  Checkbox,
  Paper,
  ListItemSecondaryAction,
  Divider,
  CircularProgress,
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
}

interface TaskList {
  id: number;
  name: string;
  tasks: Task[];
}

export default function TaskList() {
  const navigate = useNavigate();
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTaskLists();
  }, []);

  const fetchTaskLists = async () => {
    try {
      const response = await api.get('/task-lists');
      const lists = await Promise.all(
        response.data.map(async (list: TaskList) => {

          return { ...list, tasks: list.tasks };
        })
      );
      setTaskLists(lists);
    } catch (error) {
      console.error('Error fetching task lists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (taskId: number, completed: boolean) => {
    try {
      await api.patch(`/tasks/${taskId}/toggle`);
      fetchTaskLists(); // Refresh the lists
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTaskLists();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleDeleteTaskList = async (listId: number) => {
    try {
      await api.delete(`/task-lists/${listId}`);
      fetchTaskLists();
    } catch (error) {
      console.error('Error deleting task list:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            My Task Lists
          </Typography>
          <Fab 
            color="primary" 
            size="medium" 
            aria-label="add"
            onClick={() => navigate('/task-lists/new')}
          >
            <AddIcon />
          </Fab>
        </Box>

        {loading ? (
          <CircularProgress />
        ) : (
          taskLists.map((taskList) => (
            <Paper key={taskList.id} sx={{ mb: 3, p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">{taskList.name}</Typography>
                <Box>
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={() => navigate(`/task-lists/${taskList.id}/edit`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => handleDeleteTaskList(taskList.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Button
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => navigate(`/task-lists/${taskList.id}/tasks/new`)}
                sx={{ mb: 2 }}
              >
                Add Task
              </Button>
              <List>
                {taskList.tasks.map((task) => (
                  <ListItem key={task.id} disablePadding>
                    <Checkbox
                      checked={task.completed}
                      edge="start"
                      onChange={() => handleToggleTask(task.id, !task.completed)}
                    />
                    <ListItemText 
                      primary={task.title}
                      sx={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? 'text.secondary' : 'text.primary'
                      }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton 
                        edge="end" 
                        size="small"
                        onClick={() => navigate(`/task-lists/${taskList.id}/tasks/${task.id}/edit`)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        edge="end" 
                        size="small" 
                        color="error"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          ))
        )}
      </Box>
    </Container>
  );
} 