import { Box, Snackbar, Divider, Grid, createTheme, ThemeProvider } from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { forwardRef, ReactElement } from "react";
import { DrChegueiToastTitle, DrChegueiToastSubtitle, DrChegueiToastText, DrChegueiToastStatus, DrChegueiToastDescription } from "../../styles";

interface ToastProps {
    data: {
        hc: string,
        name: string,
        date: string,
        status: string,
        description?: string
    },
    isOpen: boolean,
    setIsOpen: Function,
    autoHideDuration?: number
}

const alertTheme = createTheme({
    components: {
        MuiSnackbar: {
            styleOverrides: {
                root: {
                    zIndex: "unset",
                    position: "unset"
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    "& .MuiAlert-message": {
                        width: "100%",
                        padding: "30px 0"
                    }
                }
            }
        }
    }
});

const getStatusColor = (status: string): string => {
    if (status === "Confirmada!" || status === "Presente")
        return "#21BA71";
    else if (status === "Não confirmado")
        return "#D6A52A";
    return "#2AB7D6";
}

const checkDescription = (description: string| undefined): ReactElement | null => {
    return (
        description ?
        <DrChegueiToastDescription variant="body2">
            {description}
        </DrChegueiToastDescription>
        :
        null
    )
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert ref={ref} {...props} />;
});

export const DrChegueiToast = ({
    data,
    isOpen,
    setIsOpen,
    autoHideDuration
}: ToastProps): ReactElement => {
    return (
        <ThemeProvider theme={alertTheme}>

            <Snackbar open={isOpen} autoHideDuration={autoHideDuration} onClose={() => setIsOpen(false)}>
                <Alert
                    sx={{
                        width: "100%",
                        backgroundColor: "#E9E9E9",
                        borderRadius: "7px",
                        minHeight: "120px",
                        message: {
                            width: "100%",
                        }
                    }}
                    onClose={() => setIsOpen(false)}
                    icon={false}
                >
                    <Grid
                        sx={{ marginLeft: "0" }}
                        container
                        spacing={4}
                    >
                        <Grid item>
                            <Box>
                                <DrChegueiToastSubtitle variant="h6">
                                    {data.hc}
                                </DrChegueiToastSubtitle>
                                <DrChegueiToastTitle variant="h3">
                                    {data.name} 
                                </DrChegueiToastTitle>
                                <DrChegueiToastText variant="body2">
                                    {data.date}
                                </DrChegueiToastText>
                            </Box>
                        </Grid>
                        <Grid item sm={1} md={1} lg={1}>
                            <Divider orientation="vertical" variant="middle"/>
                        </Grid>
                        <Grid item sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: "1", paddingRight: "32px" }}>
                            <DrChegueiToastStatus
                                sx={{
                                    color: getStatusColor(data.status),
                                    textAlign: data.description? "left" : "center"
                                }}
                                variant="h6"
                                >
                                {data.status}
                            </DrChegueiToastStatus>
                            { checkDescription(data.description) }
                        </Grid>
                    </Grid>
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}
