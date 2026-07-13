"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../lib/axios";
import { Textarea } from "../../../../components/ui/textarea";
import { Button } from "../../../../components/ui/button";
import { useToast } from "../../../../components/ui/use-toast";

export default function HeadScriptPage() {
  const [headScripts, setHeadScripts] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [existingId, setExistingId] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchHeadScript = async () => {
      try {
        const res = await axiosInstance.get("/script-manager");
        const result = res?.data?.data?.result;
        
        // Check if result exists and has items
        if (result && result.length > 0) {
          // Always take the first one
          setHeadScripts(result[0].headScripts || "");
          setExistingId(result[0]._id || null);
        } else {
          setHeadScripts("");
          setExistingId(null);
        }
      } catch {
        setHeadScripts("");
        setExistingId(null);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load head scripts",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchHeadScript();
  }, [toast]);

  const handleSave = async () => {
    setIsSaving(true);

    try {
      if (existingId) {
        // Update existing document using PATCH
        await axiosInstance.patch(`/script-manager/${existingId}`, {
          headScripts: headScripts,
        });
        
        toast({
          title: "Success",
          description: "Head scripts updated successfully!",
        });
      } else {
        // Create new document using POST
        const res = await axiosInstance.post("/script-manager", {
          headScripts: headScripts,
        });
        
        // Store the new document ID for future updates
        if (res?.data?.data?.result?._id) {
          setExistingId(res.data.data.result._id);
        } else if (res?.data?.data?._id) {
          setExistingId(res.data.data._id);
        }
        
        toast({
          title: "Success",
          description: "Head scripts created successfully!",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.response?.data?.message || "Failed to save head scripts",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Head Script</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Custom scripts injected into the <code>&lt;head&gt;</code> tag
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Head Scripts</label>
        <Textarea
          rows={12}
          value={isLoading ? "Loading..." : headScripts}
          onChange={(e) => {
            setHeadScripts(e.target.value);
          }}
          disabled={isLoading}
          className="font-mono text-sm"
          placeholder="Paste your head scripts here (e.g., Google Analytics, Meta Pixel, etc.)"
        />
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button
          onClick={handleSave}
          disabled={isLoading || isSaving}
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Saving...
            </span>
          ) : (
            existingId ? "Update Scripts" : "Save Scripts"
          )}
        </Button>
      </div>
    </div>
  );
}