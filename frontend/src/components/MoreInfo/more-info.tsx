import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { MoreInfoTitle } from '../../styles';
import { LoginGrid } from '../LoginGrid/login-grid'
import { MoreInfoCard } from "../MoreInfoCard/more-info-card"
import { ToastYellowLine } from "../Toast/toast-yellow-line"

export const MoreInfo = (): React.ReactElement => {

    const [visible, setVisible] = React.useState(false);

    const navigate = useNavigate();

    const changeVisibleState = () => {
        setVisible((visible) => !visible);
    }

    return (
        <LoginGrid imageUrl="/home.svg">
            <>
                <MoreInfoTitle variant="h3"/>
                <Box sx={{ width:"100%" }}>
                    <Grid container spacing={3} sx={{
                        display: 'grid',
                        gridTemplateColumns: "1fr 1fr",
                        gridTemplateRows: "1fr 1fr"
                    }}>
                        <Grid item sx={{cursor: 'pointer'}} onClick={changeVisibleState}>
                            <MoreInfoCard imgSrc="/location.svg" imageAlt="Localização" 
                                text="Minha primeira vez no HC"/>
                        </Grid>
                        <Grid item sx={{cursor: 'pointer'}} onClick={changeVisibleState}>
                            <MoreInfoCard imgSrc="/calendar-times.svg" imageAlt="Sem consulta agendada" 
                                text="Não tenho uma consulta agendada"/>
                        </Grid>
                        <Grid item sx={{cursor: 'pointer'}} onClick={changeVisibleState}>
                            <MoreInfoCard imgSrc="/talk-doubt.svg" imageAlt="Não sei meu HC" 
                                text="Não sei meu código HC"/>
                        </Grid>
                        <Grid item sx={{cursor: 'pointer'}} onClick={() => navigate(`/`)}>
                            <MoreInfoCard imgSrc="/times.svg" imageAlt="Sair" 
                                text="Voltar a página inicial"/>
                        </Grid>
                    </Grid>
                </Box>
                <ToastYellowLine color="FFC700" visible={visible} fadeOut={changeVisibleState} />
            </>
        </LoginGrid>
    )
}