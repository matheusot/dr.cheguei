import { Box, Grid, Stack } from "@mui/material";
import { useState } from "react";
import { DrChegueiText } from "../../styles";
import { AdminHeader } from "../AdminHeader/admin-header";
import { DrChegueiCalendar } from "../DrChegueiCalendar/dr-cheguei-calendar";
import { DrChegueiToast } from "../Toast/dr-cheguei-toast";


const testeAlertData = {
    hc: "HC 78945",
    name: "Doutor Xama Menorrrrrrrrrrrr",
    date: "hoje, 27 de maio às 08h",
    status: "Confirmada!"
}

const getDateString = (date: Date | unknown): string => {
    let text;
    if (date instanceof Date)
        text = date.toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "2-digit"});
    else
        text = (new Date()).toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "2-digit"});
    
    text = text.split("");
    text[0] = text[0].toUpperCase();
    return text.join("");
}

const gridCss = {
    maxHeight: window.innerHeight - 200,
    overflowY: "auto",
    paddingTop: "0 !important",
    paddingRight: "20px",
    paddingBottom: "20px",
    "&::-webkit-scrollbar-track": {
        backgroundColor: "#F5F5F5"
    },
    "&::-webkit-scrollbar": {
        width: "8px",
        backgroundColor: "#F5F5F5"
    },
    "&::-webkit-scrollbar-thumb": {
        borderRadius: "10px",
        backgroundColor: "#BA2121",
        "&:hover": {
            backgroundColor: "#c82121",
        }
    }
}

export const AdminPage = (): React.ReactElement => {
    const [date, setSelectedDate] = useState<Date | unknown>(new Date());

    let mockArray = Array(7).fill(testeAlertData);
    const [openSnackbar, setOpenSnackbar] = useState(true);
    
    return (
        <Box sx={{ padding: "4rem 4rem 0 4rem" }}>
            <Box>
                <AdminHeader />
            </Box>
            <DrChegueiText variant="body2" align="left" mt={2} mb={6}>
                { getDateString(date) }
            </DrChegueiText>
            <Grid item container spacing={4} id="grid">
                <Grid item md={6} lg={6} sx={gridCss}>
                    <Stack spacing={2}>
                        {mockArray.map((listItem, index) => {
                            return (
                                <DrChegueiToast
                                    key={index}
                                    data={listItem}
                                    isOpen={openSnackbar}
                                    setIsOpen={setOpenSnackbar}
                                />
                            )
                        })}  
                    </Stack>
                </Grid>
                <Grid item md={6} lg={6} sx ={{ paddingTop: "0 !important" }}>
                    <DrChegueiCalendar
                        selectedDate={date}
                        setSelectedDate={setSelectedDate}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};
