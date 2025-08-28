// Hooks
export { useCustomers, useCustomerById, useCustomerUpdate } from "./hooks";

// Services
export { customerService } from "./services/customer.service";

// Types
export type { Customer } from "./types/customer.type";
export type { CustomerPayload } from "./types/customer.payload.type";

// Components
export { CustomerTable } from "./components/CustomerTable";
export { CustomerEditModal } from "./components/CustomerEditModal";

// Pages
export { default as CustomerDetailPage } from "./pages/CustomerDetailPage";

// Routes
export { customerRoutes } from "./routes/customer.route";
