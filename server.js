import app from "./app.js"
import connectDatabase from "./config/database.js";
import colors from "./utils/log_colors.js" // https://simplernerd.com/js-console-colors/
import cloudinary from "cloudinary"

// uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`${colors.fg.red}%s${colors.reset}`,`✘ `,`Error: ${err.message}`);
  console.log(`${colors.fg.red}%s${colors.reset}`,`✘ `,`Shutting down server due to uncaught Exception`);

  process.exit(1);
});

// connect to database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, () => {
  console.log(`${colors.fg.green}%s${colors.reset}%s${colors.fg.yellow}%s${colors.reset}`, `🗸 `,`listening on `,`http://localhost:${process.env.PORT} `);
})

// unhandled Promise rejection
process.on("unhandledRejection", err => {
  console.log(`${colors.fg.red}%s${colors.reset}`,`✘ `,`Error: ${err.message}`);
  console.log(`${colors.fg.red}%s${colors.reset}`,`✘ `,`Shutting down server due to unhandled Promise rejection`);

  server.close(() => {
    process.exit(1);
  });
})
