import React from "react";
import { Avatar, Box, Grid, Link } from "@mui/material";
import { useFormik } from "formik";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { registration } from "../../../common/localization";
import { routes } from "../../../common/constants";
import * as yup from "yup";
import { Input } from "../../components";
import { authenticationService } from "../../../services";
import { useSnackbar } from "notistack";
import { suspenseServiceError } from "../../../common/utils";

const form = {
    fields: {
        username: "username",
        email: "email",
        password: "password",
        repeatPassword: "repeatPassword",
    },
    initialValues: {
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
    },
    validationSchema: yup.object({
        username: yup.string().required(registration.validationSchema.username.required),
        password: yup.string().required(registration.validationSchema.password.required),
        email: yup.string().email(registration.validationSchema.email.invalid),
        repeatPassword: yup
            .string()
            .oneOf([yup.ref("password")], registration.validationSchema.repeatPassword.invalid)
            .required(registration.validationSchema.repeatPassword.required),
    }),
};

export const RegistrationScreen = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const formik = useFormik({
        initialValues: form.initialValues,
        validationSchema: form.validationSchema,
        onSubmit: suspenseServiceError(
            async (values) => {
                await authenticationService.register(values);
            },
            { notify: enqueueSnackbar }
        ),
    });

    return (
        <Box
            sx={{
                paddingTop: 8,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Avatar sx={{ m: 1, backgroundColor: "secondary.main" }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {registration.pageTitle}
            </Typography>
            <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ mt: 1, width: "40%", height: "100%", display: "flex", flexDirection: "column" }}
            >
                <Input
                    label={registration.fields.username}
                    name={form.fields.username}
                    formik={formik}
                    margin="normal"
                    fullWidth
                    autoFocus
                />
                <Input
                    label={registration.fields.email}
                    name={form.fields.email}
                    formik={formik}
                    margin="normal"
                    fullWidth
                />
                <Input
                    label={registration.fields.password}
                    name={form.fields.password}
                    formik={formik}
                    type="password"
                    margin="normal"
                    fullWidth
                />
                <Input
                    label={registration.fields.repeatPassword}
                    name={form.fields.repeatPassword}
                    formik={formik}
                    type="password"
                    margin="normal"
                    fullWidth
                />
                <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
                    {registration.submitButton}
                </Button>
                <Grid container>
                    <Grid>
                        <Link
                            component="button"
                            type="button"
                            variant="body2"
                            onClick={() => navigate(routes.login)}
                        >
                            {registration.registrationProposal}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
