"use client";

import AiFeatures from "@/components/home/ai-features";
import Banner from "@/components/home/banner";
import DesignTypes from "@/components/home/design-types";
import DesignModal from "@/components/home/designs-modal";
import Header from "@/components/home/header";
import RecentDesigns from "@/components/home/recent-designs";
import SideBar from "@/components/home/sidebar";
import PublicTemplatesGallery from "@/components/home/public-templates-gallery";
import { getUserDesigns } from "@/services/design-service";
import { useEditorStore } from "@/store";
import { useEffect } from "react";

export default function UserDashboard() {
  const {
    setUserDesigns,
    showDesignsModal,
    setShowDesignsModal,
    userDesigns,
    setUserDesignsLoading,
    userDesignsLoading,
  } = useEditorStore();

  async function fetchUserDesigns() {
    setUserDesignsLoading(true);
    const result = await getUserDesigns();
    if (result?.success) {
      // Defensive: handle missing username in design objects
      const safeData = (result?.data || []).map(design => ({
        ...design,
        username: design.username || "Unknown user"
      }));
      setUserDesigns(safeData);
      setUserDesignsLoading(false);
    }
  }

  useEffect(() => {
    fetchUserDesigns();
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      <SideBar />
      <div className="flex-1 flex flex-col ml-[72px]">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto pt-20">
          <Banner />
          <DesignTypes />
          <AiFeatures />
          <PublicTemplatesGallery />
          <RecentDesigns />
        </main>
      </div>
      <DesignModal
        isOpen={showDesignsModal}
        onClose={setShowDesignsModal}
        userDesigns={userDesigns}
        setShowDesignsModal={setShowDesignsModal}
        userDesignsLoading={userDesignsLoading}
      />
    </div>
  );
}
