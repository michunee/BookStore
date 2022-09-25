import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = { email, password };
        if (user.email === "") {
            setError('Vui lòng nhập email');
        } else if (user.password === "") {
            setError('Vui lòng nhập mật khẩu');
        } else if (user.email === "tinhuynh2001@gmail.com" && user.password === "123456") {
            navigate('/');
        }
        else {
            setError('Email hoặc mật khẩu không đúng');
        }

    };

    const checkRememberPassWord = (event) => {
        if (event.target.checked) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
        }
        else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
        }
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Đăng nhập
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Địa chỉ email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Typography variant="body2" color="error" sx={{ ml: 1, mb: 1 }}>
                        {error}
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mật khẩu"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" onChange={checkRememberPassWord} />}
                        label="Ghi nhớ đăng nhập"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Đăng nhập
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Quên mật khẩu?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Chưa có tài khoản? Đăng ký ngay"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );

    // return (
    //     <Container component="main" maxWidth="xs">
    //         <CssBaseline />
    //         <Box
    //             sx={{
    //                 marginTop: 8,
    //                 display: 'flex',
    //                 flexDirection: 'column',
    //                 alignItems: 'center',
    //             }}
    //         >
    //             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
    //                 <LockOutlinedIcon />
    //             </Avatar>
    //             <Typography component="h1" variant="h5">
    //                 Sign in
    //             </Typography>
    //             <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
    //                 <TextField
    //                     margin="normal"
    //                     required
    //                     fullWidth
    //                     id="email"
    //                     label="Email Address"
    //                     name="email"
    //                     autoComplete="email"
    //                     autoFocus
    //                 />
    //                 <TextField
    //                     margin="normal"
    //                     required
    //                     fullWidth
    //                     name="password"
    //                     label="Password"
    //                     type="password"
    //                     id="password"
    //                     autoComplete="current-password"
    //                 />
    //                 <FormControlLabel
    //                     control={<Checkbox value="remember" color="primary" />}
    //                     label="Remember me"
    //                 />
    //                 <Button
    //                     type="submit"
    //                     fullWidth
    //                     variant="contained"
    //                     sx={{ mt: 3, mb: 2 }}
    //                     onClick={() => navigate('/')}
    //                 >
    //                     Sign In
    //                 </Button>
    //                 <Grid container>
    //                     <Grid item xs>
    //                         <Link href="#" variant="body2">
    //                             Forgot password?
    //                         </Link>
    //                     </Grid>
    //                     <Grid item>
    //                         <Link href="#" variant="body2">
    //                             {"Don't have an account? Sign Up"}
    //                         </Link>
    //                     </Grid>
    //                 </Grid>
    //             </Box>
    //         </Box>
    //     </Container>
    // );
}

export default SignIn;