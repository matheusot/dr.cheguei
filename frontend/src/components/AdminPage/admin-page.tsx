import axios from 'axios';
import { Box, Grid, Stack, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { DrChegueiText } from "../../styles";
import { AdminHeader } from "../AdminHeader/admin-header";
import { DrChegueiCalendar } from "../DrChegueiCalendar/dr-cheguei-calendar";
import { DrChegueiToast } from "../Toast/dr-cheguei-toast";
import { useNavigate } from 'react-router-dom';

const APIURL = "http://localhost:4000";
//const APIURL = "https://dr-cheguei.herokuapp.com";
const UPDATE_INTERVAL = 10 * 1000;

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
    const [appointmentsArray, setAppointmentsArray] = useState([]);

    const getAppointments = async () => {
        const token = sessionStorage.getItem("token") || "";
        const config = { "headers": { "Authorization": token } };
        const formattedDate = [
            date.getFullYear(),
            ('0' + (date.getMonth() + 1)).slice(-2),
            ('0' + date.getDate()).slice(-2)
        ].join('-');
        return await axios.get(`${APIURL}/appointment?date=${formattedDate}&all`, config)
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

        console.log(appointmentsOrdered);
        if (appointmentsOrdered.length == 0) {
            appointmentsOrdered.push({
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
    
    const convertIsoDateToDateString = (dateStr: string) => {
        const date = new Date(dateStr); 
        return date.toLocaleString("pt-br", 
            { weekday: "long", year: 'numeric', month: "long", day: 'numeric' }
        );
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

    /* Update every X seconds */
    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), UPDATE_INTERVAL);
        return () => {
          clearInterval(interval);
        };
    }, []);
    
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
                                        setIsOpen={() => {}}
                                    />
                                )
                            })
                        }  
                    </Stack>
                </Grid>

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
