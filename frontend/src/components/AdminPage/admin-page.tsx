import { Box, Grid, List, ListItem } from "@mui/material";
import { useState } from "react";
import { AdminHeader } from "../AdminHeader/admin-header";
import { DrChegueiCalendar } from "../DrChegueiCalendar/dr-cheguei-calendar";
import { Toast } from "../Toast/toast";

export const AdminPage = (): React.ReactElement => {
    const [date, setSelectedDate] = useState<Date | unknown>(new Date());

    let mockArray = Array(7).fill(null);

    return (
        <>
            <Box sx={{ padding: "4rem 4rem 0 4rem" }}>
                <AdminHeader />
            </Box>
            <Grid item container sx={{ padding: "4rem 4rem 0 4rem" }} spacing={2}>
                <Grid item md={6} lg={6}>
                <List sx={{ width: '100%', bgcolor: 'transparent', overflow: 'auto', maxHeight: 358 }}> 
                    {mockArray.map((listItem, index) => {
                        return (
                            <ListItem key={index}>
                                
                            </ListItem>
                        )
                    })}  
                </List>
                </Grid>
                <Grid item md={6} lg={6}>
                    <DrChegueiCalendar
                        selectedDate={date}
                        setSelectedDate={setSelectedDate}
                    />
                </Grid>
            </Grid>
        </>
    );
};
