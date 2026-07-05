"use client";

import React, { useEffect, useState } from "react";
import { X, Crown, Zap, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PricingTable } from "@clerk/nextjs";

export function UpgradeModal({ isOpen, onClose, restrictedTool, reason }) {
  const [billingEnabled, setBillingEnabled] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkBilling = async () => {
      try {
        const response = await fetch("/api/health");
        if (!mounted) return;
        setBillingEnabled(response.ok);
      } catch {
        if (mounted) setBillingEnabled(false);
      }
    };

    if (isOpen) {
      checkBilling();
    }

    return () => {
      mounted = false;
    };
  }, [isOpen]);

  const getToolName = (toolId) => {
    const toolNames = {
      background: "AI Background Tools",
      ai_extender: "AI Image Extender",
      ai_edit: "AI Editor",
    };
    return toolNames[toolId] || "Premium Feature";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-slate-800 border-white/10 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Crown className="h-6 w-6 text-yellow-500" />
            <DialogTitle className="text-2xl font-bold text-white">
              Upgrade to Pro
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Restriction Message */}
          {restrictedTool && (
            <Alert className="bg-amber-500/10 border-amber-500/20">
              <Zap className="h-5 w-5 text-amber-400" />
              <AlertDescription className="text-amber-300/80">
                <div className="font-semibold text-amber-400 mb-1">
                  {getToolName(restrictedTool)} - Pro Feature
                </div>
                {reason ||
                  `${getToolName(restrictedTool)} is only available on the Pro plan. Upgrade now to unlock this powerful feature and more.`}
              </AlertDescription>
            </Alert>
          )}

          {billingEnabled ? (
            <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 p-4 text-sm text-cyan-200">
              Billing is available, but the checkout experience is currently disabled in this local environment. The upgrade flow will resume once Clerk billing is configured for this project.
            </div>
          ) : (
            <Alert className="bg-slate-700/60 border-slate-600">
              <AlertCircle className="h-5 w-5 text-cyan-400" />
              <AlertDescription className="text-slate-300">
                Billing is currently unavailable in this environment, so the checkout experience cannot be shown right now. Please enable billing in your Clerk dashboard to unlock the full upgrade flow.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter className="justify-center">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-white/70 hover:text-white"
          >
            Maybe Later
          </Button>
          {typeof window !== "undefined" && process.env.NODE_ENV === "development" && (
            <Button
              variant="primary"
              onClick={() => {
                try {
                  window.localStorage.setItem("DEV_FORCE_PRO", "1");
                  // reload so hooks/readers pick up the change
                  window.location.reload();
                } catch (e) {
                  console.error("Failed to set DEV_FORCE_PRO", e);
                }
              }}
              className="ml-3"
            >
              Simulate Upgrade (dev)
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
