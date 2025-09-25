import app from "./app.js";

const PORT = process.env.PORT || 5050;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.info(`Server is running at port : ${PORT}`);
  });
}
