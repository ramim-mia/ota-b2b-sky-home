import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { antDConfig } from "./constants/antdconfig";
import "./index.css";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      {...antDConfig}
      theme={{
        token: {
          // Seed Token
          // colorPrimary: "#F5F7FA"
          // Alias Token
          // colorBgContainer: "#F5F7FA",
          // colorPrimary: "#F5F7FA",
        },
        components: {
          Segmented: {
            itemSelectedBg: "rgb(9 85 156)",
            itemSelectedColor: "#fff",

            itemHoverColor: "rgb(93, 127, 158)",
          },
          Statistic: {
            contentFontSize: 18,
          },
        },
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
