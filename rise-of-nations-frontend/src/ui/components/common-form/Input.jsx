import React from "react";
import { TextField } from "@mui/material";

export const Input = ({ name, label, formik, disableErrors = false, ...props }) => {
    return (
        <TextField
            id={name}
            name={name}
            label={label}
            value={formik.values[name]}
            onChange={formik.handleChange}
            error={!disableErrors && formik.touched[name] && Boolean(formik.errors[name])}
            helperText={!disableErrors && formik.touched[name] && formik.errors[name]}
            {...props}
        />
    );
};
