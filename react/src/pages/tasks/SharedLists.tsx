import { useEffect, useState } from 'react';
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

// Define types for the API response
interface Task {
    id: number;
    task_list_id: number;
    title: string;
    description: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
}

interface SharedListPivot {
    user_id: number;
    task_list_id: number;
    permission: 'view' | 'edit';
    created_at: string;
    updated_at: string;
}

interface SharedList {
    id: number;
    user_id: number;
    name: string;
    created_at: string;
    updated_at: string;
    pivot: SharedListPivot;
    tasks: Task[];
}

export default function SharedLists() {
    
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [sharedLists, setSharedLists] = useState<SharedList[]>([]);

    // Fetch shared lists from the API
    const fetchSharedLists = async (): Promise<void> => {
        try {
            const response = await api.get<SharedList[]>('/shared-lists');
            setSharedLists(response.data);
        } catch (error) {
            console.error('Error fetching shared lists:', error);
        } finally {
            setLoading(false);
        }
    };

    // Toggle task completion status
    const handleToggleTask = async (taskId: number): Promise<void> => {
        try {
            await api.patch(`/tasks/${taskId}/toggle`);
            fetchSharedLists(); // Refresh the lists
        } catch (error) {
            console.error('Error toggling task:', error);
        }
    };

    useEffect(() => {
        fetchSharedLists();
    }, []);

    return (
        <>
            <Container maxWidth="md">
                <Box sx={{ mt: 4, mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h4" component="h1">
                            My Shared Lists
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
                        <Button variant="contained" sx={{ my: 2 }} onClick={() => navigate('/tasks')}>View Tasks</Button>
                    </Box>

                    {sharedLists?.length == 0 && !loading && (

                        <Typography variant="h6">No Shared Tasks Found</Typography>

                    )}

                    {loading ? (
                        <CircularProgress />
                    ) : (
                        sharedLists.map((taskList) => (
                            <Paper key={taskList.id} sx={{ mb: 3, p: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="h6">{taskList.name}</Typography>
                                    <Box>
                                        {
                                            taskList?.pivot?.permission === 'edit' && (

                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => navigate(`/task-lists/${taskList.id}/edit`)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            )
                                        }
                                    </Box>
                                </Box>
                                <Divider sx={{ mb: 2 }} />
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
                                                    disabled={!(taskList.pivot.permission == 'edit')}
                                                    onClick={() => navigate(`/task-lists/${taskList.id}/tasks/${task.id}/edit`)}
                                                >
                                                    <EditIcon fontSize="small" />
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
        </>
    )
}
