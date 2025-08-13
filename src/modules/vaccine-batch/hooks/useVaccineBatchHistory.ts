import { useMemo } from "react";

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
  time: string;
  type: "import" | "export";
  receiptCode?: string;
  exportCode?: string;
  quantity: number;
  currentStock: number;
  notes?: string;
  purpose?: string;
  supplier?: string;
  status?: string;
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

    // Create individual transaction history (separated imports and exports)
    const createCombinedHistory = (): CombinedHistoryEntry[] => {
      const allTransactions: CombinedHistoryEntry[] = [];
      let runningStock = 0;

      // Helper function to extract time from datetime
      const extractTime = (dateString: string): string => {
        return new Date(dateString).toLocaleTimeString("vi-VN", {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
      };

      // Helper function to extract date from datetime
      const extractDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString("vi-VN", {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      };

      // Combine and sort all entries by date (oldest first for stock calculation)
      const allEntries = [
        ...importHistory.map(entry => ({ ...entry, originalType: 'import' as const })),
        ...exportHistory.map(entry => ({ ...entry, originalType: 'export' as const }))
      ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      // Process each transaction individually
      allEntries.forEach((entry) => {
        if (entry.originalType === "import") {
          runningStock += entry.quantity;
          allTransactions.push({
            id: entry.id,
            date: extractDate(entry.date),
            time: extractTime(entry.date),
            type: "import",
            receiptCode: entry.code,
            quantity: entry.quantity,
            currentStock: runningStock,
            notes: entry.notes,
            supplier: entry.supplier,
            status: entry.status,
            createdBy: entry.createdBy,
          });
        } else {
          runningStock -= entry.quantity;
          allTransactions.push({
            id: entry.id,
            date: extractDate(entry.date),
            time: extractTime(entry.date),
            type: "export",
            exportCode: entry.code,
            quantity: entry.quantity,
            currentStock: runningStock,
            notes: entry.notes,
            purpose: entry.purpose,
            createdBy: entry.createdBy,
          });
        }
      });

      // Return sorted by datetime (newest first for display)
      return allTransactions.sort(
        (a, b) => {
          // Parse the original datetime strings for accurate sorting
          const getOriginalDateTime = (transaction: CombinedHistoryEntry) => {
            const originalEntry = allEntries.find(entry => entry.id === transaction.id);
            return originalEntry ? new Date(originalEntry.date).getTime() : 0;
          };

          const dateTimeA = getOriginalDateTime(a);
          const dateTimeB = getOriginalDateTime(b);
          return dateTimeB - dateTimeA; // Newest first
        }
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
