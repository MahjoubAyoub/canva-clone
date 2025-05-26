import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import DesignPreview from "./home/design-preview";

export default function AdminUserProjectsModal({ isOpen, onClose, user, token }) {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      setLoading(true);
      let base = "";
      if (typeof window !== "undefined") {
        if (window.location.hostname === "localhost") {
          base = "http://localhost:5004";
        } else {
          base = window.location.origin;
        }
      }
      fetch(`${base}/v1/admin/users/${user._id}/designs`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          // Always set an array, robust to backend shape
          if (Array.isArray(data)) setDesigns(data);
          else if (data && Array.isArray(data.data)) setDesigns(data.data);
          else if (data && data.success && Array.isArray(data.designs)) setDesigns(data.designs);
          else setDesigns([]);
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, user, token]);

  const handleDelete = async (designId) => {
    if (!window.confirm("Delete this design?")) return;
    let base = "";
    if (typeof window !== "undefined") {
      if (window.location.hostname === "localhost") {
        base = "http://localhost:5004";
      } else {
        base = window.location.origin;
      }
    }
    await fetch(`${base}/v1/admin/designs/${designId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setDesigns((prev) => prev.filter((d) => d._id !== designId));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} className="text-gray-400 hover:text-gray-700 p-6 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300 text-2xl"
            title="Close" >
      <DialogContent className="!block !max-w-4xl min-h-[92vh] max-h-[99vh] overflow-y-auto animate-fade-in !p-0">
        <DialogTitle className="text-3xl text-center font-extrabold text-purple-800 drop-shadow-sm tracking-tight p-4 border-b">
          User Projects
        </DialogTitle>
        <div className="overflow-y-auto">
          {loading ? (
            <div className="text-center py-24 text-2xl font-semibold text-gray-500 animate-pulse">Loading...</div>
          ) : designs.length === 0 ? (
            <div className="text-center py-24 text-2xl font-semibold text-gray-400">No projects found.</div>
          ) : (
            <div className="flex flex-col">
              {designs.map((design) => (
                <div key={design._id} className="sm:flex items-start gap-5 p-8 border-b-1">
                  {/* Large Preview for all designs, like recent designs */}
                  <div className="sm:basis-[150px] border-1 max-sm:mb-5 max-sm:w-full max-sm:h-[300px]">
                    {design?.canvasData && (
                      <DesignPreview key={design._id} design={design} />
                    )}
                  </div>
                  {/* Card Content with Project Details and Actions BELOW the image */}
                  <div className="flex flex-col flex-1 min-w-0 justify-between w-ful">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-extrabold text-xl text-black" title={design.name}>
                        {design.name}
                      </div>
                      {design.public && (
                        <span className="ml-2 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-300 shadow-sm uppercase tracking-wide">Community Template</span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                      <div className="text-gray-600"><span className="font-semibold text-gray-800">ID:</span> {design._id.slice(0, 8)}...</div>
                      <div className="text-gray-600"><span className="font-semibold text-gray-800">Status:</span> {design.public ? 'Public' : 'Private'}</div>
                      <div className="text-gray-600"><span className="font-semibold text-gray-800">Updated:</span> {design.updatedAt ? new Date(design.updatedAt).toLocaleString() : '-'}</div>
                      <div className="text-gray-600"><span className="font-semibold text-gray-800">Created:</span> {design.createdAt ? new Date(design.createdAt).toLocaleString() : '-'}</div>
                    </div>
                    <div className="mt-5">
                      {/* Only the Delete button remains */}
                      <Button
                        variant="destructive"
                        className="font-bold py-2 inline-flex items-center gap-2 !bg-red-500 !text-white rounded-xl shadow hover:!bg-red-600 transition-all duration-200 border-0"
                        onClick={() => handleDelete(design._id)}
                        title="Delete Design"
                      >
                        Delete
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
