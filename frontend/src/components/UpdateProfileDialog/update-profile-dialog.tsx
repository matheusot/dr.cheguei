import { useState, forwardRef, ReactElement, FormEvent } from "react";
import { Box, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Slide, TextField, Tooltip } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { DialogPaper, PrimaryButton } from "../../styles";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface UpdateProfileDialogProps {
    open: boolean
    setOpenFunction: Function
}

interface UpdateProfileDialogFormFields {
    photo: File | null | undefined;
    prefix: string;
    name: string;
    email: string;
    password: string;
}

const sendUpdateProfileForm = (values: UpdateProfileDialogFormFields): void => {
    console.log(values);
}

export const UpdateProfileDialog = ({ open, setOpenFunction }: UpdateProfileDialogProps): ReactElement => {

    const [photo, setPhoto] = useState<File | null | undefined>();
    const [prefix, setPrefix] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        console.log(event);
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
        <Dialog
            open={open}
            onClose={() => setOpenFunction(false)}
            TransitionComponent={Transition}   
            fullWidth 
            PaperComponent={DialogPaper}
        >
            <DialogContent sx={{ display: "flex", flexDirection: "column", padding: "3rem 2rem 3rem 2rem" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }} mb={5}>
                    <DialogTitle variant="h3" fontWeight={1000} sx={{ padding: 0, paddingBottom: "16px" }}>Atualizar Cadastro</DialogTitle>
                    <Box>
                        <IconButton
                            aria-label="Fechar"
                            onClick={() => setOpenFunction(false)}
                        >
                            <CloseIcon aria-label="Fechar"/>
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <Tooltip title="Atualizar Foto" placement="right">
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
                        sendUpdateProfileForm({ photo, prefix, name, email, password });
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
            </DialogContent>
        </Dialog>
    )
}