const { requiresAuth } = require("express-openid-connect");

const profileRouter = express.Router();

profileRouter.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = profileRouter;
