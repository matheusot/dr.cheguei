import { useState, forwardRef } from "react";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Slide } from "@mui/material"
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
                    <DialogTitle variant="h3" fontWeight={1000} sx={{ padding: 0, paddingBottom: "16px" }}>Marcar<br/>Consulta</DialogTitle>
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
                <RoundedPrimaryButton variant="contained" size="small">Marcar Consulta</RoundedPrimaryButton>
            </DialogContent>
        </Dialog>
    )
}