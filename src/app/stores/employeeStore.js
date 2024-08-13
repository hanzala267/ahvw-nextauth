import { create } from "zustand";

const useEmployeeStore = create((set) => ({
  weeklyData: [],
  monthlyData: [],
  isLoading: false,
  setWeeklyData: (data) => set({ weeklyData: data }),
  setMonthlyData: (data) => set({ monthlyData: data }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useEmployeeStore;
