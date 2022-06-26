import { Box } from "@mui/material";
import { DrChegueiSubtitle, DrChegueiTitle } from "../../styles";

export const DrChegueiHeader = (): React.ReactElement => {
    return (
        <Box>
            <DrChegueiTitle variant="h3" mb={2}/>
            <DrChegueiSubtitle variant="h6" align="left">
                Evite filas avisando o seu médico que você está pronto para ser atendido em sua consulta agendada.
            </DrChegueiSubtitle>
        </Box>
    )
}