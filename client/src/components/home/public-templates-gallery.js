import { useEffect, useState } from "react";
import { getPublicTemplates } from "@/services/design-service";
import DesignPreview from "./design-preview";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function PublicTemplatesGallery() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTemplates() {
      setLoading(true);
      try {
        const res = await getPublicTemplates();
        setTemplates(res.data || []);
      } catch (e) {
        setTemplates([]);
      }
      setLoading(false);
    }
    fetchTemplates();
  }, []);

  if (loading) {
    return <div className="w-full text-center py-8 text-lg text-gray-500">Loading templates...</div>;
  }

  if (!templates.length) {
    return <div className="w-full text-center py-8 text-lg text-gray-400">No public templates yet.</div>;
  }

  return (
    <div className="w-full my-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Community Templates</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {templates.map((tpl) => (
          <div
            key={tpl._id}
            className="flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-purple-50 to-white border-2 border-purple-100 hover:border-purple-300 cursor-pointer"
            onClick={async () => {
              // Copy template logic: create a new design for the user with the template's data
              try {
                const designData = {
                  name: tpl.name + " (Copy)",
                  canvasData: tpl.canvasData,
                  width: tpl.width,
                  height: tpl.height,
                  category: tpl.category,
                };
                const res = await import("@/services/design-service").then(m => m.saveDesign(designData));
                if (res?.success && res.data?._id) {
                  window.location.href = `/editor/${res.data._id}`;
                } else {
                  alert("Failed to copy template. Please try again.");
                }
              } catch (e) {
                alert("Failed to copy template. Please try again.");
              }
            }}
          >
            <div className="w-full h-40 overflow-hidden">
              {tpl?.canvasData && (
                <DesignPreview key={tpl._id} design={tpl} />
              )}
            </div>
            <div className="p-4 w-full flex flex-col items-center">
              <div className="font-semibold text-lg text-purple-800 truncate w-full text-center">{tpl.name}</div>
              <div className="flex items-center gap-2 mt-2">
                <Avatar className="w-7 h-7">
                  <AvatarImage src={tpl.ownerImage || undefined} />
                  <AvatarFallback>{tpl.sharedBy?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-500">Shared by {tpl.sharedBy || "User"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
