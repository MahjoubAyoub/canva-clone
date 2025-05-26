import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PptxGenJS from "pptxgenjs";

export function exportAsJson(canvas, fileName = "FileName") {
  if (!canvas) return;

  try {
    const canvasData = canvas.toJSON(["id", "filters"]);

    const jsonString = JSON.stringify(canvasData, null, 2);

    const canvasJsonBlob = new Blob([jsonString], { type: "application/json" });
    saveAs(canvasJsonBlob, `${fileName}.json`);
  } catch (e) {
    return false;
  }
}

export function exportAsPng(canvas, fileName = "PNG FileName", options = {}) {
  if (!canvas) return;

  try {
    const defaultOptions = {
      format: "png",
      quality: 1,
      multiplier: 1,
      enableRetinaScaling: true,
      ...options,
    };

    const dataURL = canvas.toDataURL(defaultOptions);

    saveAs(dataURL, `${fileName}.png`);
  } catch (e) {
    return false;
  }
}

export function exportAsSVG(canvas, fileName = "SVG Design") {
  if (!canvas) return;

  try {
    const svgData = canvas.toSVG();

    const blob = new Blob([svgData], { type: "image/svg+xml" });
    saveAs(blob, `${fileName}.svg`);

    return true;
  } catch (e) {
    return false;
  }
}

export function exportAsPDF(canvas, fileName = "PDF Design", options = {}) {
  if (!canvas) return;

  try {
    const defaultOptions = {
      format: "a4",
      orientation: "landscape",
      unit: "mm",
      ...options,
    };

    const pdf = new jsPDF(
      defaultOptions.orientation,
      defaultOptions.unit,
      defaultOptions.format
    );

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const scale =
      Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight) * 0.9; //90% available space

    const x = (pdfWidth - canvasWidth * scale) / 2;
    const y = (pdfHeight - canvasHeight * scale) / 2;

    const imgData = canvas.toDataURL("image/png", 1.0);

    pdf.addImage(
      imgData,
      "PNG",
      x,
      y,
      canvasWidth * scale,
      canvasHeight * scale
    );

    pdf.save(`${fileName}.pdf`);

    return true;
  } catch (e) {
    return false;
  }
}

export function exportAsJpg(canvas, fileName = "JPG FileName", options = {}) {
  if (!canvas) return;
  try {
    const defaultOptions = {
      format: "jpeg",
      quality: 1,
      multiplier: 1,
      enableRetinaScaling: true,
      ...options,
    };
    const dataURL = canvas.toDataURL({ format: "jpeg", quality: 1 });
    saveAs(dataURL, `${fileName}.jpg`);
  } catch (e) {
    return false;
  }
}

export function exportAsJpeg(canvas, fileName = "JPEG FileName", options = {}) {
  return exportAsJpg(canvas, fileName, options);
}

export function exportAsHtml(canvas, fileName = "HTML Design") {
  if (!canvas) return;
  try {
    const html = `<html><body>${canvas.toSVG()}</body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    saveAs(blob, `${fileName}.html`);
    return true;
  } catch (e) {
    return false;
  }
}

export function exportAsPptx(canvas, fileName = "PPTX Design") {
  if (!canvas) return;
  try {
    const pptx = new PptxGenJS();
    const slide = pptx.addSlide();
    const imgData = canvas.toDataURL({ format: "png", quality: 1 });
    slide.addImage({ data: imgData, x: 0.5, y: 0.5, w: 9, h: 5 });
    pptx.writeFile({ fileName: `${fileName}.pptx` });
    return true;
  } catch (e) {
    return false;
  }
}

// GIF export (static single frame)
export function exportAsGif(canvas, fileName = "GIF File Name") {
  if (!canvas) return;
  try {
    const dataURL = canvas.toDataURL({ format: "png", quality: 1 });
    // For a real animated GIF, you'd need to use a library like gif.js and multiple frames
    // Here we just export a static GIF from the PNG data
    fetch(dataURL)
      .then(res => res.blob())
      .then(blob => {
        const gifBlob = new Blob([blob], { type: "image/gif" });
        saveAs(gifBlob, `${fileName}.gif`);
      });
    return true;
  } catch (e) {
    return false;
  }
}

// DOCX export (image in Word doc)
export function exportAsDocx(canvas, fileName = "DOCX File Name") {
  if (!canvas) return;
  try {
    // Use docx library for more advanced features
    const imgData = canvas.toDataURL({ format: "png", quality: 1 });
    const html = `<!DOCTYPE html><html><body><img src='${imgData}' /></body></html>`;
    const blob = new Blob([html], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    saveAs(blob, `${fileName}.docx`);
    return true;
  } catch (e) {
    return false;
  }
}

// CSV export (flatten canvas objects)
export function exportAsCsv(canvas, fileName = "CSV File Name") {
  if (!canvas) return;
  try {
    const canvasData = canvas.toJSON(["id", "filters"]);
    const objects = canvasData.objects || [];
    if (!objects.length) return false;
    const keys = Object.keys(objects[0]);
    const csvRows = [keys.join(",")];
    for (const obj of objects) {
      csvRows.push(keys.map(k => JSON.stringify(obj[k] ?? "")).join(","));
    }
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    saveAs(blob, `${fileName}.csv`);
    return true;
  } catch (e) {
    return false;
  }
}
