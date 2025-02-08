import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

const authDomain = import.meta.env.VITE_AUTH0_DOMAIN;
const authId = import.meta.env.VITE_AUTH0_CLIENT_ID;

console.log("Auth0 Domain:", authDomain);
console.log("Auth0 Client ID:", authId);

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
