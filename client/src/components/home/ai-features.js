import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";

function AiFeatures() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-8 mt-12">
      <h2 className="text-lg font-semibold mb-3 flex items-center justify-center">
        <Sparkles className="h-3 w-5 text-purple-500 mr-2" />
        AI Image Creation
      </h2>
      <p className="text-gray-700 mb-4 text-center">
        Create stunning thumbnails images with AI
      </p>
     
    </div>
  );
}

export default AiFeatures;
