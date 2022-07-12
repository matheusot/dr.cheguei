import { OutlinedInput, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MuiButton, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const primaryColor = "#BA2121";
const hoverPrimaryColor = "#ab1818";
const successColor = "#21BA71"
const textColor = "#464646";
const fieldColor = "#E9E9E9";
const defaultBorderRadius = 5;
const RounderBorderRadius = 25;

export const PrimaryButton = styled(MuiButton)<ButtonProps>(({ theme }) => ({
    borderRadius: defaultBorderRadius,
    backgroundColor: primaryColor,
    fontSize: "1.1rem",
    fontWeight: "700",
    width: "100%",
    '&:hover': {
        backgroundColor: hoverPrimaryColor,
    },
}));

export const SecondaryButton = styled(MuiButton)<ButtonProps>(({ theme }) => ({
    borderRadius: defaultBorderRadius,
    color: primaryColor,
    backgroundColor: fieldColor,
    fontSize: "1.1rem",
    fontWeight: "900",
    width: "100%",
    '&:hover': {
        backgroundColor: "#E1E1E1",
    },
}));

export const RoundedPrimaryButton = styled(MuiButton)<ButtonProps>(({ theme }) => ({
    borderRadius: RounderBorderRadius,
    backgroundColor: primaryColor,
    fontSize: "1.1rem",
    fontWeight: "700",
    width: "100%",
    maxWidth: "315px",
    '&:hover': {
        backgroundColor: hoverPrimaryColor,
    },
}));

export const RoundedSecondaryButton = styled(MuiButton)<ButtonProps>(({ theme }) => ({
    borderRadius: RounderBorderRadius,
    color: primaryColor,
    backgroundColor: fieldColor,
    fontSize: "1.1rem",
    fontWeight: "700",
    width: "100%",
    maxWidth: "315px",
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
    max-height: 5rem;
`;
    
export const TextFieldSegment = styled(OutlinedInput)`
    border-radius: ${defaultBorderRadius}px;
    width: 5rem;
    height: 5rem;
    font-size: 2.5rem;
    background-color: ${fieldColor};
    color: ${textColor};
    input {
        padding: 0;
        margin: 0;
        text-align: center;
        text-transform: uppercase;
        -webkit-appearance: none;
        -moz-appearance: textfield;
    }
    input:disabled {
        text-fill-color: ${textColor};
    }
`;

export const DrChegueiTitle = styled(Typography)`
    & {
        font-weight: 900;
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

export const MoreInfoTitle = styled(Typography)`
    & {
        font-weight: 900;
        margin-bottom: 1rem;
    }
    &::after {
        content: 'Como podemos ajudar?';
        color: ${primaryColor};
    }
`;


export const DrChegueiSubtitle = styled(Typography)`
    font-size: 1.3rem;
    font-weight: 400;
    line-height: 1.5rem;
    color: ${textColor};
`;

export const DrChegueiText = styled(Typography)`
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1rem;
    color: ${textColor};
`;

export const DrChegueiToastTitle = styled(Typography)`
    font-size: 1.5rem;
    line-height: 1.5rem;
    font-weight: 900;    
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    color: ${primaryColor};
`;

export const DrChegueiToastSubtitle = styled(Typography)`
    font-size: 0.8rem;
    font-weight: 900;
    font-height: 1rem;
    color: #000;
`;

export const DrChegueiToastText = styled(Typography)`
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.2rem;
    color: ${textColor};
`;

export const DrChegueiToastStatus = styled(Typography)`
    font-size: 1.3rem;
    font-size: 1.3rem;
    font-weight: 900;
    color: ${primaryColor};
    `;

export const DrChegueiToastDescription = styled(Typography)`
    font-size: 1.0rem;
    line-height: 1.1rem; 
    color: ${textColor};
    `;

export const DrChegueiToastQueuePosition = styled(Box)<{ timeToGo: boolean}>`
    display: flex;
    flex-direction: ${props => props.timeToGo ? "row" : "column"};
    text-align: center;
    align-items: center;
    width: 49px;
    height: 49px;
    border-radius: 100%;
    background-color: ${props => props.timeToGo ? successColor : primaryColor};
    font-size: ${props => props.timeToGo ? "inherit" : "2rem"};
    text-transform: uppercase;
    color: white;
    font-weight: 900;
`;

export const DialogPaper = styled(Paper)`
    border-radius: 20px;
`;