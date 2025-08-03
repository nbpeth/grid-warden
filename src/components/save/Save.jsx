import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useMatrixProvider } from "../../hooks/useMatrixProvider";
import axios from "axios";
import SaveIcon from "@mui/icons-material/Save";
import { useColorSelector } from "../../hooks/useColorSelector";

export const SaveButtonModal = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { matrices, setMatricesProperties, isAnimating } = useMatrixProvider();
  const { colorPalette } = useColorSelector();

  const [formData, setFormData] = useState({
    projectName: matrices?.projectName ?? "",
    userName: matrices?.username ?? "",
  });

  useEffect(() => {
    const projectName = matrices?.projectName;
    const username = matrices?.username;
    if (!projectName) {
      return;
    }
    if (
      formData?.projectName !== projectName ||
      formData?.userName != username
    ) {
      setFormData({ ...formData, projectName, userName: username });
    }
  }, [matrices]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateSave = async (matrices, colorPalette) => {
    setLoading(true);

    const response = await axios.put(`/api/v1/matrices/${matrices?.id}`, {
      data: { ...matrices, colorPalette },
      ...formData,
    });
    const { id, matrix_name, username } = response?.data;

    setMatricesProperties({ id, projectName: matrix_name, username });

    setLoading(false);
    setFormData({ projectName: "", userName: "" });
    setOpen(false);
  };

  const handleSaveNew = async (colorPalette) => {
    setLoading(true);

    const response = await axios.put("/api/v1/matrices", {
      data: { ...matrices, colorPalette },
      ...formData,
    });
    const { id, matrix_name, username } = response?.data;

    setMatricesProperties({ id, projectName: matrix_name, username });

    setLoading(false);
    setFormData({ projectName: "", userName: "" });
    setOpen(false);
  };

  const handleCancel = () => {
    setFormData({ projectName: "", userName: "" });
    setOpen(false);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    p: 0,
  };

  return (
    <div className="p-8">
      <Tooltip title="Save Current Project" arrow placement="right">
        <IconButton disabled={isAnimating} onClick={handleClickOpen}>
          <SaveIcon
            sx={{
              fontSize: "xxx-large",
              cursor: "pointer",
              transition: "color 0.5s ease, transform 0.5s ease",
              "&:hover": {
                color: "primary.main",
                transform: "scale(1.5)",
              },
            }}
          />
        </IconButton>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="save-modal-title"
        aria-describedby="save-modal-description"
      >
        <Box sx={modalStyle}>
          <Box sx={{ px: 3, py: 2, borderBottom: "1px solid #e0e0e0" }}>
            <Typography id="save-modal-title" variant="h6" component="h2">
              Save Project
            </Typography>
          </Box>

          <Box
            sx={{
              px: 3,
              py: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              id="projectName"
              name="projectName"
              label="Project Name"
              value={formData.projectName}
              onChange={handleInputChange}
              required
              fullWidth
              variant="outlined"
              placeholder="Enter project name"
            />

            <TextField
              id="userName"
              name="userName"
              label="User Name (optional)"
              value={formData.userName}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              placeholder="Enter user name"
            />
          </Box>

          <Box
            sx={{
              px: 3,
              py: 2,
              borderTop: "1px solid #e0e0e0",
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
            }}
          >
            <Button
              onClick={handleCancel}
              color="inherit"
              variant="outlined"
              disabled={loading}
            >
              Cancel
            </Button>
            {matrices?.id && (
              <Button
                onClick={() => handleUpdateSave(matrices, colorPalette)}
                disabled={!formData.projectName.trim() || loading}
                color="primary"
                variant="contained"
              >
                Update and Save
              </Button>
            )}

            <Button
              onClick={() => handleSaveNew(colorPalette)}
              disabled={!formData.projectName.trim() || loading}
              color="secondary"
              variant="contained"
            >
              Save New
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
