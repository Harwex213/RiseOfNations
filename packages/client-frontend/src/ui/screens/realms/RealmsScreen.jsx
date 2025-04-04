import React from "react";
import { Box } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { CreateRealm, RealmList, UpdateRealm } from "../../containers";
import { routes } from "../../../common/constants";

export const RealmsScreen = () => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                maxHeight: "100%",
                overflowY: "auto",
                overflowX: "hidden",
                p: 2,
                pb: 0,
            }}
        >
            <Routes>
                <Route path={routes.realmsNested.index} element={<RealmList />} />
                <Route path={routes.realmsNested.createRealm} element={<CreateRealm />} />
                <Route path={routes.realmsNested.updateRealm} element={<UpdateRealm />} />
                <Route path="*" element={<Navigate to={routes.realmsNested.index} replace={true} />} />
            </Routes>
        </Box>
    );
};
