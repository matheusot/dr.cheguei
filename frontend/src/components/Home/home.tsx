import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { PrimaryButton, SecondaryButton } from '../../styles';
import { Toast } from '../Toast/toast';
import { Header } from '../DrChegueiHeader/dr-cheguei-header';
import { SegmentedTextField } from '../SegmentedTextField/segmented-text-field';
import { BasePage } from '../BasePage/base-page'

export const Home = (): React.ReactElement => {

    const [visible, setVisible] = React.useState(false);

    const navigate = useNavigate();

    const changeVisibleState = () => {
        setVisible((visible) => !visible);
    }

    return (
        <BasePage>

            <Header />

            <Box sx={{ width:"100%" }}>
                <SegmentedTextField
                    segments={6} 
                    separator="-"
                    separatorAt={2}
                />
                <PrimaryButton variant="contained" size="large"
                    sx={{ mb: "0.7rem" }} onClick={changeVisibleState}>
                    Avisar meu médico que cheguei
                </PrimaryButton>
                
                <SecondaryButton variant="contained" size="large"
                    onClick={() => navigate(`/more-info`)}>
                    Preciso de ajuda
                </SecondaryButton>
            </Box>

            <Toast hc="HC-1234" doc="Dra. Ana Paula" date="hoje, 27 de maio às 16h"
                status="Confirmada!" description="Aguarde ser chamado pelo painel"
                visible={visible} fadeOut={changeVisibleState} />
                
        </BasePage>
    )
}