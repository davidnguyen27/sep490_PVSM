// Hooks
export { useCustomers, useCustomerById, useCustomerUpdate } from "./hooks";

// Services
export {
  customerService,
  type CustomerUpdatePayload,
} from "./services/customer.service";

// Types
export type { Customer } from "./types/customer.type";

// Components
export { CustomerTable } from "./components/CustomerTable";
export { CustomerEditModal } from "./components/CustomerEditModal";

// Pages
export { default as CustomerDetailPage } from "./pages/CustomerDetailPage";
