import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Snackbar, Fade } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { DrChegueiText, PrimaryButton, SecondaryButton } from '../../styles';
import { DrChegueiHeader } from '../DrChegueiHeader/dr-cheguei-header';
import { SegmentedTextField } from '../SegmentedTextField/segmented-text-field';
import { BasePage } from '../BasePage/base-page';
import { forwardRef, ReactElement, SyntheticEvent, useState } from 'react';
import { DrChegueiAppointment } from '../Toast/dr-cheguei-toast';



//const APIURL = "http://localhost:4000";
const APIURL = "https://dr-cheguei.herokuapp.com";
const ENABLE_GEO = false;
const MODAL_DELAY = 5000;
const HCLength = 5;
const HClat = -22.8268021;
const HClon = -47.0701726;



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

    const [modalVisible, setModalVisible] = useState(false);
    const changeModalVisibleState = () => {
        setModalVisible((modalVisible) => !modalVisible);
        setTimeout(() => {
            setModalVisible((modalVisible) => !modalVisible);
        }, MODAL_DELAY)
    }

    const [alertOpen, setAlertOpen] = useState(false);
    const handleAlertClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };

    const [toastHCText, setToastHCText] = useState("");
    const [toastDoctorName, setToastDoctorName] = useState("");
    const [toastAppointmentDate, setToastAppointmentDate] = useState("");

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
        if (hcText.length < HCLength) {
            return false;
        }
        setToastHCText("HC-" + hcText);
        return true;
    }

    const convertIsoDateToDateString = (dateStr: string) => {
        const date = new Date(dateStr); 
        return date.toLocaleString("pt-br", 
            { weekday: "long", year: 'numeric', month: "long", day: 'numeric' }
        );
    }

    const checkInAppointment = async (token: string) => {
        const config = { "headers": { "Authorization": token } };
        return await axios.get(`${APIURL}/appointment?checkin=true`, config)
        .then((res) => {
            return res.data; 
        })
        .catch((err) => {
            const res = err.response;
            return res.data; 
        })
    }

    const authClientWithHC = async (hcText: string) => {
        return await axios.post(`${APIURL}/session`, { "hc": hcText })
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
            clearHCText()
            return;
        }

        /* Get lat, lon and verify distance from HC */
        if (ENABLE_GEO) {
            const location = await getClientLatLon();
            let distance = 1;
            if (location != null) {
                const clientLat = location.coords.latitude;
                const clientLon = location.coords.longitude;
                distance = getDistanceFromLatLonInKm(HClat, HClon, clientLat, clientLon);
            }
            if ((location == null) || (distance > 0.1)) { // distance > 0.1km
                changeErrorMessage("Você precisa estar localizado no HC para realizar o check-in!");
                setAlertOpen(true);
                clearHCText()
                return
            }
        }

        /* Authenticate client */
        const authClientRes: any = await authClientWithHC(hcText)
        console.log(authClientRes);
        if (!authClientRes.hasOwnProperty("token")) {
            changeErrorMessage("Não foram encontradas consultas para este código HC!");
            setAlertOpen(true);
            clearHCText()
            return;
        } 

        /* Check-in client */
        const checkInAppointmentRes: any = await checkInAppointment(authClientRes.token);
        console.log(checkInAppointmentRes);
        if (!checkInAppointmentRes.hasOwnProperty("appointment_id")) {
            changeErrorMessage("Não foram encontradas consultas para este código HC!");
            setAlertOpen(true);
            return;
        }
        setToastDoctorName(checkInAppointmentRes.doctor_name);
        const date = convertIsoDateToDateString(checkInAppointmentRes.appointment_schedule);
        setToastAppointmentDate(date);

        changeModalVisibleState()
        clearHCText()
    }

    

    return (
        <BasePage>

            <DrChegueiHeader />

            <Box sx={{ width:"100%", marginBottom: "20px" }}>
                <DrChegueiText variant="body2" align="left" sx={{ mt: "2rem", mb: "1rem" }}>
                    Insira seu código HC
                </DrChegueiText>
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
                {/* <Toast hc={toastHCText} doc={toastDoctorName} date={toastAppointmentDate}
                    status="Confirmada!" description="Aguarde ser chamado pelo painel"
                    visible={true} fadeOut={changeModalVisibleState} /> */}
                

                <Snackbar open={alertOpen} autoHideDuration={MODAL_DELAY} onClose={handleAlertClose} sx={{
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