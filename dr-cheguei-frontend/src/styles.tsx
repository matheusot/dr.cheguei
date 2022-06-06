import { OutlinedInput, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MuiButton, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const primaryColor = "#BA2121";
const textColor = "#464646";
const fieldColor = "#E9E9E9";
const defaultBorderRadius = 5;

export const PrimaryButton = styled(MuiButton)<ButtonProps>(({ theme }) => ({
    borderRadius: defaultBorderRadius,
    backgroundColor: primaryColor,
    width: "100%",
    '&:hover': {
        backgroundColor: "#ab1818",
    },
}));

export const SecondaryButton = styled(MuiButton)<ButtonProps>(({ theme }) => ({
    borderRadius: defaultBorderRadius,
    color: primaryColor,
    backgroundColor: fieldColor,
    width: "100%",
    '&:hover': {
        backgroundColor: "#E1E1E1",
    },
}));

export const ImageBox = styled(Box)`
    display: flex;
    flex-grow: 1;
    height: 100vh;
    background-image: url(${(props: { image: string }) => process.env.PUBLIC_URL + props.image});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
`;

export const InlineFlexWrapper = styled(Box)`
    display: inline-flex;
    width: 100%;
    flex-grow: 1;
    align-items: center;
    justify-content: space-between;
    max-height: 90px;
`;
    
export const TextFieldSegment = styled(OutlinedInput)`
    border-radius: ${defaultBorderRadius}px;
    width: 80px;
    height: 80px;
    font-size: 2.5rem;
    background-color: ${fieldColor};
    color: ${textColor};
    input {
        padding: 0;
        text-align: center;
        text-transform: uppercase;
    }
    input:disabled {
        text-fill-color: ${textColor};
    }
`;

export const DrChegueiTitle = styled(Typography)`
    & {
        font-weight: 900;
        margin-bottom: 10px;
    }
    &::before {
        content: 'Dr.';
        color: #000;
    }
    &::after {
        content: 'Cheguei';
        color: ${primaryColor};
    }
`;

export const DrChegueiSubtitle = styled(Typography)`
    &::before {
        font-size: 24px;
        font-weight: 400;
        line-height: 20px;
        content: 'Evite filas avisando o seu médico que você está pronto para ser atendido em sua consulta agendada.';
        color: ${textColor};
    }
`;

export const DrChegueiText = styled(Typography)`
    font-size: 24px;
    font-weight: 400;
    line-height: 20px;
    text-align: left;
    color: ${textColor};
`;