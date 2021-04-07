const express = require("express");
const asyncMiddleware = require("../middleware/async");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const authController = require("../controllers/auth-controller");
const userController = require("../controllers/user-controller");
const newsController = require("../controllers/news-controller");

const error = require("../middleware/error");
const multer = require("multer");
var bodyParser = require("body-parser");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });
module.exports = function (app) {
  app.use(express.json());

  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

  app.use(
    "/api",
    router.all("/auth", function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    })
  );

  app.use(
    "/api",
    router.all("/me", function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    })
  );

  app.use(
    "/api",
    router.all("/user", function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    })
  );

   app.use(
    "/api",
    router.all("/news", function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    })
  );

  app.use("/api", router.post("/auth", asyncMiddleware(authController.auth)));

  app.use(
    "/api",
    router.get("/me/:id", asyncMiddleware(userController.getUser))
  );

  app.use(
    "/api",
    router.post(
      "/user",
      [auth, admin],
      asyncMiddleware(userController.createUser)
    )
  );
  app.use(
    "/api",
    router.get("/user", [auth, admin], asyncMiddleware(userController.getUsers))
  );
  app.use(
    "/api",
    router.get(
      "/user/:id",
      [auth, admin],
      asyncMiddleware(userController.getUserById)
    )
  );
  app.use(
    "/api",
    router.put(
      "/user/:id",
      [auth, admin],
      asyncMiddleware(userController.updateUser)
    )
  );
  app.use(
    "/api",
    router.patch(
      "/user/:id",
      [auth, admin],
      asyncMiddleware(userController.updateUser)
    )
  );
  app.use(
    "/api",
    router.delete(
      "/user/:id",
      [auth, admin],
      asyncMiddleware(userController.deleteUser)
    )
  );

  app.use(
    "/api",
    router.post(
      "/news",
      upload.single("image"),
      asyncMiddleware(newsController.createNews)
    )
  );
  app.use("/api", router.get("/news", asyncMiddleware(newsController.getNews)));
  app.use(
    "/api",
    router.put(
      "/news/:id",
      upload.single("image"),
      asyncMiddleware(newsController.updateNews)
    )
  );
  app.use(
    "/api",
    router.delete(
      "/news/:id",
      [auth],
      asyncMiddleware(newsController.deleteNews)
    )
  );
  app.use(
    "/api",
    router.get("/news/:id", asyncMiddleware(newsController.getNewsById))
  );

  app.use(error);
};
