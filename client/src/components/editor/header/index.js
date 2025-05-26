"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useEditorStore } from "@/store";
import {
  ChevronDown,
  Download,
  Eye,
  Loader2,
  LogOut,
  Pencil,
  Save,
  SaveOff,
  Share,
  Star,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ExportModal from "../export";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const {
    isEditing,
    setIsEditing,
    name,
    setName,
    canvas,
    saveStatus,
    markAsModified,
    designId,
    userDesigns,
    userSubscription,
    setShowPremiumModal,
    isPublic,
    setIsPublic,
    publicLoading,
  } = useEditorStore();
  const { data: session } = useSession();
  const [showExportModal, setShowExportModal] = useState(false);

  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    if (!canvas) return;
    canvas.selection = isEditing;
    canvas.getObjects().forEach((obj) => {
      obj.selectable = isEditing;
      obj.evented = isEditing;
    });
  }, [isEditing]);

  useEffect(() => {
    if (!canvas || !designId) return;
    markAsModified();
  }, [name, canvas, designId]);

  const handleExport = () => {
    setShowExportModal(true);
  };

  const handleTogglePublic = async () => {
    if (!designId) return;
    try {
      // Optimistically update UI
      setIsPublic((prev) => !prev);
      // Call backend API to update public status
      const response = await fetch(`/api/designs/${designId}/public`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(session?.idToken ? { Authorization: `Bearer ${session.idToken}` } : {})
        },
        body: JSON.stringify({ public: !isPublic }),
      });
      if (!response.ok) {
        throw new Error("Failed to update public status");
      }
      toast.success(`Design is now ${!isPublic ? "public" : "private"}.`);
    } catch (error) {
      // Revert UI if failed
      setIsPublic((prev) => !prev);
      toast.error("Failed to update public status.");
    }
  };

  return (
    <header className="header-gradient header flex items-center justify-between px-4 h-14">
      {/* Left: Designih button, Save and Export */}
      <div className="flex items-center space-x-2">
        <Link href="/dashboard-user">
          <span className="text-2xl font-bold text-white cursor-pointer">
            Designih
          </span>
        </Link>
        <button
          className={
            "relative flex items-center justify-center p-1.5 rounded-md hover:bg-muted transition-colors"
          }
          title={saveStatus !== "Saving..." ? "Save" : saveStatus}
          disabled={saveStatus === "Saving..."}
        >
          {saveStatus === "Saving..." ? (
            <div className="relative flex items-center">
              <Loader2 className="h-5 w-5 animate-spin text-white" />
              <span className="sr-only">Saving...</span>
            </div>
          ) : (
            <Save
              className={cn("h-5 w-5", saveStatus === "Saved" && "text-white")}
            />
          )}
          {saveStatus === "Saving..." && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
          )}
        </button>
        <button
          onClick={handleExport}
          className="header-button ml-3 relative"
          title="Export"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>
      {/* Center: Design Title only */}
      <div className="flex-1 flex justify-center max-w-md">
        <Input
          className="w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      {/* Right: Public/Private Switch and Profile */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <Switch
            checked={isPublic}
            onCheckedChange={handleTogglePublic}
            disabled={publicLoading}
            id="public-switch"
          />
          <label
            htmlFor="public-switch"
            className="text-white text-sm select-none"
          >
            {isPublic ? "Public" : "Private"}
          </label>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger aschild="true">
            <div className="flex items-center space-x-2 ">
              <Avatar>
                <AvatarFallback>
                  {session?.user?.name?.[0] || "U"}
                </AvatarFallback>
                <AvatarImage
                  src={session?.user?.image || "/vercel.svg"}
                />
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem
              onClick={handleLogout}
              className={"cursor-pointer"}
            >
              <LogOut className="mr-2 w-4 h-4" />
              <span className="font-bold">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ExportModal isOpen={showExportModal} onClose={setShowExportModal} />
    </header>
  );
}

export default Header;
