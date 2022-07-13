import { Box, Typography } from "@mui/material";
import { InlineFlexWrapper, TextFieldSegment } from "../../styles";

interface SegmentedTextFieldProps {
    segments: number;
    separator?: string;
    separatorAt?: number;
    defaultValuesString?: string;
    defaultValuesAt?: number[];
    autoFocusOn: number;
}

export const SegmentedTextField = ({ segments, separator, separatorAt, defaultValuesString, defaultValuesAt, autoFocusOn }: SegmentedTextFieldProps): React.ReactElement => {

    const textFieldLength = separatorAt ? segments + 1 : segments;
    const onlyNumbers = /^[0-9]+$/;
    let deleteCounter = 0;
    let defaultValuesArray: string[];

    if (defaultValuesString && defaultValuesAt)
        defaultValuesArray = defaultValuesString.split("");

    return (
        <Box sx={{ my: "1rem", width: "100%" }}>
            <InlineFlexWrapper>
                {
                    Array(textFieldLength).fill(null).map(
                        (_, index) => {
                            if (separatorAt && index === separatorAt)
                                return <Typography key={index} variant="h3" align="center"
                                        sx={{ padding: "0 0.4rem" }}>{separator}</Typography>
                            else if (defaultValuesArray && defaultValuesAt?.includes(index))
                                return <TextFieldSegment key={index} disabled={true} value={defaultValuesArray.splice(0, 1)} sx={{ m: "0 0.2rem" }} />
                            return <TextFieldSegment
                                    id={`segment${index}`}
                                    key={index}
                                    sx={{ m: "0 0.2rem" }}
                                    className="hc-text"
                                    type="text"
                                    inputMode="numeric"
                                    autoFocus={index === autoFocusOn}
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
                                        if (deleteCounter === 2 && index > autoFocusOn) {
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