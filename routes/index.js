const express = require("express");
const asyncMiddleware = require("../middleware/async");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const authController = require("../controllers/auth-controller");
const userController = require("../controllers/user-controller");
const newsController = require("../controllers/news-controller");
const docsController = require("../controllers/docs-controller");
const bidsController = require("../controllers/bids-controller");
const vacancyController = require("../controllers/vacancy-controller")
const searchController = require("../controllers/search-controller")
const siteController = require("../controllers/site-controller")
const error = require("../middleware/error");
const multer = require("multer");
var bodyParser = require("body-parser");
const check = require("../middleware/check");
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

  app.use(bodyParser.json({ limit: "100mb" }));
  app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

  app.use(
    "/api",
    router.all("/auth", function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    })
  );
  app.use(
    "/uploads",
    router.all("/", function (req, res, next) {
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

  app.use(
    "/api",
    router.all("/docs", function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    })
  );

  app.use(
    "/api",
    router.all("/bid", function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    })
  );
  app.use(
    "/api",
    router.all("/vacancy", function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    })
  )
  app.use(
    "/api",
    router.all("/site", function (req, res, next) {

      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    })
  )
  app.use("/api", router.post("/auth", asyncMiddleware(authController.auth)));

  app.use(
    "/api",
    router.get("/me/:id", asyncMiddleware(userController.getUser))
  );

  app.use(
    "/api",
    router.post(
      "/user",
      // [auth, admin],
      asyncMiddleware(userController.createUser)
    )
  );
  app.use(
    "/api",
    router.get("/user", asyncMiddleware(userController.getUser))
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
    router.put(
      "/changePassword/:id",
      authController.changePassword,
      asyncMiddleware(userController.updateUser)
    )
  );
  /** check the user after login*/
  app.use('/api', router.post('/checkAdmin', [auth], check))
  /** */
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





  app.use(
    "/api",
    router.post(
      "/docs",
      upload.single("file"),
      asyncMiddleware(docsController.createDocs)
    )
  );
  app.use("/api", router.get("/docs", asyncMiddleware(docsController.getDocs)));
  app.use(
    "/api",
    router.put(
      "/docs/:id",
      upload.single("file"),
      asyncMiddleware(docsController.updateDocs)
    )
  );
  app.use(
    "/api",
    router.delete(
      "/docs/:id",
      [auth],
      asyncMiddleware(docsController.deleteDocs)
    )
  );
  app.use(
    "/api",
    router.get("/docs/:id", asyncMiddleware(docsController.getDocsById))
  );





  app.use(
    "/api",
    router.post(
      "/bid",
      upload.single("file"),
      asyncMiddleware(bidsController.createBid)
    )
  );
  app.use("/api", router.get("/bid", asyncMiddleware(bidsController.getBids)));
  app.use(
    "/api",
    router.put(
      "/bid/:id",
      upload.single("file"),
      asyncMiddleware(bidsController.updateBid)
    )
  );
  app.use(
    "/api",
    router.delete(
      "/bid/:id",
      [auth],
      asyncMiddleware(bidsController.deleteBid)
    )
  );
  app.use(
    "/api",
    router.get("/bid/:id", asyncMiddleware(bidsController.getBidById))
  );
  app.use(
    "/api",
    router.post(
      "/bid",
      upload.single("file"),
      asyncMiddleware(bidsController.createBid)
    )
  );
  app.use(
    "/api",
    router.post(
      "/vacancy",
      asyncMiddleware(vacancyController.createVacancy)
    )
  );
  app.use(
    "/api",
    router.put(
      "/vacancy/:id",
      asyncMiddleware(vacancyController.updateVacancy)
    )
  );
  app.use(
    "/api",
    router.delete(
      "/vacancy/:id",
      [auth],
      asyncMiddleware(vacancyController.deleteVacancy)
    )
  );
  app.use("/api", router.get("/vacancy", asyncMiddleware(vacancyController.getVacancy)));

  app.use(
    "/api",
    router.get("/vacancy/:id", asyncMiddleware(vacancyController.getVacancyById))
  );
  /** */
  app.use(
    "/api",
    router.post(
      "/site",
      upload.array('images', 30),
      asyncMiddleware(siteController.createSite)
    )
  );
  app.use(
    "/api",
    router.put(
      "/site/:id",
      upload.array('images', 30),
      asyncMiddleware(siteController.updateSite)
    )
  );
  app.use(
    "/api",
    router.delete(
      "/site/:id",
      [auth],
      asyncMiddleware(siteController.deleteSite)
    )
  );
  app.use("/api", router.get("/site", asyncMiddleware(siteController.getSites)));

  app.use(
    "/api",
    router.get("/site/:id", asyncMiddleware(siteController.getSiteById))
  );
  app.use(
    "/api",
    router.post("/search/:index", asyncMiddleware(searchController.search))
  );
  /** */
  app.use(error);
};