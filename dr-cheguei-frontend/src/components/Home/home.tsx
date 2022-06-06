import { Box, Grid } from '@mui/material';
import { ImageBox, PrimaryButton } from '../../styles';
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
                <Grid item xs={7} sm={7} md={7} lg={7}>
                    <ImageBox image="/home.svg"></ImageBox>
                </Grid>
                <Grid
                    xs={5} sm={5} md={5} lg={5}
                    item
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: "100vh", padding: "5rem 5rem 8rem 5rem" }}
                >
                    <Header />
                    <SegmentedTextField
                        segments={5} 
                        separator="-"
                        separatorAt={2}
                    />
                    <PrimaryButton variant="contained">Avisar meu médico que cheguei</PrimaryButton>
                </Grid>
            </Grid>
        </Box>
    )
}