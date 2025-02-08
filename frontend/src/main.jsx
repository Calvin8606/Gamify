import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

const authDomain = process.env.AUTH0_DOMAIN;
const authId = process.env.AUTH0_ID;

const root = createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain={authDomain}
    clientId={authId}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
