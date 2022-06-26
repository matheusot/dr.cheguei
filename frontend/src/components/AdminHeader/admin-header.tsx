import { Grid, Avatar, IconButton } from "@mui/material";
import { useState } from "react";
import { DrChegueiTitle, RoundedPrimaryButton } from "../../styles";
import { AppointmentDialog } from "../AppointmentDialog/appointment-dialog";



export const AdminHeader = (): React.ReactElement => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Grid container sx={{ justifyContent: "center" }}>
                <Grid
                    item
                >
                    <DrChegueiTitle variant="h3" mb={0}/>
                </Grid>
                <Grid item xs={4} sm={4} md={7} lg={7}></Grid>
                <Grid
                    item
                    xs={4} sm={4} md={3} lg={3}
                    sx={
                        {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap"
                        }
                    }
                >
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