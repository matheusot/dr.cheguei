import {ReactElement} from 'react';
import { Box, Grid } from '@mui/material';
import { ImageBox } from '../../styles';

interface loginGridProps {
    imageUrl: string;
    children: ReactElement;
}

export const LoginGrid = ({ imageUrl, children }: loginGridProps): ReactElement => {
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
                    <ImageBox image={imageUrl}></ImageBox>
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
                    {children}
                </Grid>
            </Grid>
        </Box>
    )
}