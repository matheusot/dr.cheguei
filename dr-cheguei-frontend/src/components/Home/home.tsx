import * as React from 'react';
import { Box, Grid } from '@mui/material';
import { ImageBox, PrimaryButton, SecondaryButton } from '../../styles';
import { Toast } from '../Toast/toast';
import { Header } from '../DrChegueiHeader/dr-cheguei-header';
import { SegmentedTextField } from '../SegmentedTextField/segmented-text-field';

export const Home = (): React.ReactElement => {
    const [visible, setVisible] = React.useState(false);

    const changeVisibleState = () => {
        setVisible((visible) => !visible);
        console.log(visible)
    }

    return (
        <Box sx={{ height: "100vh", width: "100vw" }}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                wrap="nowrap"
            >
                <Grid item xs={0} sm={4} md={6} lg={7}>
                    <ImageBox image="/home.svg"></ImageBox>
                </Grid>

                <Grid
                    xs={12} sm={8} md={6} lg={5}
                    item
                    container
                    direction="column"
                    justifyContent="space-around"
                    alignItems="flex-start"
                    sx={{ height: "100vh", width:"100vw", padding: "1.5rem" }}
                >

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
                        <SecondaryButton variant="contained" size="large">Preciso de ajuda</SecondaryButton>
                    </Box>

                    <Toast hc="HC-1234" doc="Dra. Ana Paula" date="hoje, 27 de maio às 16h"
                        status="Confirmada!" description="Aguarde ser chamado pelo painel"
                        visible={visible} fadeOut={changeVisibleState} />
                </Grid>
            </Grid>
        </Box>
    )
}