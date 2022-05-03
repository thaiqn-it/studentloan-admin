import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { loginUser } from '../../../context/AdminAction'
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAuthDispatch } from '../../../context/AuthContext';
import { getFirebaseToken } from '../../../firebase';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isErr,setIsErr] = useState(false)
  const [pushToken, setPushToken] = useState(null)
  getFirebaseToken(setPushToken)

  const dispatch = useAuthDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const userRes = await loginUser(dispatch,email, password,pushToken)
      if (userRes.status === 200 || userRes.data) {
        navigate('/dashboard')
      }
    }
    catch (e) {
      setIsErr(true)
    }
  }

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
    password: Yup.string().required('Mật khẩu không được để trống')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched} = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleLogin}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type="email"
            label="Email"
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Mật khẩu"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ my: 2 }}>
          {isErr===true? <>
            <Typography variant='caption' color='error'>Sai tên tài khoản/mật khẩu!</Typography>
          </> : <></>}
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Đăng nhập
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
