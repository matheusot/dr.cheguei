import axios from 'axios';
import { useState, forwardRef } from "react";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Slide, TextField, Alert, Stack, AlertColor } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from "@mui/material/transitions";
import { DialogPaper, RoundedPrimaryButton } from "../../styles";
import { SegmentedTextField } from "../SegmentedTextField/segmented-text-field";
import { DrChegueiCalendar } from "../DrChegueiCalendar/dr-cheguei-calendar";
import { settings } from '../settings';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const getDateString = (date: any): string => {
    if (!(date instanceof Date))
        date = new Date();
    const tzOffset = date.getTimezoneOffset() * 60000; //offset in milliseconds        
    const stringDate = new Date((date.getTime() - tzOffset)).toISOString().split('T')[0];
    return stringDate;
}

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

export const AppointmentDialog = (
    props: {
        open: boolean
        setOpenFunction: Function
    }): React.ReactElement => {

    const [date, setSelectedDate] = useState<Date | unknown>(new Date());
    const [alertSeverity, setAlertSeverity] = useState<AlertColor>("error");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertDisplay, setAlertDisplay] = useState("none");

    const addApointment = async () => {

        /* Get and verify HC code */
        const hcText = getHCText();
        if (!checkHCLength(hcText)) {
            setAlertSeverity("error");
            setAlertMessage(`HC inválido!`);
            setAlertDisplay("flex");
            clearHCText()
            setTimeout(() => {
                setAlertDisplay("none");
            }, 3000);
            return;
        }
    
        const dateInput = document.getElementById("date") as HTMLInputElement;
        const timeInput = document.getElementById("time") as HTMLInputElement;

        if (!dateInput.value || !timeInput.value) {
            setAlertSeverity("error");
            setAlertMessage(`Preencha os campos data e hora corretamente!`);
            setAlertDisplay("flex");
            clearHCText()
            setTimeout(() => {
                setAlertDisplay("none");
            }, 3000);
            return;
        }
    
        const appointment = {
            schedule: `${dateInput.value} ${timeInput.value}:00`,
            hc: hcText
        }
    
        const token = sessionStorage.getItem("token") || "";
        const config = { "headers": { "Authorization": token } };
        await axios.post(`${settings.API_URL}/appointment`, appointment, config)
        .then((res) => {
            setAlertSeverity("success");
            setAlertMessage("Consulta marcada com sucesso!");
            setAlertDisplay("flex");
            setTimeout(() => {
                setAlertDisplay("none");
                props.setOpenFunction(false)
            }, 3000);

        })
        .catch((err) => {
            const res = err.response;
            setAlertSeverity("error");
            setAlertMessage(`Falha: ${res.data.msg}`);
            setAlertDisplay("flex");
            setTimeout(() => {
                setAlertDisplay("none");
            }, 3000);
        });
    }
    

    return (
        <Dialog
            open={props.open}
            onClose={() => props.setOpenFunction(false)}
            TransitionComponent={Transition}   
            fullWidth 
            PaperComponent={DialogPaper}
        >
            <DialogContent sx={{ display: "flex", flexDirection: "column", padding: "2rem", alignItems: "center" }}>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
                    <DialogTitle variant="h3" fontWeight={1000} sx={{ padding: 0, paddingBottom: "16px" }}>Marcar Consulta</DialogTitle>
                    <Box>
                        <IconButton
                            aria-label="Fechar"
                            onClick={() => props.setOpenFunction(false)}
                        >
                            <CloseIcon aria-label="Fechar"/>
                        </IconButton>
                    </Box>
                </Box>

                <SegmentedTextField
                    segments={7} 
                    separator="-"
                    defaultValuesString="HC"
                    defaultValuesAt={[0, 1]}
                    separatorAt={2}
                    autoFocusOn={3}
                />

                <DrChegueiCalendar
                    selectedDate={date}
                    setSelectedDate={setSelectedDate}
                />

                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    mt={2}
                    mb={2}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%"
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between" }} mb={1}>
                        <TextField id="date" label="Data" variant="outlined" sx={{ width: "calc(50% - 5px)" }} type="date" value={getDateString(date)}/>
                        <TextField id="time" label="Hora" variant="outlined" sx={{ width: "calc(50% - 5px)" }} type="time" />
                    </Box>
                </Box>

                <RoundedPrimaryButton variant="contained" size="small" onClick={addApointment}>Marcar Consulta</RoundedPrimaryButton>

                <Stack sx={{ width: '100%' }} spacing={2} mt={2}>
                    <Alert severity={alertSeverity} sx={{ display: alertDisplay }}>
                        {alertMessage}
                    </Alert>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}