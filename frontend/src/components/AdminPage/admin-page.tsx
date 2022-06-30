import { Box } from '@mui/material';
import { useState } from 'react';
import { AdminHeader } from '../AdminHeader/admin-header'

export const AdminPage = (): React.ReactElement => {
    const [date, setSelectedDate] = useState<Date | unknown>(new Date());
    
    return (
        <>
            <Box sx={{ padding: "4rem 4rem 0 4rem", height: "100000px" }}>
                <AdminHeader />
            </Box>
        </>
    )
}