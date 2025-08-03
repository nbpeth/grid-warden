import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Tooltip,
  Grid,
} from "@mui/material";
import { useMatrixProvider } from "../../hooks/useMatrixProvider";
import axios from "axios";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import RefreshIcon from "@mui/icons-material/Refresh";

export const LoadButtonModal = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    axios.get("/api/v1/matrices").then((result) => {
      setProjects(result.data);
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDeleteProject = async (projectId) => {
    axios.delete(`/api/v1/matrices/${projectId}`).then((r) => {
      setProjects(
        projects?.filter((p) => {
          return p.id !== projectId;
        })
      );
    });
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75vw",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    p: 0,
  };

  return (
    <div className="p-8">
      <Tooltip title="Open Saved Project" arrow placement="right">
        <FileOpenIcon
          onClick={handleClickOpen}
          sx={{
            fontSize: "xxx-large",
            cursor: "pointer",
            transition: "color 0.5s ease, transform 0.5s ease",
            "&:hover": {
              color: "secondary.main",
              transform: "scale(1.5)",
            },
          }}
        />
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="save-modal-title"
        aria-describedby="save-modal-description"
      >
        <Box sx={modalStyle}>
          <Box sx={{ px: 3, py: 2, borderBottom: "1px solid #e0e0e0" }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Typography id="save-modal-title" variant="h6" component="h2">
                  Explore Projects
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title="Open Saved Project" arrow placement="right">
                  <RefreshIcon
                    onClick={refreshData}
                    sx={{
                      fontSize: "xxx-large",
                      cursor: "pointer",
                      transition: "color 0.5s ease, transform 0.5s ease",
                      "&:hover": {
                        color: "secondary.main",
                        transform: "scale(1.5)",
                      },
                    }}
                  />
                </Tooltip>
              </Grid>
            </Grid>
          </Box>

          {/* Modal Content */}
          <Box
            sx={{
              px: 3,
              py: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <ProjectsExplorerTable
              projects={projects}
              handleDeleteProject={handleDeleteProject}
            />
          </Box>

          {/* Modal Actions */}
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
              variant="contained"
              disabled={loading}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ProjectsTable = ({ projects = [], handleDeleteProject }) => {
  const { loadMatrices } = useMatrixProvider();
  const handleOpenProject = async (projectId) => {
    const response = await axios.get(`/api/v1/matrices/${projectId}`);

    const data = response.data?.[0];
    // error handling and naming nonsense
    loadMatrices({
      id: data.id,
      data: data?.matrix_data?.data,
      projectName: data?.matrix_name,
      username: data?.username,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (projects.length === 0) {
    return (
      <div className="w-full p-8 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500 text-lg">No projects found</p>
        <p className="text-gray-400 text-sm mt-2">
          Create your first project to get started
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full table-auto" width="100%">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Updated
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Project Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.map((project, index) => (
            <tr
              key={project.id || index}
              className="hover:bg-gray-50 transition-colors"
              style={{ background: index % 2 === 0 ? "#222" : "none" }}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenProject(project.id)}
                  className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Load
                </Button>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {project.username || "Unknown"}
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {formatDate(project.updated_date)}
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {project.matrix_name || "Untitled Project"}
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <Tooltip title="Delete Project Forever" arrow placement="right">
                  <DeleteForeverIcon
                    onClick={() => handleDeleteProject(project.id)}
                    sx={{
                      color: "error.dark",
                      fontSize: "xxx-large",
                      cursor: "pointer",
                      transition: "color 0.5s ease, transform 0.5s ease",
                      "&:hover": {
                        color: "error.main",
                        transform: "scale(1.5)",
                      },
                    }}
                  />
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ProjectsExplorerTable = ({ projects, handleDeleteProject }) => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Projects</h1>
        <ProjectsTable
          projects={projects}
          handleDeleteProject={handleDeleteProject}
        />

        {/* <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Empty State Example</h2>
          <ProjectsTable projects={[]} />
        </div> */}
      </div>
    </div>
  );
};
