import React, { useState } from "react";
import { Input } from "../../components";
import { gamesScreen, validationRequiredMessage } from "../../../common/localization";
import { Box, MenuItem } from "@mui/material";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import { suspenseServiceError } from "../../../common/utils";
import { gameService, gamesService } from "../../../services";
import * as yup from "yup";
import { Select } from "../../components";
import { useNavigate } from "react-router-dom";
import { stores } from "../../../store";
import { routes } from "../../../common/constants";
import LoadingButton from "@mui/lab/LoadingButton";

const userStore = stores.user;

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
        name: yup.string().required(validationRequiredMessage(gamesScreen.fieldLabels.name)),
        playersAmount: yup
            .number()
            .required(validationRequiredMessage(gamesScreen.fieldLabels.playersAmount)),
        turnDuration: yup.number().required(validationRequiredMessage(gamesScreen.fieldLabels.turnDuration)),
    }),
};

export const CreateGame = ({ sx }) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [isFetching, setIsFetching] = useState(false);
    const formik = useFormik({
        initialValues: form.initialValues,
        validationSchema: form.validationSchema,
        onSubmit: suspenseServiceError(
            async (values) => {
                if (userStore.user.isAuthenticated === false) {
                    navigate(routes.login);
                    return;
                }
                setIsFetching(true);
                await gameService.createGame(values);
                gamesService.unsubscribeFromGameList();
                setIsFetching(false);
                navigate(routes.gamesNested.preparing);
            },
            { notify: enqueueSnackbar, onError: () => setIsFetching(false) }
        ),
    });

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ ...sx, display: "flex", flexDirection: "column" }}
        >
            <Input
                label={gamesScreen.fieldLabels.name}
                name={form.fields.name}
                formik={formik}
                margin="normal"
                fullWidth
            />
            <Select
                label={gamesScreen.fieldLabels.playersAmount}
                name={form.fields.playersAmount}
                formik={formik}
                margin="normal"
                fullWidth
            >
                {form.optionValues.playersAmount.map((value) => (
                    <MenuItem key={value} value={value}>
                        {gamesScreen.fieldOptions.playersAmount(value)}
                    </MenuItem>
                ))}
            </Select>
            <Select
                label={gamesScreen.fieldLabels.turnDuration}
                name={form.fields.turnDuration}
                formik={formik}
                margin="normal"
                fullWidth
            >
                {form.optionValues.turnDuration.map((value) => (
                    <MenuItem key={value} value={value}>
                        {gamesScreen.fieldOptions.turnDuration(value)}
                    </MenuItem>
                ))}
            </Select>
            <LoadingButton
                type="submit"
                fullWidth
                variant="outlined"
                loading={isFetching}
                sx={{ mt: 3, mb: 2 }}
            >
                {gamesScreen.gameList.actions.createGame}
            </LoadingButton>
        </Box>
    );
};
