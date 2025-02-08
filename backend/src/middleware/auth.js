const { auth } = require("express-openid-connect");

const dotenv = require("dotenv");
dotenv.config();

const authSecret = process.env.AUTH0_CLIENT_SECRET;
const authId = process.env.AUTH0_CLIENT_ID;
const authDomain = process.env.AUTH0_CLIENT_DOMAIN;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: authSecret,
  baseURL: "https://localhost:4781",
  clientID: authId,
  issuerBaseURL: authDomain,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});
