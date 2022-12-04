import env from "./env";
import app from "./config/app";

const PORT = env.getPort();
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
