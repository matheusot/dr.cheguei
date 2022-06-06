import { Typography } from "@mui/material";
import { InlineFlexWrapper, TextFieldSegment } from "../../styles";

export const SegmentedTextField = (
    props: {
        segments: number;
        separator: string | undefined
        separatorAt: number | undefined;
    }): React.ReactElement => {

    const textFieldLength = props.separatorAt ? props.segments + 1 : props.segments;

    return (
        <InlineFlexWrapper>
            {
                Array(textFieldLength).fill(null).map(
                    (_, index) => props.separatorAt && index === props.separatorAt ? 
                    <Typography key={index} variant="h3" align="center" sx={{ padding: "0 5px" }}>{props.separator}</Typography>
                    :
                    <TextFieldSegment key={index}/>
                )
            }
        </InlineFlexWrapper>
    )
}