import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { DrChegueiText, PrimaryButton, SecondaryButton } from '../../styles';
import { DrChegueiHeader } from '../DrChegueiHeader/dr-cheguei-header';
import { SegmentedTextField } from '../SegmentedTextField/segmented-text-field';
import { LoginGrid } from '../LoginGrid/login-grid';
import { forwardRef, ReactElement, SyntheticEvent, useState } from 'react';
import { DrChegueiToast } from '../Toast/dr-cheguei-toast';
import { settings } from '../settings';

const AlertData = {
    hc: "",
    name: "",
    date: "",
    status: "",
    description: ""
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Home = (): ReactElement => {

    const navigate = useNavigate();
   
    const [errorMessage, setErrorMessage] = useState("");
    const changeErrorMessage = (text: string) => {
        setErrorMessage((errorMessage) => errorMessage = text);
    }

    const [alertOpen, setAlertOpen] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const getHCText = () => {
        let hcText = "";
        const inputs = document.querySelectorAll(".hc-text input");
        inputs.forEach((el) => {
            const input = el as HTMLInputElement;
            hcText += input.value;
        });
        return hcText
    }

    const clearHCText = () => {
        const inputs = document.querySelectorAll(".hc-text input");
        inputs.forEach((el) => {
            const input = el as HTMLInputElement;
            input.value = "";
        });
        const input = document.querySelector(".hc-text input") as HTMLElement | null;
        if (input != null) input.focus()
    }

    const checkHCLength = (hcText: string) => {
        if (hcText.length < settings.HC_LENGTH) {
            return false;
        }
        return true;
    }

    const convertIsoDateToDateString = (dateStr: string) => {
        const date = new Date(dateStr); 
        const dateString = date.toLocaleString("pt-br", { month: "long", day: 'numeric'});
        const timeString = date.toLocaleString("pt-br", { hour: 'numeric', minute: 'numeric' });
        return `${dateString} às ${timeString}`;
    }

    const checkInAppointment = async (token: string) => {
        const config = { "headers": { "Authorization": token } };
        return await axios.get(`${settings.API_URL}/appointment?checkin=true`, config)
        .then((res) => {
            return res.data; 
        })
        .catch((err) => {
            const res = err.response;
            return res.data; 
        })
    }

    const authClientWithHC = async (hcText: string) => {
        return await axios.post(`${settings.API_URL}/session`, { "hc": hcText })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            const res = err.response;
            return res.data;             
        });
    }

    const getClientLatLon = async (): Promise<any> => {
        if ("geolocation" in navigator) {
            return new Promise((resolve, reject) => 
                navigator.geolocation.getCurrentPosition(resolve, reject))
        }
        return null;
    }

    const degToRad = (deg: number) => {
        return deg * (Math.PI/180);
    }

    const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371;
        const dLat = degToRad(lat2-lat1); // degToRad below
        const dLon = degToRad(lon2-lon1); 
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2); 
        const b = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        return R * b; // Distance in km
      }
      


    const clickCheckinButton = async () => {

        /* Get and verify HC code */
        const hcText = getHCText();
        if(!checkHCLength(hcText)) {
            changeErrorMessage("Preencha o HC por completo!");
            setAlertOpen(true);
            setToastOpen(false);
            clearHCText()
            return;
        }

        /* Get lat, lon and verify distance from HC */
        if (settings.ENABLE_GEO) {
            const location = await getClientLatLon();
            let distance = 1;
            if (location != null) {
                const clientLat = location.coords.latitude;
                const clientLon = location.coords.longitude;
                distance = getDistanceFromLatLonInKm(settings.GEO_LATITUDE, settings.GEO_LONGITUDE, clientLat, clientLon);
            }
            if ((location == null) || (distance > 0.1)) { // distance > 0.1km
                changeErrorMessage("Você precisa estar localizado no HC para realizar o check-in!");
                setAlertOpen(true);
                setToastOpen(false);
                clearHCText()
                return
            }
        }

        /* Authenticate client */
        const authClientRes: any = await authClientWithHC(hcText)
        if (!authClientRes.hasOwnProperty("token")) {
            changeErrorMessage("Não foram encontradas consultas para este código HC!");
            setAlertOpen(true);
            setToastOpen(false);
            clearHCText()
            return;
        } 

        /* Check-in client */
        const checkInAppointmentRes: any = await checkInAppointment(authClientRes.token);
        if (!checkInAppointmentRes.hasOwnProperty("appointment_id")) {
            changeErrorMessage("Não foram encontradas consultas para este código HC!");
            setAlertOpen(true);
            setToastOpen(false);
            return;
        }
        clearHCText()
        
        AlertData.hc = `HC-${hcText}`;
        AlertData.name = `Dr(a) ` + checkInAppointmentRes.doctor_name.split(" ")[0];
        AlertData.date = convertIsoDateToDateString(checkInAppointmentRes.appointment_schedule);
        AlertData.status = "Confirmada!";
        AlertData.description = "Aguarde ser chamado(a)!";

        setToastOpen(true);
    }

    return (
        <LoginGrid imageUrl="/home.svg">
            <>
                <DrChegueiHeader
                    subtitle="Evite filas avisando o seu médico que você está pronto para ser atendido em sua consulta agendada."
                />
                <Box sx={{ width:"100%", marginBottom: "20px" }}>
                    <DrChegueiText variant="body2" align="left" sx={{ mt: "2rem", mb: "1rem" }}>
                        Insira seu código HC
                    </DrChegueiText>
                    <SegmentedTextField
                        segments={settings.HC_LENGTH + 2} 
                        separator="-"
                        separatorAt={2}
                        defaultValuesString="HC"
                        defaultValuesAt={[0, 1]}
                        autoFocusOn={3}
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
                    <DrChegueiToast 
                        data={AlertData}
                        isOpen={toastOpen}
                        setIsOpen={setToastOpen}
                        autoHideDuration={settings.TOAST_CLOSE_DELAY}
                    />
                    <Snackbar open={alertOpen} autoHideDuration={settings.TOAST_CLOSE_DELAY} onClose={() => setAlertOpen(false)} sx={{
                        position: 'static',
                        height: '100%',
                    }}>
                        <Alert onClose={() => setAlertOpen(false)} severity="error" sx={{
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
            </>
        </LoginGrid>
    )
}