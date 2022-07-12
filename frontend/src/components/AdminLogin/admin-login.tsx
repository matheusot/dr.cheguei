import { Box, TextField } from "@mui/material"
import { FormEvent, ReactElement, useState } from "react"
import { PrimaryButton } from "../../styles"
import { DrChegueiHeader } from "../DrChegueiHeader/dr-cheguei-header"
import { LoginGrid } from "../LoginGrid/login-grid"

interface formFields {
    email: string;
    password: string;
}

const sendLoginForm = (values: formFields): void => {
    
}

export const AdminLogin = (): ReactElement => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.id === "adminEmail" ? setEmail(event.target.value) : setPassword(event.target.value);
    };

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
                        sendLoginForm({ email, password })
                    }}
                >
                    <TextField
                        id="adminEmail"
                        label="Email"
                        variant="outlined"
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
            </>
        </LoginGrid>
    )
}