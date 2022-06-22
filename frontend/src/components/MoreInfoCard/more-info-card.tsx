import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export const MoreInfoCard = ({
    imgSrc, imageAlt, text
} : any) => {
    return (
        <Card sx={{ 
            display:"flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width:"100%",
            height: '100%',
            backgroundColor:"#E9E9E9",
        }}>
            <CardMedia
                component="img"
                sx={{ 
                    height: '5vh',
                    width: 'auto',
                    margin: '20px auto 0px auto',
                    backgroundSize: 'contain',
                }}
                image={imgSrc}
                alt={imageAlt}
            />
            <CardContent>
                <Typography variant="h3" sx={{
                    fontSize: '1.5em',
                    fontWeight: '300',
                    textAlign: 'center'
                }}>
                    {text}
                </Typography>
            </CardContent>
        </Card>
    )
}