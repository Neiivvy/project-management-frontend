"use client";

import { useState } from "react";
import { FaFilePdf, FaSpinner } from "react-icons/fa";

// Brand colors as RGB triples (jsPDF wants numeric channels, not hex strings)
const GREEN = [15, 82, 56]; // #0f5238
const GREEN_TINT = [232, 242, 238]; // #e8f2ee
const TEXT_DARK = [16, 35, 27]; // #10231b
const TEXT_MUTED = [130, 130, 130];
const BORDER = [230, 230, 230];

export default function ExportPdfButton({ report }) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (!report) return;
    setLoading(true);

    try {
      // Loaded dynamically so this never runs during SSR
      const { jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;

      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 40;
      let y;

      const sectionHeader = (title, startY) => {
        doc.setTextColor(...GREEN);
        doc.setFontSize(13);
        doc.setFont("helvetica", "bold");
        doc.text(title, margin, startY);
        doc.setDrawColor(...BORDER);
        doc.line(margin, startY + 8, pageWidth - margin, startY + 8);
        return startY + 28;
      };

      const ensureSpace = (needed, currentY) => {
        if (currentY + needed > pageHeight - 50) {
          doc.addPage();
          return 50;
        }
        return currentY;
      };

      // --- Header band ---
      doc.setFillColor(...GREEN);
      doc.rect(0, 0, pageWidth, 84, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("Project Report", margin, 42);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(report.projectName || "Untitled Project", margin, 62);

      y = 108;

      doc.setFontSize(9);
      doc.setTextColor(...TEXT_MUTED);
      doc.text(
        `Generated on ${new Date().toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`,
        margin,
        y,
      );
      y += 26;

      // --- Project information ---
      y = sectionHeader("Project Information", y);

      const infoRows = [
        ["Manager", report.manager || "—"],
        ["Status", report.status || "—"],
        ["Team Size", `${report.teamSize ?? 0} members`],
        [
          "Deadline",
          report.deadline
            ? new Date(report.deadline).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "—",
        ],
      ];

      doc.setFontSize(10);
      infoRows.forEach(([label, value]) => {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...TEXT_DARK);
        doc.text(`${label}:`, margin, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(70, 70, 70);
        doc.text(String(value), margin + 100, y);
        y += 18;
      });
      y += 14;

      // --- Summary stats ---
      y = ensureSpace(140, y);
      y = sectionHeader("Task Summary", y);

      autoTable(doc, {
        startY: y,
        margin: { left: margin, right: margin },
        head: [["Metric", "Value"]],
        body: [
          ["Total Tasks", report.totalTasks ?? 0],
          ["Completed", report.completedTasks ?? 0],
          ["In Progress", report.inProgressTasks ?? 0],
          ["Review", report.reviewTasks ?? 0],
          ["To Do", report.todoTasks ?? 0],
          ["Completion", `${report.completionPercentage ?? 0}%`],
        ],
        theme: "plain",
        headStyles: {
          fillColor: GREEN_TINT,
          textColor: GREEN,
          fontStyle: "bold",
        },
        styles: { fontSize: 10, cellPadding: 6, textColor: TEXT_DARK },
        alternateRowStyles: { fillColor: [250, 250, 249] },
      });

      y = doc.lastAutoTable.finalY + 34;

      // --- Team performance ---
      const members = Object.entries(report.tasksByMember || {});

      if (members.length > 0) {
        y = ensureSpace(120, y);
        y = sectionHeader("Team Performance", y);

        autoTable(doc, {
          startY: y,
          margin: { left: margin, right: margin },
          head: [["Member", "Assigned", "Completed", "Progress"]],
          body: members.map(([name, data]) => {
            const pct = data.assigned
              ? Math.round((data.completed / data.assigned) * 100)
              : 0;
            return [name, data.assigned, data.completed, `${pct}%`];
          }),
          theme: "plain",
          headStyles: {
            fillColor: GREEN_TINT,
            textColor: GREEN,
            fontStyle: "bold",
          },
          styles: { fontSize: 10, cellPadding: 6, textColor: TEXT_DARK },
          alternateRowStyles: { fillColor: [250, 250, 249] },
          columnStyles: {
            1: { halign: "center" },
            2: { halign: "center" },
            3: { halign: "center" },
          },
        });

        y = doc.lastAutoTable.finalY + 20;
      }

      // --- Footer with page numbers ---
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(...TEXT_MUTED);
        doc.text(
          `Page ${i} of ${pageCount}`,
          pageWidth - margin,
          pageHeight - 20,
          { align: "right" },
        );
        doc.text(
          report.projectName || "Project Report",
          margin,
          pageHeight - 20,
        );
      }

      const fileSafeName = (report.projectName || "project")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      doc.save(`${fileSafeName}-report.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={!report || loading}
      className=" inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-[#0f5238] text-white shadow-sm transition-all duration-200 hover:bg-[#0c4530] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#0f5238]"
    >
      {loading ? (
        <FaSpinner className="animate-spin text-xs" />
      ) : (
        <FaFilePdf className="text-xs" />
      )}
      {loading ? "Generating..." : "Export PDF"}
    </button>
  );
}
