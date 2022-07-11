import { useState, forwardRef } from "react";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Slide, TextField } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from "@mui/material/transitions";
import { DialogPaper, RoundedPrimaryButton } from "../../styles";
import { SegmentedTextField } from "../SegmentedTextField/segmented-text-field";
import { DrChegueiCalendar } from "../DrChegueiCalendar/dr-cheguei-calendar";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const getDateString = (date: Date | unknown): string => {
    let text;
    if (date instanceof Date)
        text = date.toLocaleDateString("pt-BR");
    else
        text = (new Date()).toLocaleDateString("pt-BR");
    return text;
}

export const AppointmentDialog = (
    props: {
        open: boolean
        setOpenFunction: Function
    }): React.ReactElement => {

    const [date, setSelectedDate] = useState<Date | unknown>(new Date());
    
    return (
        <Dialog
            open={props.open}
            onClose={() => props.setOpenFunction(false)}
            TransitionComponent={Transition}   
            fullWidth 
            PaperComponent={DialogPaper}
        >
            <DialogContent sx={{ display: "flex", flexDirection: "column", padding: "3rem 2rem 3rem 2rem", alignItems: "center" }}>
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
                    separatorAt={2}
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
                    <Box sx={{ display: "flex", justifyContent: "space-between" }} mb={2}>
                        <TextField id="date" label="Data" variant="outlined" sx={{ width: "50%" }} value={getDateString(date)}/>
                        <TextField id="time" label="Hora" variant="outlined" sx={{ width: "30%" }} type="time" />
                    </Box>
                    <TextField id="pacient" label="Nome do Paciente" variant="outlined" sx={{ width: "100%" }}/>
                </Box>
                <RoundedPrimaryButton variant="contained" size="small">Marcar Consulta</RoundedPrimaryButton>
            </DialogContent>
        </Dialog>
    )
}