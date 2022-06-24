import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { PrimaryButton, SecondaryButton } from '../../styles';
import { Toast } from '../Toast/toast';
import { Header } from '../DrChegueiHeader/dr-cheguei-header';
import { SegmentedTextField } from '../SegmentedTextField/segmented-text-field';
import { BasePage } from '../BasePage/base-page';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Home = (): React.ReactElement => {

    const APIURL = "http://localhost:4000";

    const navigate = useNavigate();

    const HCLength = 5;
   
    const [errorMessage, setErrorMessage] = React.useState("");
    const changeErrorMessage = (text: string) => {
        setErrorMessage((errorMessage) => errorMessage = text);
    }

    const [visible, setVisible] = React.useState(false);
    const changeVisibleState = () => {
        setVisible((visible) => !visible);
    }

    const [alertOpen, setAlertOpen] = React.useState(false);
    const handleAlertClick = () => {
        setAlertOpen(true);
    };
    const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };

    const [toastHCText, setToastHCText] = React.useState("");
    const [toastDoctorName, setToastDoctorName] = React.useState("");
    const [toastAppointmentDate, setToastAppointmentDate] = React.useState("");

    async function clickCheckinButton() {
        let hcText = "";
        const inputs = document.querySelectorAll(".hc-text input");
        inputs.forEach((el) => {
            const input = el as HTMLInputElement;
            hcText += input.value;
        });

        if (hcText.length < HCLength) {
            changeErrorMessage("Preencha o HC por completo!");
            setAlertOpen(true);
            return
        }
        setToastHCText("HC-" + hcText);

        let reqData = {
            hc: "",
            token: ""
        };
        console.log("API Session");
        
        await axios.post(`${APIURL}/session`, { "hc": hcText })
        .then((res) => {
            if (res.status == 200) {
                reqData = res.data;
            }
            console.log("API Session Done");
        })
        .catch((err) => {
            const res = err.response;
            if (res.status == 401) {
                console.log(res.data.msg)
            }
            console.log("API Session Done");
            console.error(err);
            return
        });

        console.log(reqData);

        console.log("API Appointment");

        await axios.get(`${APIURL}/appointment?checkin=true`, {
            headers: {
                "Authorization": reqData.token
            }
        })
        .then((res) => {
            if (res.status == 200) {
                setToastDoctorName(res.data.doctor_name);
                console.log(res.data.appointment_schedule)
                let date = new Date(res.data.appointment_schedule); 
                console.log(date)
                setToastAppointmentDate(date.toLocaleString("pt-br",
                    { weekday: "long", year: 'numeric', month: "long", day: 'numeric' }))
            }
            console.log("API Appoint Done");
        })
        .catch((err) => {
            const res = err.response;
            if (res.status == 401) {
                console.log(res.data.msg)
            }
            console.error(err);
            console.log("API Appoint Done");
        })
    
        changeVisibleState()

        console.log(hcText);
    }

    return (
        <BasePage>

            <Header />

            <Box sx={{ width:"100%" }}>
                <SegmentedTextField
                    segments={HCLength + 2} 
                    separator="-"
                    separatorAt={2}
                />

                <PrimaryButton variant="contained" size="large"
                    sx={{ mb: "0.7rem" }} onClick={clickCheckinButton}>
                    Avisar meu médico que cheguei
                </PrimaryButton>
                
                <SecondaryButton variant="contained" size="large"
                    onClick={() => navigate(`/more-info`)}>
                    Preciso de ajuda
                </SecondaryButton>
            </Box>

            <Stack spacing={2} sx={{ width: '100%', height: 200 }}>
                <Toast hc={toastHCText} doc={toastDoctorName} date={toastAppointmentDate}
                    status="Confirmada!" description="Aguarde ser chamado pelo painel"
                    visible={visible} fadeOut={changeVisibleState} />
                    
                <Snackbar open={alertOpen} autoHideDuration={96000} onClose={handleAlertClose} sx={{
                    position: 'static',
                    height: '100%',
                }}>
                    <Alert onClose={handleAlertClose} severity="error" sx={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2em',
                    }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </Stack>
                
        </BasePage>
    )
}