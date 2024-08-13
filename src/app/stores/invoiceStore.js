// File: /app/stores/invoiceStore.js
import { create } from "zustand";

const useInvoiceStore = create((set) => ({
  invoices: [],
  selectedInvoice: null,
  setInvoices: (invoices) => set({ invoices }),
  setSelectedInvoice: (invoice) => set({ selectedInvoice: invoice }),
  updateInvoiceStatus: (id, newStatus) =>
    set((state) => ({
      invoices: state.invoices.map((invoice) =>
        invoice.id === id ? { ...invoice, status: newStatus } : invoice
      ),
      selectedInvoice:
        state.selectedInvoice?.id === id
          ? { ...state.selectedInvoice, status: newStatus }
          : state.selectedInvoice,
    })),
}));

export default useInvoiceStore;
