import { Box, Card, CardContent, Fade, IconButton, Divider } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { DrChegueiToastTitle, DrChegueiToastSubtitle, DrChegueiToastText, DrChegueiToastStatus, DrChegueiToastDescription } from "../../styles";
import { MouseEventHandler } from "react";

interface ToastProps {
    hc: string,
    doc: string,
    date: string,
    status: string,
    description: string,
    visible: boolean
    fadeOut: MouseEventHandler
}

export const Toast = ({
    hc,
    doc,
    date,
    status,
    description,
    visible,
    fadeOut 
}: ToastProps) => {
    return (
        <Fade in={visible}>
            <Card sx={{
                display: "flex",
                width: "100%",
                backgroundColor: "#E9E9E9",
            }}>
                <CardContent sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <Box sx={{ marginLeft: "auto" }}>
                        <IconButton
                            aria-label="Fechar"
                            size="small"
                            onClick={fadeOut}
                        >
                            <CloseIcon aria-label="Fechar" />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <Box>  
                            <DrChegueiToastSubtitle variant="h6">
                                {hc}
                            </DrChegueiToastSubtitle>
                            <DrChegueiToastTitle variant="h3">
                                {doc} 
                            </DrChegueiToastTitle>
                            <DrChegueiToastText variant="body2">
                                {date}
                            </DrChegueiToastText>
                        </Box>
                        <Divider sx={{ margin: "0 1rem" }} orientation="vertical" variant="middle" flexItem/>
                        <Box>
                            <DrChegueiToastStatus variant="h6" sx={{ color: "green" }}>
                                {status}
                            </DrChegueiToastStatus>
                            <DrChegueiToastDescription variant="body2" sx={{ textAlign: "center" }}>
                                {description}
                            </DrChegueiToastDescription>
                        </Box>
                    </Box>

                </CardContent>               
            </Card>
        </Fade>
    );
}
