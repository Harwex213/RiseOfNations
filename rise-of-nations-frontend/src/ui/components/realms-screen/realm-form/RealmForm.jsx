import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Alert,
    Box,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { realms } from "../../../../common/localization";
import { ui } from "../../../../common/constants";
import { Input } from "../../common/Input";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const form = {
    fields: {
        id: "id",
        name: "name",
        description: "description",
        modificatorId: "modificatorId",
    },
    constraints: {
        description: {
            maxLength: 128,
        },
    },
    validationSchema: yup.object({
        name: yup.string().required(realms.validationSchema.name.required),
        description: yup.string().required(realms.validationSchema.description.required),
        modificatorId: yup.number().nullable().required(realms.validationSchema.modificatorId.required),
    }),
};

export const RealmForm = ({ isUpdate, initialValues, onSubmit, ...props }) => {
    const navigate = useNavigate();
    const [notificationState, setNotificationState] = useState({
        isOpen: false,
        message: "",
    });
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: form.validationSchema,
        onSubmit: async (values) => {
            try {
                await onSubmit(values);
            } catch (e) {
                setNotificationState({
                    isOpen: true,
                    message: e.message,
                });
            }
        },
    });
    const handleNotificationClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setNotificationState({
            isOpen: false,
            message: notificationState.message,
        });
    };

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={2}
            {...props}
        >
            <Box gridColumn="span 3">
                <Button
                    component="label"
                    variant="outlined"
                    startIcon={<UploadFileIcon />}
                    sx={{ width: "100%", height: 330 }}
                >
                    {realms.fields.flagImage}
                    <input type="file" accept=".csv" hidden onChange={null} />
                </Button>
            </Box>
            <Box gridColumn="span 9">
                {isUpdate && (
                    <TextField sx={{ display: "none" }} name={form.fields.id} value={formik.values.id} />
                )}
                <Input
                    label={realms.fields.name}
                    name={form.fields.name}
                    formik={formik}
                    margin="normal"
                    fullWidth
                    sx={{ mt: 0 }}
                />
                <Input
                    label={realms.fields.description}
                    name={form.fields.description}
                    formik={formik}
                    margin="normal"
                    fullWidth
                    multiline
                    minRows={4}
                    inputProps={{ maxLength: form.constraints.description }}
                />
                <FormControl
                    sx={{ mt: 2, mb: 0 }}
                    fullWidth
                    error={formik.touched.modificatorId && Boolean(formik.errors.modificatorId)}
                >
                    <InputLabel id={`${form.fields.modificatorId}-modificator`}>
                        {realms.fields.modificatorId}
                    </InputLabel>
                    <Select
                        label={realms.fields.modificatorId}
                        labelId={`${form.fields.modificatorId}-modificator`}
                        id={form.fields.modificatorId}
                        name={form.fields.modificatorId}
                        value={formik.values.modificatorId}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value={""}>{realms.fields.modificatorIdDefault}</MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <FormHelperText>
                        {formik.touched.modificatorId && formik.errors.modificatorId}
                    </FormHelperText>
                </FormControl>
            </Box>
            <Box gridColumn="span 12" display="flex">
                <Button type="submit" variant="contained" sx={{ mr: "auto" }}>
                    {isUpdate ? realms.realmFormActions.updateRealm : realms.realmFormActions.createRealm}
                </Button>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={notificationState.isOpen}
                autoHideDuration={ui.errorNotificationTimeLife}
                onClose={handleNotificationClose}
            >
                <Alert onClose={handleNotificationClose} severity="error" sx={{ width: "100%" }}>
                    {notificationState.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};
