import { forwardRef, ReactElement } from "react";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Slide } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from '@mui/icons-material/Close';
import { DialogPaper } from "../../styles";
import { DrForm } from "../DrForm/dr-form";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface UpdateProfileDialogProps {
    open: boolean
    setOpenFunction: Function
}

export const UpdateProfileDialog = ({ open, setOpenFunction }: UpdateProfileDialogProps): ReactElement => {
    return (
        <Dialog
            open={open}
            onClose={() => setOpenFunction(false)}
            TransitionComponent={Transition}   
            fullWidth 
            PaperComponent={DialogPaper}
        >
            <DialogContent sx={{ display: "flex", flexDirection: "column", padding: "3rem 2rem 3rem 2rem" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }} mb={5}>
                    <DialogTitle variant="h3" fontWeight={1000} sx={{ padding: 0, paddingBottom: "16px" }}>Atualizar Cadastro</DialogTitle>
                    <Box>
                        <IconButton
                            aria-label="Fechar"
                            onClick={() => setOpenFunction(false)}
                        >
                            <CloseIcon aria-label="Fechar"/>
                        </IconButton>
                    </Box>
                </Box>
                <DrForm />
            </DialogContent>
        </Dialog>
    )
}