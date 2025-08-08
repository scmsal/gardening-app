//This file is for starting the app in dev/production stage

import app from "./app";

// Importing server port constant
const PORT = process.env.PORT || 5000;
console.log("SERVER PORT:", PORT);

app.listen(PORT, () => {
  console.log(`Server is running at port : ${PORT}`);
});
