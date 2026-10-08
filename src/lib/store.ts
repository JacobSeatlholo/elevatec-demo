"use client";

import { create } from "zustand";
import type { FinishLevel, PropertyType, ToggleKey } from "@/lib/fitout";

export interface CalcState {
  /* Step 1 */
  propertyType: PropertyType;
  suburb: string;
  postcode: string;
  /* Step 2 */
  floorArea: number;
  desks: number;
  toggles: ToggleKey[];
  /* Step 3 */
  finish: FinishLevel;
  /* UI */
  leadOpen: boolean;
  setPropertyType: (v: PropertyType) => void;
  setSuburb: (v: string) => void;
  setPostcode: (v: string) => void;
  setFloorArea: (v: number) => void;
  setDesks: (v: number) => void;
  toggle: (v: ToggleKey) => void;
  setFinish: (v: FinishLevel) => void;
  setLeadOpen: (v: boolean) => void;
}

export const useCalcStore = create<CalcState>((set) => ({
  propertyType: "commercial-office",
  suburb: "Melbourne CBD",
  postcode: "3000",
  floorArea: 350,
  desks: 35,
  toggles: ["boardroom", "kitchenette"],
  finish: "executive",
  leadOpen: false,
  setPropertyType: (v) => set({ propertyType: v }),
  setSuburb: (v) => set({ suburb: v }),
  setPostcode: (v) => set({ postcode: v }),
  setFloorArea: (v) => set({ floorArea: v }),
  setDesks: (v) => set({ desks: v }),
  toggle: (v) =>
    set((s) => ({
      toggles: s.toggles.includes(v)
        ? s.toggles.filter((t) => t !== v)
        : [...s.toggles, v],
    })),
  setFinish: (v) => set({ finish: v }),
  setLeadOpen: (v) => set({ leadOpen: v }),
}));
