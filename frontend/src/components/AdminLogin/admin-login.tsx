import axios from 'axios';
import { Box, TextField, Stack, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';
import { forwardRef, FormEvent, SyntheticEvent, ReactElement, useState, useEffect } from "react";
import { PrimaryButton } from "../../styles";
import { DrChegueiHeader } from "../DrChegueiHeader/dr-cheguei-header";
import { LoginGrid } from "../LoginGrid/login-grid";
import { useNavigate } from 'react-router-dom';
import { settings } from '../settings';

interface FormFields {
    username: string;
    password: string;
}

const authAdminUser = async (username: string, password: string) => {
    const authObj = { username, password };
    return await axios.post(`${settings.API_URL}/session`, authObj)
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        const res = err.response;
        return res.data;
    });
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AdminLogin = (): ReactElement => {

    const navigate = useNavigate();

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState<AlertColor>("error");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const sendLoginForm = async (values: FormFields) => {
        const authRes = await authAdminUser(values.username, values.password);
        if ("token" in authRes) {
            sessionStorage.setItem("token", authRes.token);
            setAlertMessage("Autenticado com sucesso!");
            setAlertSeverity("success");
            setAlertOpen(true);
            setTimeout(() => {
                navigate("/admin");
            }, 2000);
        } else {
            setAlertMessage("Usuário ou senha incorretos!");
            setAlertSeverity("error");
            setAlertOpen(true);
        }
    }

    const handleAlertClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.id === "adminUsername" ? setUsername(event.target.value) : setPassword(event.target.value);
    };

    useEffect(() => {
        const token = sessionStorage.getItem("token") || "";
        if (token !== "") {
            navigate("/admin");
        }
    }, []);

    return (
        <LoginGrid imageUrl="/adminImage.svg">
            <>
                <DrChegueiHeader
                    subtitle="Evite o desperdício de tempo no consultório sabendo exatamente quando seus pacientes chegaram."
                />
                <Box
                    component="form"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                    }}
                    autoComplete="off"
                    onSubmit={(event: FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        sendLoginForm({ username, password })
                    }}
                >
                    <TextField
                        id="adminUsername"
                        label="Usuário"
                        variant="outlined"
                        type="text"
                        required
                        margin="normal"
                        onChange={handleChange}
                        />
                    <TextField
                        id="adminPassword"
                        label="Senha"
                        variant="outlined"
                        type="password"
                        required
                        margin="normal"
                        onChange={handleChange}
                    />
                    <PrimaryButton
                        variant="contained"
                        size="large"
                        type="submit"
                        sx={{ marginTop: "10px" }}
                    >
                        Enviar
                    </PrimaryButton>   
                </Box>
                <Stack spacing={2} sx={{ width: '100%', height: 200 }}>
                    <Snackbar open={alertOpen} autoHideDuration={5000} onClose={handleAlertClose} sx={{
                        position: 'static',
                        height: '100%',
                    }}>
                        <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.2em',
                        }}>
                            {alertMessage}
                        </Alert>
                    </Snackbar>
                </Stack>
            </>
        </LoginGrid>
    )
}