import { Card, CardContent, Divider, Grid, Slide, Typography } from "@mui/material";
import { Box } from "@mui/system";

const CallDrCard = (
  <Card variant="outlined" sx={{ backgroundColor: "#E1E1E1" }}>
    <CardContent
        sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center"
        }}
    >
        <Box>
            <Typography></Typography>
            <Typography></Typography>
            <Typography></Typography>
        </Box>
        <Divider
            orientation="vertical"
            variant="inset"
            component="div"
            flexItem
        />
        <Box>BBBBBBB</Box>
    </CardContent>
  </Card>
);

export const CallDr = (props: { checked: boolean }): React.ReactElement => {
  return (
    <Slide direction="left" in={props.checked} mountOnEnter unmountOnExit>
      {CallDrCard}
    </Slide>
  );
};

