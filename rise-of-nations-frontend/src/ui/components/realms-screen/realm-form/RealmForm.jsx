import React, { useState } from "react";
import { Box, Chip, MenuItem, Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { realms } from "../../../../common/localization";
import { Input, Select } from "../../index";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useSnackbar } from "notistack";
import { fileToBase64, suspenseServiceError } from "../../../../common/utils";
import LoadingButton from "@mui/lab/LoadingButton";
import { stores } from "../../../../store";
import { useNavigate } from "react-router-dom";

const globalGameInfo = stores.globalGameInfo;

const form = {
    fields: {
        id: "id",
        name: "name",
        description: "description",
        modificatorId: "modificatorId",
        flag: "flag",
    },
    constraints: {
        description: {
            maxLength: 128,
        },
    },
    validationSchema: yup.object({
        name: yup.string().required(realms.validationSchema.name.required),
        description: yup.string(),
        modificatorId: yup.number().nullable().required(realms.validationSchema.modificatorId.required),
    }),
};

export const RealmForm = ({ isUpdate, initialValues, onSubmit, ...props }) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [isFetching, setIsFetching] = useState(false);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: form.validationSchema,
        onSubmit: suspenseServiceError(
            async (values) => {
                setIsFetching(true);
                if (values.flag) {
                    values.flagFileName = values.flag.name;
                    const result = await fileToBase64(values.flag);
                    values.flagBase64 = result.split("base64,")[1];
                }
                delete values.flag;
                await onSubmit(values);
                setIsFetching(false);
                navigate("..");
            },
            { notify: enqueueSnackbar, onError: () => setIsFetching(false) }
        ),
    });

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={2}
            {...props}
        >
            <Box gridColumn="span 12">
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
                <Select
                    label={realms.fields.modificatorId}
                    name={form.fields.modificatorId}
                    formik={formik}
                    margin="normal"
                    fullWidth
                >
                    <MenuItem value={""}>{realms.fields.modificatorIdDefault}</MenuItem>
                    {globalGameInfo.modificators.map((modificator) => (
                        <MenuItem key={modificator.id} value={modificator.id}>
                            {modificator.name}. {modificator.description}
                        </MenuItem>
                    ))}
                </Select>
                <Stack spacing={2} direction="row" sx={{ mt: 2, mb: 1, alignItems: "center" }}>
                    <Button component="label" variant="outlined" startIcon={<UploadFileIcon />}>
                        {realms.fields.flagImage}
                        <input
                            type="file"
                            accept=".png,.jpg,.jpeg,.webp"
                            hidden
                            onChange={(event) => {
                                formik.setFieldValue("flag", event.currentTarget.files[0]);
                                setIsFileUploaded(true);
                            }}
                        />
                    </Button>
                    {isFileUploaded && <Chip label="Uploaded" color="success" />}
                </Stack>
            </Box>
            {/*<Box gridColumn="span 3"></Box>*/}
            <Box gridColumn="span 12" display="flex">
                <LoadingButton type="submit" variant="contained" loading={isFetching} sx={{ mr: "auto" }}>
                    {isUpdate ? realms.realmFormActions.updateRealm : realms.realmFormActions.createRealm}
                </LoadingButton>
            </Box>
        </Box>
    );
};
