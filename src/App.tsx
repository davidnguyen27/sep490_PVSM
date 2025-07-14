import { AppRoutes } from "@/routes";
import { AppProvider } from "@/shared/context/AppContext";
import { Toaster } from "sonner";

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
      <Toaster
        position="top-center"
        richColors
        toastOptions={{ className: "text-center" }}
      />
    </AppProvider>
  );
}
