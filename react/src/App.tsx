import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/user/Profile';
import TaskList from './pages/tasks/TaskList';
import TaskForm from './pages/tasks/TaskForm';
import TaskListForm from './pages/tasks/TaskListForm';
import SharedLists from './pages/tasks/SharedLists';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/shared-lists" element={<SharedLists />} />
          <Route path="/task-lists/new" element={<TaskListForm />} />
          <Route path="/task-lists/:listId/edit" element={<TaskListForm />} />
          <Route path="/task-lists/:listId/tasks/new" element={<TaskForm />} />
          <Route path="/task-lists/:listId/tasks/:taskId/edit" element={<TaskForm />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
