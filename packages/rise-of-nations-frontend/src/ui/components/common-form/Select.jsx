import React from "react";
import { Select as MuiSelect, FormControl, FormHelperText, InputLabel } from "@mui/material";

export const Select = ({ name, label, formik, children, ...props }) => {
    return (
        <FormControl error={formik.touched[name] && Boolean(formik.errors[name])} {...props}>
            <InputLabel id={`${name}-modificator`}>{label}</InputLabel>
            <MuiSelect
                label={label}
                labelId={`${name}-modificator`}
                id={name}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
            >
                {children}
            </MuiSelect>
            <FormHelperText>{formik.touched[name] && formik.errors[name]}</FormHelperText>
        </FormControl>
    );
};
