import { Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, IconButton, Tooltip } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { ReactElement, FormEvent, useState } from "react";
import { PrimaryButton } from "../../styles";

interface DrFormFields {
    photo: File | null | undefined;
    prefix: string;
    name: string;
    email: string;
    password: string;
}

const sendDrForm = (values: DrFormFields): void => {
    console.log(values);
}

export const DrForm = (): ReactElement => {
    const [photo, setPhoto] = useState<File | null | undefined>();
    const [prefix, setPrefix] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.id.includes("photo"))
            setPhoto(event.target.files?.item(0));
        else if (event.target.id.includes("prefix"))
            setPrefix(event.target.value);
        else if (event.target.id.includes("Name"))
            setName(event.target.value);
        else if (event.target.id.includes("Email"))
            setEmail(event.target.value);
        else
            setPassword(event.target.value);
    };

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <Tooltip title="Upload de foto" placement="right">
                    <IconButton sx={{ width: "125px", height: "125px", backgroundColor: "#E9E9E9" }} aria-label="Upload de foto" component="label">
                        <input id="photo" hidden accept="image/*" type="file" onChange={handleChange}/>
                        <AddPhotoAlternateIcon aria-label="Upload de foto" fontSize="large"/>
                    </IconButton>
                </Tooltip>
            </Box>
            <Box
                component="form"
                autoComplete="off"
                onSubmit={(event: FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    sendDrForm({ photo, prefix, name, email, password });
                }}
            >
                <FormControl onChange={handleChange}>
                    <FormLabel id="prefix-radio-group">Prefixo</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="prefix-radio-group"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="Dra." control={<Radio id="dra-prefix"/>} label="Dra."/>
                        <FormControlLabel value="Dr." control={<Radio id="dr-prefix"/>} label="Dr." />
                        
                    </RadioGroup>
                </FormControl>
                <Box 
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                    }}
                >
                <TextField
                    id="DrName"
                    label="Nome Completo"
                    variant="outlined"
                    margin="dense"
                    onChange={handleChange}
                />
                <TextField
                    id="DrEmail"
                    label="Email"
                    variant="outlined"
                    margin="dense"
                    type="email"
                    onChange={handleChange}
                />
                <TextField
                    id="DrPassword"
                    label="Senha"
                    variant="outlined"
                    margin="dense"
                    type="password"
                    onChange={handleChange}
                />
                </Box>
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
    )
}