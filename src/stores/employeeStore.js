import create from "zustand";

const useEmployeeStore = create((set) => ({
  weeklyData: [],
  monthlyData: [],
  isLoading: false,
  setWeeklyData: (data) => set({ weeklyData: data }),
  setMonthlyData: (data) => set({ monthlyData: data }),
  setIsLoading: (loading) => set({ isLoading: loading }),

  addWeeklyHours: (hours) =>
    set((state) => {
      const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
      const updatedWeeklyData = state.weeklyData.map((entry) =>
        entry.day === today ? { ...entry, hours: entry.hours + hours } : entry
      );
      return { weeklyData: updatedWeeklyData };
    }),
}));

export default useEmployeeStore;
