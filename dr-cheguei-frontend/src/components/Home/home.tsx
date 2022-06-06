import { Box, Grid } from '@mui/material';
import { ImageBox, PrimaryButton, SecondaryButton } from '../../styles';
import { Header } from '../DrChegueiHeader/dr-cheguei-header';
import { SegmentedTextField } from '../SegmentedTextField/segmented-text-field';

export const Home = (): React.ReactElement => {
    return (
        <Box sx={{ height: "100vh" }}>
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
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{ height: "100vh", padding: "8vh 10vw 0 calc(10vw - 10px)" }}
                >
                    <Header />
                    <SegmentedTextField
                        segments={6} 
                        separator="-"
                        separatorAt={2}
                    />
                    <Box>
                        <PrimaryButton variant="contained" size="large" sx={{ mb: "10px" }}>Avisar meu médico que cheguei</PrimaryButton>
                        <SecondaryButton variant="contained" size="large">Preciso de ajuda</SecondaryButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}