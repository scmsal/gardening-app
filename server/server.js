//This file is for starting the app in dev/production stage

import app from "./app.js";

// Importing server port constant
const PORT = process.env.PORT || 5050;

// Starting the server in dev/production mode
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT}`);
  });
}
