import axios from 'axios';
import { Box, Grid, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { DrChegueiText } from "../../styles";
import { AdminHeader } from "../AdminHeader/admin-header";
import { DrChegueiCalendar } from "../DrChegueiCalendar/dr-cheguei-calendar";
import { DrChegueiToast } from "../Toast/dr-cheguei-toast";

const APIURL = "http://localhost:4000";
//const APIURL = "https://dr-cheguei.herokuapp.com";

const testeAlertData = {
    hc: "HC 78945",
    name: "Doutor Xama Menorrrrrrrrrrrr",
    date: "",
    status: "Confirmada!",
    description: "hoje, 27 de maio às 08h",
}

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
    const [date, setSelectedDate] = useState<Date>(new Date());
    const [appointmentsArray, setAppointmentsArray] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(true);

    const getAppointments = async () => {
        console.log("getAppointments");
        const config = { "headers": { "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInR5cGUiOjIsImRvYyI6IjIyMjMxOCIsIm5hbWUiOiJNYXRoZXVzIFJvZHJpZ3VlcyIsInVzZXJuYW1lIjoibWF0aGV1cyIsImVtYWlsIjoibTIyMjMxOEBkYWMudW5pY2FtcC5iciIsInBob25lIjoiMTkgOTg0MDUtNzQ0NyIsImxhc3RfbG9naW4iOiIyMDIyLTA2LTEwVDEwOjQ4OjQwLjAwMFoiLCJjcmVhdGlvbl9kYXRlIjoiMjAyMi0wNi0wMVQxMDoxMTo0OS4wMDBaIiwiaWF0IjoxNjU3NzU3MTg0fQ.FwXfhZDJnGkNLp6oi6z5g6rhlIMmCx6-DeUP-KuDCG8" } };
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
    
    const convertIsoDateToDateString = (dateStr: string) => {
        const date = new Date(dateStr); 
        return date.toLocaleString("pt-br", 
            { weekday: "long", year: 'numeric', month: "long", day: 'numeric' }
        );
    }

    console.log(date);

    useEffect(() => {
        const getAppts = async () => {
            let appointments = await getAppointments();
            for (let i = 0; i < appointments.length; i++) {
                appointments[i].hc = `Dr. ` + appointments[i].doctor_name;
                appointments[i].name = "HC-" + appointments[i].appointment_HC;
                appointments[i].date = "";
                appointments[i].status = appointments[i].appointment_status_name;
                appointments[i].description = convertIsoDateToDateString(appointments[i].appointment_schedule);
            }
            if (appointments.length == 0) {
                appointments.push({
                    name: "Nenhuma consulta encontrada",
                })
            }
            setAppointmentsArray(appointments);
        }
        getAppts();
    }, [date]);
    
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
                                        isOpen={openSnackbar}
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
        </Box>
    );
};
