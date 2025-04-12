import { FormControl, FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { Container } from "../matrix/Matrix";
import { useColorSelector } from "../../hooks/useColorSelector";

export const ColorSelector = () => {
    const { colorPalette, handleSelectedColorChange, handleColorSelectorValueChange, selectedColor } = useColorSelector();
    
    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={selectedColor}
                onChange={handleSelectedColorChange}
            >
                <Container>
                    <Grid Container direction="cell">
                        {colorPalette?.map((color, i) => {
                            return (
                                <Grid container item key={`${i}-${color}`} spacing={2}>
                                    <Grid item>
                                        <FormControlLabel
                                            value={i + 1}
                                            control={<Radio key={`${i}-${color}}`} />}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <input
                                            type="color"
                                            value={color}
                                            onChange={(e) => handleColorSelectorValueChange(i, e?.target?.value)}
                                        ></input>
                                    </Grid>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Container>
            </RadioGroup>
        </FormControl>
    );
};