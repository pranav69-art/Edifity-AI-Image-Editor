
"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export function usePlanAccess() {
  const { has } = useAuth();
  // In development, allow forcing Pro access via localStorage for testing.
  // Set `localStorage.setItem('DEV_FORCE_PRO', '1')` to enable.
  const [devForcePro, setDevForcePro] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    try {
      setDevForcePro(
        typeof window !== "undefined" && window.localStorage?.getItem("DEV_FORCE_PRO") === "1"
      );
    } catch (e) {
      setDevForcePro(false);
    }
  }, []);

  const isPro = devForcePro || has?.({ plan: "pro" }) || false;
  const isFree = !isPro; 
 
  const planAccess = {
    // Free plan tools
    resize: true,
    crop: true,
    adjust: true,
    text: true,

    
    background: isPro,
    ai_extender: isPro,
    ai_edit: isPro,
  };

  
  const hasAccess = (toolId) => {
    return planAccess[toolId] === true;
  };

  
  const getRestrictedTools = () => {
    return Object.entries(planAccess)
      .filter(([_, hasAccess]) => !hasAccess)
      .map(([toolId]) => toolId);
  };

 
  const canCreateProject = (currentProjectCount) => {
    if (isPro) return true;
    return currentProjectCount < 3; 
  };

 
  const canExport = (currentExportsThisMonth) => {
    if (isPro) return true;
    return currentExportsThisMonth < 20;
  };

  return {
    userPlan: isPro ? "pro" : "free_user",
    isPro,
    isFree,
    hasAccess,
    planAccess,
    getRestrictedTools,
    canCreateProject,
    canExport,
  };
}
