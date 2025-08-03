const express = require("express");
const path = require("path");
const compression = require("compression");
const postgresClient = require("./pgclient");
const bodyParser = require("body-parser");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 3000;

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const interface of interfaces[name]) {
      if (interface.family === "IPv4" && !interface.internal) {
        return interface.address;
      }
    }
  }
  return "localhost";
}

// Enable gzip compression for better performance
app.use(compression());
app.use(bodyParser.json());

// Serve static files from the Vite build output directory (one level up)
app.use(express.static(path.join(__dirname, "..", "dist")));

// Security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

app.get("/api/v1/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is running correctly",
    timestamp: new Date().toISOString(),
  });
});

app.delete("/api/v1/matrices/:id", (req, res) => {
  const { id } = req.params;
  postgresClient.deleteMatrixById(id).then(() => {
    res.status(200).json({ deleted: true });
  });
});

app.put("/api/v1/matrices", (req, res) => {
  postgresClient.saveUserMatrix({ ...req.body }).then((r) => {
    res.status(200).json(r?.[0]);
  });
});

app.put("/api/v1/matrices/:id", (req, res) => {
  const { id } = req.params;
  postgresClient.saveUpdateUserMatrix({ ...req.body, id }).then((r) => {
    res.status(200).json(r?.[0]);
  });
});

app.get("/api/v1/matrices", (req, res) => {
  postgresClient.listUserMatrices({ ...req.body }).then((r) => {
    res.status(200).json(r);
  });
});

app.get("/api/v1/matrices/:id", (req, res) => {
  const { id } = req.params;
  postgresClient.getMatrixById(id).then((r) => {
    res.status(200).json(r);
  });
});

app.use("/api", (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

// Catch-all handler for client-side routing
// This ensures that React Router can handle routing on the client
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
console.log("process.env.LOCAL_BROADCAST", process.env.LOCAL_BROADCAST);
app.listen(PORT, "0.0.0.0", () => {
  const localIP = getLocalIP();
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📱 Access your app at http://localhost:${PORT}`);
  console.log(`Network: http://${localIP}:${PORT}`);
  console.log(`📁 Serving files from: ${path.join(__dirname, "..", "dist")}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  process.exit(0);
});
