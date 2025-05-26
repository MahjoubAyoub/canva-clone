"use client";

import { useEffect, useRef, useState } from "react";

function DesignPreview({ design }) {
  const [canvasId] = useState(`canvas-${design._id}-${Date.now()}`);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        if (
          fabricCanvasRef.current &&
          typeof fabricCanvasRef.current.dispose === "function"
        ) {
          try {
            fabricCanvasRef.current.dispose();
            fabricCanvasRef.current = null;
          } catch (e) {
            console.error("Error while disposing canvas");
          }
        }

        const fabric = await import("fabric");
        const canvasElement = document.getElementById(canvasId);

        if (!canvasElement) return;

        const designPreviewCanvas = new fabric.StaticCanvas(canvasId, {
          width: 300,
          height: 300,
          renderOnAddRemove: true,
        });

        fabricCanvasRef.current = designPreviewCanvas;

        let canvasData;

        try {
          canvasData =
            typeof design.canvasData === "string"
              ? JSON.parse(design.canvasData)
              : design.canvasData;
        } catch (innerErr) {
          console.error("Error parsing canvas data");

          return;
        }

        if (
          canvasData === undefined ||
          canvasData === null ||
          canvasData?.objects?.length === 0
        ) {
          designPreviewCanvas.backgroundColor = "#21f365";
          designPreviewCanvas.requestRenderAll();
          return;
        }

        if (canvasData.background) {
          designPreviewCanvas.backgroundColor = canvasData.background;
          designPreviewCanvas.requestRenderAll();
        }

        designPreviewCanvas.loadFromJSON(canvasData, () => {
          designPreviewCanvas.requestRenderAll();
        });
      } catch (e) {
        console.error("Error rendering design preview data");
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (
        fabricCanvasRef.current &&
        typeof fabricCanvasRef.current.dispose === "function"
      ) {
        try {
          fabricCanvasRef.current.dispose();
          fabricCanvasRef.current = null;
        } catch (e) {
          console.error("Error while disposing canvas");
        }
      }
    };
  }, [design?._id, canvasId]);

  return (
    <>
      {design?.canvasData && design?.canvasData !== "" ? (
        <canvas
          id={canvasId}
          width="300"
          height="300"
          className="!h-full !w-full object-cover object-center"
        />
      ) : (
        <div className="w-full h-full min-h-[300px] min-w-[300px] flex items-center justify-center bg-gray-100 text-gray-400 text-lg font-semibold rounded">
          No preview
        </div>
      )}
    </>
  );
}

export default DesignPreview;
