import { create } from "zustand";

export const useEmployeeStore = create((set) => ({
  employees: [],
  selectedEmployee: null,
  setSelectedEmployee: (employee) => set({ selectedEmployee: employee }),
  fetchEmployees: async () => {
    try {
      const response = await fetch("/api/admin/employees");
      if (response.ok) {
        const data = await response.json();
        set({ employees: data });
        if (data.length > 0 && !selectedEmployee) {
          set({ selectedEmployee: data[0] });
        }
      } else {
        console.error("Failed to fetch employees");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  },
}));
