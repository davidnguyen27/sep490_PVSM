import { useMemo } from "react";
import { formatData } from "@/shared/utils/format.utils";

interface VaccineReceipt {
  receiptDate?: string;
  receiptCode?: string;
}

interface VaccineExport {
  exportDate?: string;
  exportCode?: string;
}

interface ImportDataItem {
  vaccineReceiptDetailId: number | null;
  quantity?: number;
  vaccineReceipt?: VaccineReceipt;
  vaccineStatus?: string;
  suppiler?: string;
  notes?: string;
  createdBy?: string;
  createdAt?: string;
}

interface ExportDataItem {
  vaccineExportDetailId: number | null;
  quantity?: number;
  vaccineExport?: VaccineExport;
  purpose?: string;
  notes?: string;
  createdBy?: string;
  createdAt?: string;
}

interface HistoryEntry {
  id: string;
  type: "import" | "export";
  date: string;
  quantity: number;
  code: string;
  status?: string;
  purpose?: string;
  supplier?: string;
  notes?: string;
  createdBy?: string;
}

interface CombinedHistoryEntry {
  id: string;
  date: string;
  importCode?: string;
  exportCode?: string;
  importDate?: string;
  exportDate?: string;
  importQuantity?: number;
  exportQuantity?: number;
  currentStock: number;
  importNotes?: string;
  exportNotes?: string;
  exportPurpose?: string;
  supplier?: string;
  importStatus?: string;
  createdBy?: string;
}

interface UseVaccineBatchHistoryProps {
  importData: ImportDataItem[] | ImportDataItem | null | undefined;
  exportData: ExportDataItem[] | null | undefined;
}

export function useVaccineBatchHistory({
  importData,
  exportData,
}: UseVaccineBatchHistoryProps) {
  const processedData = useMemo(() => {
    // Normalize import data
    const importHistory: HistoryEntry[] = (
      Array.isArray(importData) ? importData : importData ? [importData] : []
    ).map((item) => ({
      id: `import-${item.vaccineReceiptDetailId || "unknown"}`,
      type: "import" as const,
      date:
        item.vaccineReceipt?.receiptDate ||
        item.createdAt ||
        new Date().toISOString(),
      quantity: item.quantity || 0,
      code: item.vaccineReceipt?.receiptCode || "N/A",
      status: item.vaccineStatus,
      supplier: item.suppiler,
      notes: item.notes,
      createdBy: item.createdBy,
    }));

    // Normalize export data
    const exportHistory: HistoryEntry[] = (exportData || []).map((item) => ({
      id: `export-${item.vaccineExportDetailId || "unknown"}`,
      type: "export" as const,
      date:
        item.vaccineExport?.exportDate ||
        item.createdAt ||
        new Date().toISOString(),
      quantity: item.quantity || 0,
      code: item.vaccineExport?.exportCode || "N/A",
      purpose: item.purpose,
      notes: item.notes,
      createdBy: item.createdBy,
    }));

    // Create combined history grouped by date
    const createCombinedHistory = (): CombinedHistoryEntry[] => {
      const dateMap = new Map<string, CombinedHistoryEntry>();
      let runningStock = 0;

      // Sort all entries by date (oldest first for stock calculation)
      const sortedEntries = [...importHistory, ...exportHistory].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

      // Group entries by date
      sortedEntries.forEach((entry) => {
        const dateKey = formatData.formatDateYMD(entry.date);

        if (!dateMap.has(dateKey)) {
          dateMap.set(dateKey, {
            id: `combined-${dateKey}`,
            date: entry.date,
            currentStock: 0,
          });
        }

        const combined = dateMap.get(dateKey)!;

        if (entry.type === "import") {
          combined.importCode = entry.code;
          combined.importDate = entry.date;
          combined.importQuantity =
            (combined.importQuantity || 0) + entry.quantity;
          combined.importNotes = entry.notes;
          combined.supplier = entry.supplier;
          combined.importStatus = entry.status;
          combined.createdBy = entry.createdBy;
          runningStock += entry.quantity;
        } else {
          combined.exportCode = entry.code;
          combined.exportDate = entry.date;
          combined.exportQuantity =
            (combined.exportQuantity || 0) + entry.quantity;
          combined.exportNotes = entry.notes;
          combined.exportPurpose = entry.purpose;
          combined.createdBy = combined.createdBy || entry.createdBy;
          runningStock -= entry.quantity;
        }

        combined.currentStock = runningStock;
      });

      // Convert map to array and sort by date (newest first)
      return Array.from(dateMap.values()).sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    };

    const combinedHistory = createCombinedHistory();

    // Calculate statistics
    const totalImported = importHistory.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    const totalExported = exportHistory.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    const currentStock = totalImported - totalExported;

    return {
      importHistory,
      exportHistory,
      combinedHistory,
      statistics: {
        totalImported,
        totalExported,
        currentStock,
        totalTransactions: combinedHistory.length,
        importCount: importHistory.length,
        exportCount: exportHistory.length,
      },
    };
  }, [importData, exportData]);

  return processedData;
}
