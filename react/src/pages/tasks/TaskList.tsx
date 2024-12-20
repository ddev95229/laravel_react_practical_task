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
  Button,
  Modal,
  TextField,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';

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
  const [loading, setLoading] = useState<boolean>(true);

  // Sharing modal state
  const [openShareModal, setOpenShareModal] = useState<boolean>(false);
  const [shareTaskListId, setShareTaskListId] = useState<number | null>(null);
  const [username, setUsername] = useState<string>('');
  const [permission, setPermission] = useState<'view' | 'edit'>('view');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchTaskLists();
  }, []);

  const fetchTaskLists = async (): Promise<void> => {
    try {
      const response = await api.get<TaskList[]>('/task-lists');
      const lists = response.data.map((list) => ({
        ...list,
        tasks: list.tasks,
      }));
      setTaskLists(lists);
    } catch (error) {
      console.error('Error fetching task lists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (taskId: number): Promise<void> => {
    try {
      await api.patch(`/tasks/${taskId}/toggle`);
      fetchTaskLists(); // Refresh the lists
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const handleDeleteTask = async (taskId: number): Promise<void> => {
    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTaskLists();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleDeleteTaskList = async (listId: number): Promise<void> => {
    try {
      await api.delete(`/task-lists/${listId}`);
      fetchTaskLists();
    } catch (error) {
      console.error('Error deleting task list:', error);
    }
  };

  const handleOpenShareModal = (taskListId: number): void => {
    setShareTaskListId(taskListId);
    setOpenShareModal(true);
  };

  const handleCloseShareModal = (): void => {
    setOpenShareModal(false);
    setShareTaskListId(null);
    setUsername('');
    setPermission('view');
    setError('');
  };

  const handleShareTaskList = async (): Promise<void> => {
    if (!username) {
      setError('Username is required.');
      return;
    }

    try {
      await api.post(`/task-lists/${shareTaskListId}/share`, {
        username,
        permission,
      });

      handleCloseShareModal();
      alert('Task list shared successfully!');
    } catch (err: unknown) {
      if (err instanceof Error) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        setError(
          axiosError.response?.data?.message || 'An error occurred while sharing.'
        );
      }
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
        <Box>
          <Button variant="contained" sx={{ my: 2 }} onClick={() => navigate('/shared-lists')}>View Shared Listing</Button>
        </Box>

        {taskLists.length == 0 && !loading && (

          <Typography variant="h6">No Tasks Found</Typography>

        )}

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
                    color="primary"
                    onClick={() => handleOpenShareModal(taskList.id)}
                  >
                    <ShareIcon />
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

      {/* Share Modal */}
      <Modal open={openShareModal} onClose={handleCloseShareModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          p: 4,
          boxShadow: 24,
          borderRadius: 1,
        }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Share Task List
          </Typography>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            select
            label="Permission"
            value={permission}
            onChange={(e) => setPermission(e.target.value)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="view">View</MenuItem>
            <MenuItem value="edit">Edit</MenuItem>
          </TextField>
          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Button variant="contained" onClick={handleShareTaskList} sx={{ mr: 2 }}>
            Share
          </Button>
          <Button variant="outlined" onClick={handleCloseShareModal}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </Container>
  );
} 