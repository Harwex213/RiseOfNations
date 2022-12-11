import React from "react";
import { Input } from "../../components";
import { games, validationRequiredMessage } from "../../../common/localization";
import Button from "@mui/material/Button";
import { Box, MenuItem } from "@mui/material";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import { suspenseServiceError } from "../../../common/utils";
import { authenticationService } from "../../../services";
import * as yup from "yup";
import { Select } from "../../components";

const form = {
    fields: {
        name: "name",
        playersAmount: "playersAmount",
        turnDuration: "turnDuration",
    },
    initialValues: {
        name: "",
        playersAmount: 2,
        turnDuration: 1,
    },
    optionValues: {
        playersAmount: [2, 3, 4],
        turnDuration: [1, 3, 5],
    },
    validationSchema: yup.object({
        name: yup.string().required(validationRequiredMessage(games.fieldLabels.name)),
        playersAmount: yup.number().required(validationRequiredMessage(games.fieldLabels.playersAmount)),
        turnDuration: yup.number().required(validationRequiredMessage(games.fieldLabels.turnDuration)),
    }),
};

export const CreateGame = ({ sx }) => {
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
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ ...sx, display: "flex", flexDirection: "column" }}
        >
            <Input
                label={games.fieldLabels.name}
                name={form.fields.name}
                formik={formik}
                margin="normal"
                fullWidth
            />
            <Select
                label={games.fieldLabels.playersAmount}
                name={form.fields.playersAmount}
                formik={formik}
                margin="normal"
                fullWidth
            >
                {form.optionValues.playersAmount.map((value) => (
                    <MenuItem key={value} value={value}>
                        {games.fieldOptions.playersAmount(value)}
                    </MenuItem>
                ))}
            </Select>
            <Select
                label={games.fieldLabels.turnDuration}
                name={form.fields.turnDuration}
                formik={formik}
                margin="normal"
                fullWidth
            >
                {form.optionValues.turnDuration.map((value) => (
                    <MenuItem key={value} value={value}>
                        {games.fieldOptions.turnDuration(value)}
                    </MenuItem>
                ))}
            </Select>
            <Button type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
                {games.gameList.actions.createGame}
            </Button>
        </Box>
    );
};
