"use client";

import { useEffect } from "react";
import axiosInstance from "../../lib/axios";

export default function HeadScriptInjector() {
  useEffect(() => {
    const injectScript = async () => {
      try {
        const res = await axiosInstance.get("/script-manager");
        const scripts = res?.data?.data?.result?.[0]?.headScripts;
        if (scripts) {
          document.head.insertAdjacentHTML("beforeend", scripts);
        } else {
          console.log("[HeadScriptInjector] no scripts to inject");
        }
      } catch (err) {
        console.error("[HeadScriptInjector] error:", err);
      }
    };
    injectScript();
  }, []);

  return null;
}
