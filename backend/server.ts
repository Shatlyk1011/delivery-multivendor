import dotenv from "dotenv";
import next from "next";
import nextBuild from "next/dist/build";
import path from "path";

dotenv.config();

import express from "express";
import payload from "payload";

const app = express();
const PORT = process.env.PORT || 3000;

const start = async (): Promise<void> => {
  await payload.init({
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
    secret: process.env.PAYLOAD_SECRET || "",
  });

  // if (process.env.NEXT_BUILD) {
  //   app.listen(PORT, async () => {
  //     payload.logger.info(`Next.js is now building...`);
  //     // @ts-expect-error
  //     await nextBuild(path.join(__dirname, "./"));
  //     process.exit();
  //   });

  //   return;
  // }

  const nextApp = next({
    dev: process.env.NODE_ENV !== "production",
  });

  const nextHandler = nextApp.getRequestHandler();

  app.use((req, res) => nextHandler(req, res));

  nextApp
    .prepare()
    .then(() => {
      payload.logger.info("Starting Next.js...");

      app.listen(PORT, () => {
        payload.logger.info(
          `Next.js App URL: ${process.env.PAYLOAD_PUBLIC_SERVER_URL}`,
        );
      });
    })
    .catch((err) => {
      payload.logger.error({ err }, "Error starting Next.js");
    });
};

void start();
