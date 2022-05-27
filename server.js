import app from "./app.js"

// uncaught exception
process.on("uncaughtException", (err) => {
  // https://simplernerd.com/js-console-colors/
  console.log("\x1b[31m%s\x1b[0m%s","✘ ",`Error: ${err.message}`);
  console.log("\x1b[31m%s\x1b[0m%s","✘ ",`Shutting down server due to unhandled Promise rejection`);

  process.exit(1);
});

const server = app.listen(process.env.PORT, () => {
  // https://simplernerd.com/js-console-colors/
  console.log("\x1b[32m%s\x1b[0m%s\x1b[33m%s\x1b[0m", `🗸 `,`listening on `,`https://localhost:${process.env.PORT}`);
})

// unhandled Promise rejection
process.on("unhandledRejection", err => {
  // https://simplernerd.com/js-console-colors/
  console.log("\x1b[31m%s\x1b[0m%s","✘ ",`Error: ${err.message}`);
  console.log("\x1b[31m%s\x1b[0m%s","✘ ",`Shutting down server due to unhandled Promise rejection`);

  server.close(() => {
    process.exit(1);
  });
})
