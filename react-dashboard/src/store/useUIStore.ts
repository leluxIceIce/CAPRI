import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  hasLaunchedDashboard: boolean;
  markDashboardLaunched: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      hasLaunchedDashboard: false,
      markDashboardLaunched: () => set({ hasLaunchedDashboard: true }),
    }),
    { name: "eef.ui" }
  )
);
