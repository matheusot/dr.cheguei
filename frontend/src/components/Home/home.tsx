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

    const clickCheckinButton = () => {
        let hcText = "";
        const inputs = document.querySelectorAll(".hc-text input");
        inputs.forEach((el) => {
            const input = el as HTMLInputElement;
            hcText += input.value;
        });

        if (hcText.length < HCLength) {
            changeErrorMessage("Preencha o HC por completo!")
            setAlertOpen(true)
            return
        }

        axios.post('https://dr-cheguei.herokuapp.com/session', { "hc": hcText })
            .then((res) => {
                if (res.status == 200) {
                    console.log(res.data.msg);
                    console.log(res.data.token);
                }
                changeVisibleState()
            })
            .catch((err) => {
                const res = err.response;
                if (res.status == 401) {
                    console.log(res.data.msg)
                }
                console.error(err);
            })
            .then(() => {
                console.log("always run");
            });

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
                <Toast hc="HC-1234" doc="Dra. Ana Paula" date="hoje, 27 de maio às 16h"
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