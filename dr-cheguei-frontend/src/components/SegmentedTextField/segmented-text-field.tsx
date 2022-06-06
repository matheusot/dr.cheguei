import { Box, Typography } from "@mui/material";
import { InlineFlexWrapper, TextFieldSegment, DrChegueiText } from "../../styles";

export const SegmentedTextField = (
    props: {
        segments: number;
        separator: string | undefined
        separatorAt: number | undefined;
    }): React.ReactElement => {

    const textFieldLength = props.separatorAt ? props.segments + 1 : props.segments;

    return (
        <Box sx={{ m: "10vh 0", width: "100%" }}>
            <DrChegueiText variant="body2" align="left" sx={{ mb: "10px"}}>Insira seu código HC</DrChegueiText>
            <InlineFlexWrapper>
                
                {
                    Array(textFieldLength).fill(null).map(
                        (_, index) => {
                            if (props.separatorAt && index === props.separatorAt)
                                return <Typography key={index} variant="h3" align="center" sx={{ padding: "0 5px" }}>{props.separator}</Typography>
                            if (index == 0)
                                return <TextFieldSegment key={index} disabled={true} value="H" sx={{ m: "0 2.5px" }} />
                            if (index == 1)
                                return <TextFieldSegment key={index} disabled={true} value="C" sx={{ m: "0 2.5px" }} />
                            return <TextFieldSegment key={index} sx={{ m: "0 2.5px" }} />
                        }
                    )
                }
            </InlineFlexWrapper>
        </Box>
    )
}