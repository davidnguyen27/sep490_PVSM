import { useEffect, useState } from "react";

export function useVetId(): number | undefined {
  const [vetId, setVetId] = useState<number | undefined>();

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) return;

      const user = JSON.parse(userStr);
      if (user?.vetId) {
        setVetId(Number(user.vetId));
      }
    } catch (error) {
      console.error("Error parsing vetId from localStorage:", error);
    }
  }, []);

  return vetId;
}
