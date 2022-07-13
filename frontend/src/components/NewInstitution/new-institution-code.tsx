import { ReactElement } from "react";
import { DrChegueiHeader } from "../DrChegueiHeader/dr-cheguei-header";
import { SegmentedTextField } from "../SegmentedTextField/segmented-text-field";
import { DrChegueiText, PrimaryButton } from "../../styles";

interface NewInstitutionCodeProps {
    continueFunction: Function;
}

export const NewInstitutionCode = ({ continueFunction }: NewInstitutionCodeProps): ReactElement => {
    return (
        <>
            <DrChegueiHeader
                subtitle="Para utilizar o Dr. Cheguei, seu consultório precisa estar atrelado a um hospital."
            />
            <DrChegueiText variant="body2">
                Insira o código de acesso da sua instituição.
            </DrChegueiText>
            <SegmentedTextField
                segments={6}
                autoFocusOn={0}
            />
            <PrimaryButton variant="contained" size="large" onClick={() => continueFunction()}>Continuar</PrimaryButton>
        </>
    )
}