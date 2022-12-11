import React from "react";
import { Avatar, Box, Grid, Link } from "@mui/material";
import { useFormik } from "formik";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { login } from "../../../common/localization";
import { routes } from "../../../common/constants";
import * as yup from "yup";
import { authenticationService } from "../../../services";
import { Input } from "../../components";
import { useSnackbar } from "notistack";
import { suspenseServiceError } from "../../../common/utils";

const form = {
    fields: {
        username: "username",
        password: "password",
    },
    initialValues: {
        username: "",
        password: "",
    },
    validationSchema: yup.object({
        username: yup.string().required(login.validationSchema.username.required),
        password: yup.string().required(login.validationSchema.password.required),
    }),
};

export const LoginScreen = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const formik = useFormik({
        initialValues: form.initialValues,
        validationSchema: form.validationSchema,
        onSubmit: suspenseServiceError(async (values) => {
            await authenticationService.login(values);
        }, enqueueSnackbar),
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
                {login.pageTitle}
            </Typography>
            <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ mt: 1, width: "40%", height: "100%", display: "flex", flexDirection: "column" }}
            >
                <Input
                    label={login.fields.username}
                    name={form.fields.username}
                    formik={formik}
                    margin="normal"
                    fullWidth
                    autoFocus
                />
                <Input
                    label={login.fields.password}
                    name={form.fields.password}
                    formik={formik}
                    margin="normal"
                    fullWidth
                    type="password"
                />
                <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
                    {login.submitButton}
                </Button>
                <Grid container>
                    <Grid>
                        <Link
                            component="button"
                            type="button"
                            variant="body2"
                            onClick={() => navigate(routes.registration)}
                        >
                            {login.registrationProposal}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
