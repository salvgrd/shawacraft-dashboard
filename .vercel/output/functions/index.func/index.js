import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useParams, useLoaderData, useActionData, useMatches, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, redirect, useNavigate, Form } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const stylesheet = "/assets/app-3CmBekjY.css";
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}, {
  rel: "stylesheet",
  href: stylesheet
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      className: "text-gray-900",
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function loader$1() {
  throw redirect("/dashboard");
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
function Card({ children, className = "" }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${className}`,
      children
    }
  );
}
function CardHeader({ children, className = "" }) {
  return /* @__PURE__ */ jsx("div", { className: `p-4 border-b-4 border-black ${className}`, children });
}
function CardContent({ children, className = "" }) {
  return /* @__PURE__ */ jsx("div", { className: `p-4 ${className}`, children });
}
function CardTitle({ children, className = "" }) {
  return /* @__PURE__ */ jsx("h2", { className: `text-2xl font-bold ${className}`, children });
}
function Button({
  children,
  className = "",
  type = "button",
  onClick
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type,
      className: `px-4 py-2 bg-white text-black border-4 border-black font-bold hover:bg-gray-200 hover:translate-x-1 hover:translate-y-1 transition-transform ${className}`,
      onClick,
      children
    }
  );
}
function Input({ className = "", ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      className: `w-full px-3 py-2 border-2 border-black focus:ring-2 bg-white focus:ring-offset-2 focus:ring-black ${className}`,
      ...props
    }
  );
}
function Label({ children, className = "", ...props }) {
  return /* @__PURE__ */ jsx("label", { className: `block text-lg font-bold ${className}`, ...props, children });
}
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (username === "admin" && password === "password") {
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };
  return /* @__PURE__ */ jsx("main", { className: "min-h-screen bg-[#f0f0f0] flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-center", children: "Admin Login" }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "username", children: "Username" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "username",
            type: "text",
            placeholder: "Enter your username",
            value: username,
            onChange: (e) => setUsername(e.target.value),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "password",
            type: "password",
            placeholder: "Enter your password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            required: true
          }
        )
      ] }),
      error && /* @__PURE__ */ jsx(
        "div",
        {
          className: "bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded relative",
          role: "alert",
          children: /* @__PURE__ */ jsx("span", { className: "font-bold", children: error })
        }
      ),
      /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", children: "Log In" })
    ] }) })
  ] }) });
}
function meta$1() {
  return [{
    title: "Login"
  }, {
    name: "description",
    content: "Welcome to Shawacraft!"
  }];
}
const login = withComponentProps(function Auth() {
  return /* @__PURE__ */ jsx(Login, {});
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: login,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function PlayerList({ players }) {
  if (!players.length)
    return /* @__PURE__ */ jsx("span", { className: "font-bold", children: "No players online." });
  return /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: players.map((player) => /* @__PURE__ */ jsxs(
    "li",
    {
      className: "flex items-center justify-between border-2 border-black p-2",
      children: [
        /* @__PURE__ */ jsx("span", { className: "font-bold", children: player.name }),
        /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-sm bg-green-200`, children: "Online" })
      ]
    },
    player.uuid
  )) });
}
function ServerStatus({ status }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
    /* @__PURE__ */ jsx("div", { className: `w-4 h-4 rounded-full ${status === "online" ? "bg-green-500" : "bg-red-500"}` }),
    /* @__PURE__ */ jsxs("span", { className: "text-lg font-bold", children: [
      "Server is ",
      status
    ] })
  ] });
}
function MinecraftDashboard({ serverStatus, players }) {
  const toggleServer = () => {
  };
  return /* @__PURE__ */ jsx("main", { className: "min-h-screen bg-[#f0f0f0] p-4 md:p-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-8", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold border-b-4 border-black pb-2", children: "Minecraft Server Dashboard" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Server Control" }) }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx(ServerStatus, { status: serverStatus }),
          /* @__PURE__ */ jsxs(Form, { onSubmit: toggleServer, method: "POST", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "hidden",
                value: serverStatus,
                name: "current-status"
              }
            ),
            /* @__PURE__ */ jsx(Button, { type: "submit", className: "mt-4 w-full", children: serverStatus === "online" ? "Stop Server" : "Start Server" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Player Management" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(PlayerList, { players }) })
      ] })
    ] })
  ] }) });
}
const __vite_import_meta_env__ = { "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SSR": true, "VITE_MINECRAFT_SERVER_ADDRESS": "minecraft.shawa.io" };
function meta() {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const {
  VITE_MINECRAFT_SERVER_ADDRESS
} = __vite_import_meta_env__;
async function loader() {
  var _a;
  const response = await fetch(`https://api.mcsrvstat.us/3/${VITE_MINECRAFT_SERVER_ADDRESS}`).then((res) => res.json());
  return {
    serverStatus: response.online ? "online" : "offline",
    players: ((_a = response == null ? void 0 : response.players) == null ? void 0 : _a.list) ?? []
  };
}
async function action(args) {
  const payload = await args.request.formData();
  console.log(payload.get("current-status"));
  return null;
}
const dashboard = withComponentProps(function Home() {
  const {
    serverStatus,
    players
  } = useLoaderData();
  return /* @__PURE__ */ jsx(MinecraftDashboard, {
    serverStatus,
    players
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: dashboard,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BfHsL4NE.js", "imports": ["/assets/chunk-K6AXKMTT-BZfChKdp.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-CnJy8fh5.js", "imports": ["/assets/chunk-K6AXKMTT-BZfChKdp.js", "/assets/with-props-DQqZBgqe.js"], "css": [] }, "routes/root": { "id": "routes/root", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/login-Ci2Kk9O6.js", "imports": ["/assets/with-props-DQqZBgqe.js", "/assets/chunk-K6AXKMTT-BZfChKdp.js", "/assets/button-QKCv_jSb.js"], "css": [] }, "routes/dashboard": { "id": "routes/dashboard", "parentId": "root", "path": "dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/dashboard-HYf7iiCi.js", "imports": ["/assets/with-props-DQqZBgqe.js", "/assets/chunk-K6AXKMTT-BZfChKdp.js", "/assets/button-QKCv_jSb.js"], "css": [] } }, "url": "/assets/manifest-6ad46822.js", "version": "6ad46822" };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/root": {
    id: "routes/root",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/dashboard": {
    id: "routes/dashboard",
    parentId: "root",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  publicPath,
  routes
};
