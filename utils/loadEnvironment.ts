export const loadEnvironment = () => {
  if (process.env.NODE_ENV === "development") {
    const dotenv = require("dotenv");

    [".env.local", ".env"].forEach(envPath => dotenv.config({ path: envPath }));
  }
};
