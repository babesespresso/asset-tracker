import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Paper,
  InputAdornment,
  Divider,
  CircularProgress,
  Alert,
  Pagination
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import EmailIcon from '@mui/icons-material/Email';
import SecurityIcon from '@mui/icons-material/Security';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { getUsers, createUser, updateUser, deleteUser } from '../store/slices/usersSlice';

const MainContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#f8fafc',
  minHeight: '100vh',
}));

const UsersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error, pagination } = useSelector((state: RootState) => state.users);

  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    dispatch(getUsers({ page: 1, limit: 10, search: searchTerm }));
  }, [dispatch, searchTerm]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(getUsers({ page: value, limit: 10, search: searchTerm }));
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return { bgcolor: '#fee2e2', color: '#991b1b' };
      case 'manager': return { bgcolor: '#fef3c7', color: '#92400e' };
      case 'user': return { bgcolor: '#dcfce7', color: '#166534' };
      default: return { bgcolor: '#f1f5f9', color: '#475569' };
    }
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? { bgcolor: '#dcfce7', color: '#166534' } : { bgcolor: '#fee2e2', color: '#991b1b' };
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, user: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleOpenDialog = (user?: any) => {
    if (user) {
      setIsEditMode(true);
      setFormData(user);
    } else {
      setIsEditMode(false);
      setFormData({});
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    if (isEditMode) {
      dispatch(updateUser({ id: formData.id, userData: formData }));
    } else {
      dispatch(createUser(formData));
    }
    handleCloseDialog();
  };

  const handleDelete = () => {
    if (selectedUser) {
      dispatch(deleteUser(selectedUser.id));
      handleMenuClose();
    }
  };

  return (
    <MainContent>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
            User Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage user accounts, roles, and permissions
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<UploadIcon />} size="small">Import</Button>
          <Button variant="outlined" startIcon={<DownloadIcon />} size="small">Export</Button>
          <Button variant="contained" startIcon={<PersonAddIcon />} onClick={() => handleOpenDialog()}>Add User</Button>
        </Stack>
      </Stack>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
            <TextField
              fullWidth
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ maxWidth: { md: 400 } }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
              {pagination.total} users found
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      <Card>
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper} elevation={0}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell width={50}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar src={user.avatar} sx={{ width: 40, height: 40 }}>{user.name.charAt(0)}</Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">{user.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{user.email}</Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip label={user.role} size="small" sx={{ ...getRoleColor(user.role), fontWeight: 500, fontSize: '0.75rem' }} />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{user.department}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={user.isActive ? 'Active' : 'Inactive'} size="small" sx={{ ...getStatusColor(user.isActive), fontWeight: 500, fontSize: '0.75rem' }} />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}</Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={(e) => handleMenuClick(e, user)}>
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack alignItems="center" sx={{ p: 2 }}>
            <Pagination count={pagination.pages} page={pagination.page} onChange={handlePageChange} />
          </Stack>
        </CardContent>
      </Card>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => { handleOpenDialog(selectedUser); handleMenuClose(); }}><EditIcon sx={{ mr: 1, fontSize: 16 }} />Edit User</MenuItem>
        <MenuItem onClick={handleMenuClose}><EmailIcon sx={{ mr: 1, fontSize: 16 }} />Send Email</MenuItem>
        <MenuItem onClick={handleMenuClose}><SecurityIcon sx={{ mr: 1, fontSize: 16 }} />Reset Password</MenuItem>
        <MenuItem onClick={handleDelete}><BlockIcon sx={{ mr: 1, fontSize: 16 }} />{selectedUser?.isActive ? 'Deactivate' : 'Activate'}</MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}><DeleteIcon sx={{ mr: 1, fontSize: 16 }} />Delete User</MenuItem>
      </Menu>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditMode ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField name="name" fullWidth label="Full Name" required value={formData.name || ''} onChange={handleFormChange} />
            <TextField name="email" fullWidth label="Email Address" type="email" required value={formData.email || ''} onChange={handleFormChange} />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select name="role" label="Role" value={formData.role || 'user'} onChange={handleFormChange as any}>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="admin">Administrator</MenuItem>
              </Select>
            </FormControl>
            <TextField name="department" fullWidth label="Department" value={formData.department || ''} onChange={handleFormChange} />
            {!isEditMode && <TextField name="password" fullWidth label="Password" type="password" required onChange={handleFormChange} />}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleFormSubmit}>{isEditMode ? 'Save Changes' : 'Add User'}</Button>
        </DialogActions>
      </Dialog>
    </MainContent>
  );
};

export default UsersPage;
