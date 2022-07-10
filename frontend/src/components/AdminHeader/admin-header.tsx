import { Grid, Avatar, IconButton } from "@mui/material";
import { useState } from "react";
import { DrChegueiTitle, RoundedPrimaryButton, RoundedSecondaryButton } from "../../styles";
import { AppointmentDialog } from "../AppointmentDialog/appointment-dialog";


export const AdminHeader = (): React.ReactElement => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Grid container sx={{ justifyContent: "center" }} mb={6}>
                <Grid item>
                    <DrChegueiTitle variant="h3" mb={0}/>
                </Grid>
                <Grid item lg></Grid>
                <Grid
                    item
                    lg
                    sx={
                        {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            flexWrap: "wrap"
                        }
                    }
                >
                    <RoundedSecondaryButton variant="contained" size="small">Cadastrar Médico</RoundedSecondaryButton>
                    <RoundedPrimaryButton variant="contained" size="small" onClick={() => setOpen(true)}>Marcar Consulta</RoundedPrimaryButton>
                    <IconButton aria-label="Perfil">
                        <Avatar alt="Perfil">D</Avatar>
                    </IconButton>
                </Grid>
            </Grid>
            <AppointmentDialog open={open} setOpenFunction={setOpen}/>
        </>
    )
}