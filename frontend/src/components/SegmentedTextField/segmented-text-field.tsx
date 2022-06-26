import { Box, Typography } from "@mui/material";
import { InlineFlexWrapper, TextFieldSegment, DrChegueiText } from "../../styles";


export const SegmentedTextField = (
    props: {
        segments: number
        separator: string | undefined
        separatorAt: number | undefined
    }): React.ReactElement => {

    const textFieldLength = props.separatorAt ? props.segments + 1 : props.segments;
    const onlyNumbers = /^[0-9]+$/;
    let deleteCounter = 0;

    return (
        <Box sx={{ my: "1rem", width: "100%" }}>
            <InlineFlexWrapper>
                {
                    Array(textFieldLength).fill(null).map(
                        (_, index) => {
                            if (props.separatorAt && index === props.separatorAt)
                                return <Typography key={index} variant="h3" align="center"
                                        sx={{ padding: "0 0.4rem" }}>{props.separator}</Typography>
                            else if (index === 0)
                                return <TextFieldSegment key={index} disabled={true} value="H"
                                        sx={{ m: "0 0.2rem" }} />
                            else if (index === 1)
                                return <TextFieldSegment key={index} disabled={true} value="C"
                                        sx={{ m: "0 0.2rem" }} />
                            return <TextFieldSegment
                                    id={`segment${index}`}
                                    key={index}
                                    sx={{ m: "0 0.2rem" }}
                                    className="hc-text"
                                    type="text"
                                    inputMode="numeric"
                                    autoFocus={index === 3}
                                    inputProps={{maxLength: 1}}
                                    onChange={(change) => {
                                        if (!onlyNumbers.test(change.target.value)) {
                                            change.target.value = "";
                                        } else if (change.target.value !== "" && index < textFieldLength - 1) {
                                            let id = `segment${index + 1}`;
                                            document.getElementById(id)?.focus();
                                        }
                                    }}
                                    onKeyUp={(keyObject) => {
                                        deleteCounter = keyObject.code === "Backspace" || keyObject.code === "Delete" ? deleteCounter + 1 : 0;
                                        if (deleteCounter === 2 && index > 3) {
                                            deleteCounter = 0;
                                            let id = `segment${index - 1}`;
                                            document.getElementById(id)?.focus();
                                        }
                                    }}
                                />
                        }
                    )
                }
            </InlineFlexWrapper>
        </Box>
    )
}