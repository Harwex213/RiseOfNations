import React from "react";
import { Box } from "@mui/material";
import * as yup from "yup";
import { chatComponent, validationRequiredMessage } from "../../../common/localization";
import { Input } from "../../components";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import { suspenseServiceError } from "../../../common/utils";
import { gameService } from "../../../services";

const form = {
    fields: {
        message: "message",
    },
    initialValues: {
        message: "",
    },
    validationSchema: yup.object({
        message: yup.string().required(validationRequiredMessage(chatComponent.messageFieldLabel)),
    }),
};

export const MessageInput = () => {
    const { enqueueSnackbar } = useSnackbar();
    const formik = useFormik({
        initialValues: form.initialValues,
        validationSchema: form.validationSchema,
        onSubmit: suspenseServiceError(
            async ({ message }, formikBag) => {
                await gameService.sendMessageToChat(message);
                formikBag.resetForm();
            },
            {
                notify: enqueueSnackbar,
            }
        ),
    });

    return (
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: "auto" }}>
            <Input
                label={chatComponent.messageFieldLabel}
                name={form.fields.message}
                formik={formik}
                disableErrors
                margin="none"
                fullWidth
                variant="standard"
                autoComplete="off"
            />
        </Box>
    );
};
