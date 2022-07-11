import { Box } from "@mui/material";
import { DrChegueiSubtitle, DrChegueiTitle } from "../../styles";

interface DrChegueiHeaderProps {
    subtitle: string;
}

export const DrChegueiHeader = ({ subtitle }: DrChegueiHeaderProps): React.ReactElement => {
    return (
        <Box>
            <DrChegueiTitle variant="h3" mb={2}/>
            <DrChegueiSubtitle variant="h6" align="left">{subtitle}</DrChegueiSubtitle>
        </Box>
    )
}