import mongoose from "mongoose";
import colors from "../utils/log_colors.js" // https://simplernerd.com/js-console-colors/

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  })
    .then((data) => {
      console.log(`${colors.fg.green}🗸${colors.reset} Mongodb connected with server: ${colors.fg.cyan}${data.connection.host}${colors.reset}`);
    }).catch((err) => {
      console.log(`${colors.fg.red}✘${colors.reset} Mongodb connection failed with err:`, err.message);
    })
}

export default connectDatabase;
