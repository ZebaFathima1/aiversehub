
// Helper to generate and download PDF
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadPDF = async (elementId: string, fileName: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        const canvas = await html2canvas(element, {
            scale: 3,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight,
            scrollX: 0,
            scrollY: 0,
            x: 0,
            y: 0
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation: canvas.width > canvas.height ? "landscape" : "portrait",
            unit: "px",
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save(`${fileName}.pdf`);
    } catch (error) {
        console.error("PDF Generation Error:", error);
    }
};
