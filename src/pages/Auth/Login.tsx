import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CircularProgress,
  Typography,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import {
  Form,
  required,
  TextInput,
  useTranslate,
  useLogin,
  useNotify,
} from 'react-admin';

interface FormValues {
  username?: string;
  password?: string;
}

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const translate = useTranslate();
  const notify = useNotify();
  const login = useLogin();
  const location = useLocation();

  const handleSubmit = (auth: FormValues) => {
    setLoading(true);
    login(
      auth,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      location.state ? (location.state as any).nextPathname : '/'
    ).catch((error: Error) => {
      setLoading(false);
      notify(
        typeof error === 'string'
          ? error
          : typeof error === 'undefined' || !error.message
            ? 'ra.auth.sign_in_error'
            : error.message,
        {
          type: 'error',
          messageArgs: {
            _: typeof error === 'string' ? error : error?.message,
          },
        }
      );
    });
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'flex-start',
          background: 'url(https://source.unsplash.com/featured/1600x900)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '2em' }}>
          <img
            src="https://via.placeholder.com/50x50.png?text=T"
            alt="Logo"
            style={{ height: 50, marginRight: 15 }}
          />
          <Typography variant="h4" sx={{ color: 'white' }}>
            trnr
          </Typography>
        </Box>

        <Card sx={{ minWidth: 300, marginTop: '2em' }}>
          <Box
            sx={{
              margin: '1em',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              <LockIcon />
            </Avatar>
          </Box>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex',
              justifyContent: 'center',
              color: (theme) => theme.palette.grey[500],
            }}
          >
            Hint: admin / admin123
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Box sx={{ marginTop: '1em' }}>
              <TextInput
                autoFocus
                source="username"
                label={translate('ra.auth.username')}
                disabled={loading}
                validate={required()}
              />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextInput
                source="password"
                label={translate('ra.auth.password')}
                type="password"
                disabled={loading}
                validate={required()}
              />
            </Box>
          </Box>
          <CardActions sx={{ padding: '0 1em 1em 1em' }}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={loading}
              fullWidth
            >
              {loading && <CircularProgress size={25} thickness={2} />}
              {translate('ra.auth.sign_in')}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Form>
  );
};

export default LoginPage;
