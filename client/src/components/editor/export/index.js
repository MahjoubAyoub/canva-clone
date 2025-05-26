"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  exportAsJson,
  exportAsPDF,
  exportAsPng,
  exportAsSVG,
  exportAsJpg,
  exportAsJpeg,
  exportAsHtml,
  exportAsPptx,
  exportAsGif,
  exportAsDocx,
  exportAsCsv,
} from "@/services/export-service";
import {
  Download,
  File,
  FileIcon,
  FileImage,
  FileJson,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useEditorStore } from "@/store";

function ExportModal({ isOpen, onClose }) {
  const { canvas } = useEditorStore();

  const [selectedFormat, setSelectedFormat] = useState("png");
  const [isExporting, setIsExporting] = useState(false);

  const exportFormats = [
    {
      id: "png",
      name: "PNG Image",
      icon: FileImage,
      description: "Best for web and social media",
    },
    {
      id: "jpg",
      name: "JPG Image",
      icon: FileImage,
      description: "JPEG image for compatibility",
    },
    {
      id: "jpeg",
      name: "JPEG Image",
      icon: FileImage,
      description: "JPEG image for compatibility",
    },
    {
      id: "svg",
      name: "SVG Vector",
      icon: FileIcon,
      description: "Scalable vector format",
    },
    {
      id: "pdf",
      name: "PDF Document",
      icon: File,
      description: "Best for printing",
    },
    {
      id: "pptx",
      name: "PowerPoint (PPTX)",
      icon: File,
      description: "Microsoft PowerPoint presentation",
    },
    {
      id: "html",
      name: "HTML File",
      icon: FileIcon,
      description: "Web page format",
    },
    {
      id: "json",
      name: "JSON Template",
      icon: FileJson,
      description: "Editable template format",
    },
    {
      id: "gif",
      name: "GIF Animation",
      icon: FileImage,
      description: "Animated GIF format",
    },
    {
      id: "docx",
      name: "Word Document (DOCX)",
      icon: File,
      description: "Microsoft Word document",
    },
    {
      id: "csv",
      name: "CSV File",
      icon: FileIcon,
      description: "Comma-separated values",
    },
  ];

  const handleExport = async () => {
    if (!canvas) return;
    setIsExporting(true);

    try {
      let successFlag = false;

      switch (selectedFormat) {
        case "json":
          successFlag = exportAsJson(canvas, "JSON FileName");
          break;
        case "png":
          successFlag = exportAsPng(canvas, "PNG FileName");
          break;
        case "svg":
          successFlag = exportAsSVG(canvas, "SVG FileName");
          break;
        case "pdf":
          successFlag = exportAsPDF(canvas, "PDF FileName");
          break;
        case "jpg":
          successFlag = exportAsJpg(canvas, "JPG FileName");
          break;
        case "jpeg":
          successFlag = exportAsJpeg(canvas, "JPEG File Name");
          break;
        case "html":
          successFlag = exportAsHtml(canvas, "HTML File Name");
          break;
        case "pptx":
          successFlag = exportAsPptx(canvas, "PPTX File Name");
          break;
        case "gif":
          successFlag = exportAsGif(canvas, "GIF File Name");
          break;
        case "docx":
          successFlag = exportAsDocx(canvas, "DOCX File Name");
          break;
        case "csv":
          successFlag = exportAsCsv(canvas, "CSV File Name");
          break;
        default:
          break;
      }

      if (successFlag) {
        setTimeout(() => {
          onClose();
        }, 500);
      }
    } catch (e) {
      throw new Error("Export failed");
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={"sm:max-w-lg bg-gradient-to-br from-purple-50 via-white to-purple-100 rounded-2xl shadow-2xl p-0 border-0 max-w-[98vw] w-full animate-fade-in min-h-[320px] max-h-[420px] flex flex-col justify-between"}>
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className={"text-xl text-purple-900 font-black tracking-tight drop-shadow-sm"}>Export Your Design</DialogTitle>
        </DialogHeader>
        <div className="py-2 px-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
          <h3 className="text-xs font-bold mb-2 text-purple-700 uppercase tracking-wider">Choose Format</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {exportFormats.map((exportFormat) => (
              <Card
                key={exportFormat.id}
                className={cn(
                  "cursor-pointer border-2 rounded-xl transition-all duration-200 flex-1 min-w-0 bg-white/80 hover:bg-purple-100 hover:border-purple-400",
                  selectedFormat === exportFormat.id
                    ? "border-purple-700 bg-purple-100 shadow-lg scale-105"
                    : "border-gray-200"
                )}
                onClick={() => setSelectedFormat(exportFormat.id)}
              >
                <CardContent
                  className={"p-3 flex flex-col items-center text-center min-h-[80px]"}
                >
                  <exportFormat.icon
                    className={cn(
                      "h-7 w-7 mb-1",
                      selectedFormat === exportFormat.id
                        ? "text-purple-700"
                        : "text-gray-400"
                    )}
                  />
                  <h4 className="font-extrabold text-xs text-gray-900 leading-tight">{exportFormat.name}</h4>
                  <p className="mt-0.5 text-[10px] text-gray-500 font-medium leading-tight">
                    {exportFormat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <DialogFooter className="px-6 pb-4 pt-2 flex justify-end">
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="min-w-[120px] bg-gradient-to-r from-purple-700 to-purple-400 text-white font-extrabold rounded-lg shadow-lg hover:from-purple-800 hover:to-purple-500 transition-all duration-200 text-base py-2"
            variant="default"
          >
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export {selectedFormat.toUpperCase()}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ExportModal;
