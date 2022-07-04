import { Box, Card, CardContent, Fade, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export const ToastYellowLine = ({
    color,
    visible = false,
    fadeOut
} : any ) => {
    return (
        <Fade in={visible}>
            <Card sx={{ 
                display: "flex",
                flexWrap: 'wrap',
                width: "100%",
                backgroundColor: "#E9E9E9",
            }}>
                <CardContent sx={{ flex: '1' }}>
                    <Typography variant="body1" sx={{ 
                            wordWrap: 'break-word',
                            fontWeight: 300,
                            fontSize: '1.4em',
                            lineHeight: '1.2em',
                            textAlign: 'center',
                            margin: '10px 0px'
                        }}>
                        Por favor, <b>dirija-se à faixa<br/>
                        amarela</b> à sua esquerda para<br/>
                        que a gente te ajude!
                    </Typography>
                </CardContent>
                <IconButton
                        aria-label="Fechar"
                        onClick={fadeOut}
                    >
                        <CloseIcon aria-label="Fechar"/>
                </IconButton>
                <Box sx={{
                        flex: '0 0 100%',
                        display: 'block',
                        width: '100%',
                        height: '10px',
                        backgroundColor: `#${color}`,
                        marginBottom: '20px'
                    }}></Box>
            </Card>
        </Fade>
    );
}
