import { useState } from "react";

export const useScheduleModal = () => {
  const [isAddingSchedule, setIsAddingSchedule] = useState(false);
  const [isEditingSchedule, setIsEditingSchedule] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const openAddModal = () => setIsAddingSchedule(true);
  const closeAddModal = () => setIsAddingSchedule(false);
  const openEditModal = (slotId: number) => {
    setSelectedSlot(slotId);
    setIsEditingSchedule(true);
  };
  const closeEditModal = () => {
    setIsEditingSchedule(false);
    setSelectedSlot(null);
  };

  return {
    isAddingSchedule,
    isEditingSchedule,
    selectedSlot,
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
  };
};
