import { Box } from "@mui/material";
import { DrChegueiSubtitle, DrChegueiTitle } from "../../styles";

export const Header = (): React.ReactElement => {
    return (
        <Box>
            <DrChegueiTitle variant="h3"/>
            <DrChegueiSubtitle variant="h6"/>
        </Box>
    )
}