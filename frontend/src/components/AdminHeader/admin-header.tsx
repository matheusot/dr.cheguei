import axios from 'axios';
import { Grid, Avatar, AvatarGroup, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { DrChegueiTitle, RoundedPrimaryButton, RoundedSecondaryButton } from "../../styles";
import { AppointmentDialog } from "../AppointmentDialog/appointment-dialog";
import { UpdateProfileDialog } from "../UpdateProfileDialog/update-profile-dialog";
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const APIURL = "http://localhost:4000";
//const APIURL = "https://dr-cheguei.herokuapp.com";

const getUserData = async () => {
    const token = sessionStorage.getItem("token") || "";
    const config = { "headers": { "Authorization": token } };
    return await axios.get(`${APIURL}/user`, config)
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        const res = err.response;
        return res.data;             
    });
}

export const AdminHeader = (): React.ReactElement => {

    const navigate = useNavigate();

    const [openUpdateProfileDialog, setOpenUpdateProfileDialog] = useState(false);
    const [openAppointmentDialog, setAppointmentDialog] = useState(false);
    const [user, setUser] = useState({
        id: "",
        type: NaN,
        name: "",
        username: ""
    });

    useEffect(() => {
        const getData = async () => {
            let userData = await getUserData();
            if ("userInfo" in userData) {
                setUser({
                    id: userData.userInfo.id,
                    type: userData.userInfo.type,
                    name: userData.userInfo.name,
                    username: userData.userInfo.username
                });
            } else {
                sessionStorage.removeItem("token");
                navigate("/admin/login");
            }
        }
        getData();
    }, []);

    const logout = () => {
        sessionStorage.removeItem("token");
        navigate("/admin/login");
    }

    return (
        <>
            <Grid container sx={{ justifyContent: "center" }} mb={6}>
                <Grid item>
                    <DrChegueiTitle variant="h3" mb={0}/>
                </Grid>
                <Grid item lg
                    sx={
                        {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            flexWrap: "wrap"
                        }
                    }
                >
                    {/* TODO: cadastro de médicos
                    <RoundedSecondaryButton variant="contained" size="small" sx={{ marginRight: '10px' }}>Cadastrar Médico</RoundedSecondaryButton>
                    */}
                    <RoundedPrimaryButton variant="contained" size="small" onClick={() => setAppointmentDialog(true)}>Marcar Consulta</RoundedPrimaryButton>
                    {/* TODO: atualizar perfil 
                    <IconButton aria-label="Perfil" onClick={() => setOpenUpdateProfileDialog(true)}>
                        <Avatar alt="Perfil">
                            { user.name.charAt(0).toUpperCase() }
                        </Avatar>
                    </IconButton> */}

                    <AvatarGroup max={4} sx={{marginLeft: '10px'}}>
                        <Avatar sx={{ cursor: "pointer" }}>
                                { user.name.charAt(0).toUpperCase() }
                        </Avatar>
                        <Avatar sx={{ bgcolor: "#BA2121", cursor: "pointer" }} onClick={() => { logout() }}>
                            <LogoutIcon/>
                        </Avatar>
                    </AvatarGroup>
                </Grid>
            </Grid>
            <AppointmentDialog open={openAppointmentDialog} setOpenFunction={setAppointmentDialog}/>
            <UpdateProfileDialog open={openUpdateProfileDialog} setOpenFunction={setOpenUpdateProfileDialog}/>
        </>
    )
}