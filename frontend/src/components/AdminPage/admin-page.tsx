import * as React from 'react';
import { Box } from '@mui/material';
import { AdminHeader } from '../AdminHeader/admin-header'

export const AdminPage = (): React.ReactElement => {
    return (
        <Box sx={{ padding: "4rem 4rem 0 4rem" }}>
            <AdminHeader />
        </Box>
    )
}