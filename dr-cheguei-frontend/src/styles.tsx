import { OutlinedInput, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MuiButton, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const primaryColor = "#BA2121";
const defaultBorderRadius = 5;

export const PrimaryButton = styled(MuiButton)<ButtonProps>(({ theme }) => ({
    borderRadius: defaultBorderRadius,
    backgroundColor: primaryColor,
    '&:hover': {
        backgroundColor: "#ab1818",
    },
}));

export const ImageBox = styled(Box)`
    display: flex;
    flex-grow: 1;
    height: 100vh;
    background-image: url(${(props: { image: string }) => process.env.PUBLIC_URL + props.image});
    background-repeat: no-repeat;
    background-size: cover;
`;

export const InlineFlexWrapper = styled(Box)`
    display: inline-flex;
    flex-grow: 1;
    align-items: center;
`;
    
export const TextFieldSegment = styled(OutlinedInput)`
    border-radius: ${defaultBorderRadius}px;
    width: 64px;
    height: 82px;
    font-size: 2.5rem;
    .MuiOutlinedInput-input {
        text-align: center;
        text-transform: uppercase;
    }
`;

export const DrChegueiTitle = styled(Typography)`
    &::before {
        content: 'Dr.Cheguei';
        color: ${primaryColor};
    }
`;

export const DrChegueiSubtitle = styled(Typography)`
    &::before {
        content: 'Evite filas avisando o seu médico que você está pronto para ser atendido em sua consulta agendada.';
    }
`;