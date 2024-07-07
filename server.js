import "dotenv/config";
import app from "./src/app.js";

const PORT = 3001;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
