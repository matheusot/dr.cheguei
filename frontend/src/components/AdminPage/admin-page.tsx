import axios from 'axios';
import { Box, Grid, Stack, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState, useEffect } from "react";
import { DrChegueiText } from "../../styles";
import { AdminHeader } from "../AdminHeader/admin-header";
import { DrChegueiCalendar } from "../DrChegueiCalendar/dr-cheguei-calendar";
import { DrChegueiToast } from "../Toast/dr-cheguei-toast";
import { useNavigate } from 'react-router-dom';
import { settings } from '../settings';
import React from 'react'

const getDateString = (date: Date | unknown): string => {
    let text;
    if (date instanceof Date)
        text = date.toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "2-digit"});
    else
        text = (new Date()).toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "2-digit"});
    
    text = text.split("");
    text[0] = text[0].toUpperCase();
    return text.join("");
}

const gridCss = {
    maxHeight: window.innerHeight - 200,
    overflowY: "auto",
    paddingTop: "0 !important",
    paddingRight: "20px",
    paddingBottom: "20px",
    "&::-webkit-scrollbar-track": {
        backgroundColor: "#F5F5F5"
    },
    "&::-webkit-scrollbar": {
        width: "8px",
        backgroundColor: "#F5F5F5"
    },
    "&::-webkit-scrollbar-thumb": {
        borderRadius: "10px",
        backgroundColor: "#BA2121",
        "&:hover": {
            backgroundColor: "#c82121",
        }
    }
}

export const AdminPage = (): React.ReactElement => {

    const navigate = useNavigate();

    const [date, setSelectedDate] = useState<Date>(new Date());
    const [time, setTime] = useState(Date.now());
    const [appointmentsArray, setAppointmentsArray] = useState<any[]>([]);

    const getAppointments = async () => {
        const token = sessionStorage.getItem("token") || "";
        const config = { "headers": { "Authorization": token } };
        const formattedDate = [
            date.getFullYear(),
            ('0' + (date.getMonth() + 1)).slice(-2),
            ('0' + date.getDate()).slice(-2)
        ].join('-');
        return await axios.get(`${settings.API_URL}/appointment?date=${formattedDate}`, config)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            const res = err.response;
            return res.data;
        });
    }

    const loadAppointments = (appointments: any) => {
        const appointmentsNotConfirmed = [];
        const appointmentsConfirmed = [];
        const appointmentsFinished = [];
        const appointmentsError = [];

        for (let i = 0; i < appointments.length; i++) {
            const appointment = {
                id: appointments[i].appointment_id,
                hc: "Dr(a). " + appointments[i].doctor_name,
                name: "HC-" + appointments[i].appointment_HC,
                date: "",
                status: appointments[i].appointment_status_name,
                description: formatDateToBrFormat(new Date(appointments[i].appointment_schedule).getTime()),
                appointment_schedule: new Date(appointments[i].appointment_schedule).getTime()
            };
            if (appointments[i].appointment_status == 1) {
                appointmentsNotConfirmed.push(appointment);
            }
            else if (appointments[i].appointment_status == 2) {
                appointmentsConfirmed.push(appointment);
            }
            else if (appointments[i].appointment_status == 3) {
                appointmentsFinished.push(appointment);
            }
            else {
                appointmentsError.push(appointment);
            }
        }

        appointmentsNotConfirmed.sort((a,b) => a.appointment_schedule - b.appointment_schedule);
        appointmentsConfirmed.sort((a,b) => a.appointment_schedule - b.appointment_schedule);
        appointmentsFinished.sort((a,b) => a.appointment_schedule - b.appointment_schedule);
        appointmentsError.sort((a,b) => a.appointment_schedule - b.appointment_schedule);

        const appointmentsOrdered : any = [...appointmentsConfirmed, ...appointmentsNotConfirmed, ...appointmentsFinished, ...appointmentsError];

        if (appointmentsOrdered.length == 0) {
            appointmentsOrdered.push({
                id: 0,
                hc: "",
                name: "Nenhuma consulta encontrada",
                date: "",
                status: "",
                description: "",
                appointment_schedule: 0
            })
        }

        setAppointmentsArray(appointmentsOrdered);
    }

    const formatDateToBrFormat = (dateNum: number) => {
        const date = new Date(dateNum);
        const tzOffset = date.getTimezoneOffset() * 60000; //offset in milliseconds        
        const stringDate = new Date((dateNum - tzOffset)).toISOString().replace(/\..+/, "").replace(/T/, "-");
        const stringDateSplitted = stringDate.split("-");
        const formattedString = stringDateSplitted[2] + "/" + stringDateSplitted[1] + "/" + stringDateSplitted[0] + " " + stringDateSplitted[3];
        return formattedString;
    }

    useEffect(() => {
        const getAppts = async () => {
            let appointments = await getAppointments();
            loadAppointments(appointments);
        }
        getAppts();
    }, [date, time]);

    /* Update every REACT_APP_ADMIN_REFRESH_INTERVAL milis */
    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), settings.ADMIN_REFRESH_INTERVAL);
        return () => {
          clearInterval(interval);
        };
    }, []);


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [lastAppointmentIdClicked, setLastAppointmentIdClicked] = useState<string>("");

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        const htmlElement = event.currentTarget as HTMLElement;
        const appointmentId = htmlElement.dataset.appointment || "";
        setLastAppointmentIdClicked(appointmentId);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setLastAppointmentIdClicked("");
        setAnchorEl(null);
    };

    const updateAppointment = async (statusId: number) => {

        const token = sessionStorage.getItem("token") || "";

        const config = { "headers": { "Authorization": token } };
        await axios.put(`${settings.API_URL}/appointment/${lastAppointmentIdClicked}/status/${statusId}`, {}, config)
        .then((res) => {
            setTime(Date.now());
        })
        .catch((err) => {
            console.log(err);
        });

        handleClose()
    }
     
    const deleteAppointment = async () => {
        const token = sessionStorage.getItem("token") || "";
        const config = { "headers": { "Authorization": token } };
        await axios.delete(`${settings.API_URL}/appointment/${lastAppointmentIdClicked}`, config)
        .then((res) => {
            setTime(Date.now());
        })
        .catch((err) => {
            console.log(err);
        });

        handleClose()
    }

    return (
        <Box sx={{ padding: "4rem 4rem 0 4rem" }}>

            <Box>
                <AdminHeader />
            </Box>

            <DrChegueiText variant="body2" align="left" mt={2} mb={6}>
                { getDateString(date) }
            </DrChegueiText>

            <Grid item container spacing={4} id="grid">
                
                <Grid item md={6} lg={6} sx={gridCss}>
                    <Stack spacing={2}>
                        {
                            appointmentsArray.map((listItem, index) => {
                                return (
                                    <DrChegueiToast
                                        key={index}
                                        data={listItem}
                                        isOpen={true}
                                        action={
                                            listItem.id != 0 ?
                                            <>
                                                <IconButton
                                                    data-appointment={listItem.id}
                                                    size="small"
                                                    aria-label="more"
                                                    id="long-button"
                                                    aria-controls={open ? 'long-menu' : undefined}
                                                    aria-expanded={open ? 'true' : undefined}
                                                    aria-haspopup="true"
                                                    onClick={handleClick}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                            </>
                                            :
                                            false
                                        }
                                        setIsOpen={() => {}}
                                    />
                                )
                            })
                        }  
                    </Stack>
                </Grid>

                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem key="confirmar" onClick={() => updateAppointment(2)}>
                        Confirmar Presença
                    </MenuItem>
                    <MenuItem key="finalizar" onClick={() => updateAppointment(3)}>
                        Finalizar Consulta
                    </MenuItem>
                    <MenuItem key="cancelar" onClick={() => updateAppointment(5)}>
                        Cancelar Consulta
                    </MenuItem>
                    <MenuItem key="faltou" onClick={() => updateAppointment(6)}>
                        Paciente Faltou
                    </MenuItem>
                    <MenuItem key="delete" onClick={deleteAppointment}>
                        Apagar Consulta
                    </MenuItem>
                </Menu>

                <Grid item md={6} lg={6} sx ={{ paddingTop: "0 !important" }}>
                    <DrChegueiCalendar
                        selectedDate={date}
                        setSelectedDate={setSelectedDate}
                    />
                </Grid>

            </Grid>

            <DrChegueiText variant="body1" align="left" sx={{ fontSize: '1em', display: 'block', position: 'fixed', right: '50px', bottom: '50px' }}>
                Última atualização: { formatDateToBrFormat(time) }
            </DrChegueiText>
        </Box>
    );
};
