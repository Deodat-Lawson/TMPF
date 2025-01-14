"use client";

import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Settings } from "lucide-react";

interface SettingsMenuProps {
  onManageTasks: () => void;
  onShowStatistics: () => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({
                                                     onManageTasks,
                                                     onShowStatistics,
                                                   }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleManageTasks = () => {
    handleCloseMenu();
    onManageTasks();
  };

  const handleShowStats = () => {
    handleCloseMenu();
    onShowStatistics();
  };

  return (
    <>
      <IconButton onClick={handleOpenMenu} style={{ color: "white" }}>
        <Settings />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={handleManageTasks}>Manage Tasks</MenuItem>
        <MenuItem onClick={handleShowStats}>Show Statistics</MenuItem>
      </Menu>
    </>
  );
};

export default SettingsMenu;
