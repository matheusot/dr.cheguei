import { Box, Card, CardContent, Fade } from "@mui/material";
import { DrChegueiToastTitle, DrChegueiToastSubtitle } from "../../styles";
import { DrChegueiToastText, DrChegueiToastStatus, DrChegueiToastDescription } from "../../styles";
import { CardClose } from "../../styles";

export const Toast = ({
    hc, doc, date, status, description,
    visible = false,
    fadeOut
} : any ) => {
    return (
        <Fade in={visible}>
            <Card sx={{ display: "flex", width: "100%", backgroundColor: "#E9E9E9" }}>
                <Box sx={{ display: "flex", width: "60%", flexDirection: "column",
                            margin: "1.5rem 0.7rem", borderRight: "1px solid rgba(0,0,0,.4)" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                        <DrChegueiToastSubtitle variant="h6">
                            {hc}
                        </DrChegueiToastSubtitle>
                        <DrChegueiToastTitle variant="h3">
                            {doc} 
                        </DrChegueiToastTitle>
                        <DrChegueiToastText variant="body2">
                            {date}
                        </DrChegueiToastText>
                    </CardContent>
                </Box>
                <Box sx={{ display: "flex", width: "40%", flexDirection: "column",
                        alignItems: "center", justifyContent: "center", padding: "1.5rem 0 1.5rem 0.7rem" }}>
                    <DrChegueiToastStatus variant="h6" sx={{ color: "green" }}>
                        {status}
                    </DrChegueiToastStatus>
                    <DrChegueiToastDescription variant="body2" sx={{ textAlign: "center" }}>
                        {description}
                    </DrChegueiToastDescription>
                </Box>
                <Box>
                    <CardClose variant="text" onClick={fadeOut}/>
                </Box>
            </Card>
        </Fade>
    );
}
