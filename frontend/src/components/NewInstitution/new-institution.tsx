import { Box, Fade, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { LoginGrid } from "../LoginGrid/login-grid";
import { NewInstitutionCode } from "./new-institution-code";
import { ReactElement, useState } from "react";
import { NewInstitutionFormPage } from "./new-institution-form-page";
import { useNavigate } from "react-router-dom";


export const NewInstitution = (): ReactElement => {

    const [showNewInstitutionCodePage, setShowNewInstitutionCodePage] = useState(true);
    const [showDrFormPage, setShowDrFormPage] = useState(false);

    const continueFunction = (): void => {
        setShowNewInstitutionCodePage(false);
        setShowDrFormPage(true);
    }

    const navigate = useNavigate();

    return (
        <LoginGrid imageUrl="/adminImage.svg">
            <Box>
                <Box sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
                    <IconButton
                        aria-label="Fechar"
                        onClick={() => navigate("/admin-login")}
                        size="large"
                    >
                        <CloseIcon aria-label="Fechar"/>
                    </IconButton>
                </Box>
                <Fade in={showNewInstitutionCodePage}>
                    <Box>
                        <NewInstitutionCode continueFunction={continueFunction}/>
                    </Box>
                </Fade>
                <Fade in={showDrFormPage}>
                    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                        <NewInstitutionFormPage />
                    </Box>
                </Fade>
            </Box>
        </LoginGrid>
    )
}