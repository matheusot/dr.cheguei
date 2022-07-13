import { Grid, Avatar, IconButton } from "@mui/material";
import { useState } from "react";
import { DrChegueiTitle, RoundedPrimaryButton, RoundedSecondaryButton } from "../../styles";
import { AppointmentDialog } from "../AppointmentDialog/appointment-dialog";
import { UpdateProfileDialog } from "../UpdateProfileDialog/update-profile-dialog";


export const AdminHeader = (): React.ReactElement => {
    const [openUpdateProfileDialog, setOpenUpdateProfileDialog] = useState(false);
    const [openAppointmentDialog, setAppointmentDialog] = useState(false);

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
                    <RoundedPrimaryButton variant="contained" size="small" onClick={() => setAppointmentDialog(true)}>Marcar Consulta</RoundedPrimaryButton>
                    <IconButton aria-label="Perfil" onClick={() => setOpenUpdateProfileDialog(true)}>
                        <Avatar alt="Perfil">D</Avatar>
                    </IconButton>
                </Grid>
            </Grid>
            <AppointmentDialog open={openAppointmentDialog} setOpenFunction={setAppointmentDialog}/>
            <UpdateProfileDialog open={openUpdateProfileDialog} setOpenFunction={setOpenUpdateProfileDialog}/>
        </>
    )
}