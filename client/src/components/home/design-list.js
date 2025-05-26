"use client";

import { useRouter } from "next/navigation";
import DesignPreview from "./design-preview";
import { Loader, Trash2 } from "lucide-react";
import { deleteDesign, getUserDesigns } from "@/services/design-service";
import { useEditorStore } from "@/store";

function DesignList({
  listOfDesigns,
  isLoading,
  isModalView,
  setShowDesignsModal,
}) {
  const router = useRouter();
  const { setUserDesigns } = useEditorStore();

  async function fetchUserDesigns() {
    const result = await getUserDesigns();

    if (result?.success) setUserDesigns(result?.data);
  }

  const handleDeleteDesign = async (getCurrentDesignId) => {
    const response = await deleteDesign(getCurrentDesignId);

    if (response.success) {
      fetchUserDesigns();
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div
      className={`${
        isModalView ? "p-4" : ""
      } grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4`}
    >
      {!listOfDesigns.length && <h1>No Design Found!</h1>}
      {listOfDesigns.map((design) => (
        <div key={design._id} className="group flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-purple-50 to-white border-2 border-purple-100 hover:border-purple-300 cursor-pointer">
          <div
            onClick={() => {
              router.push(`/editor/${design?._id}`);
              isModalView ? setShowDesignsModal(false) : null;
            }}
            className="w-full h-40 overflow-hidden relative"
          >
            {design?.canvasData && (
              <DesignPreview key={design._id} design={design} />
            )}
            {design.public && (
              <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded shadow">
                Public
              </span>
            )}
          </div>
          <div className="p-4 w-full flex items-center gap-3">
            <h3 className="flex-1 font-semibold text-md text-purple-800 truncate">
              {design.name}
            </h3>
            <Trash2
              onClick={() => handleDeleteDesign(design?._id)}
              className="w-[30px] h-[30px] p-1 rounded-full border-1 border-gray-200 hover:bg-red-500 stroke-gray-500 hover:stroke-white"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default DesignList;
