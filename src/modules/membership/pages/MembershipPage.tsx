import { useSearchParams } from "react-router-dom";
import MembershipListPage from "./MemberShipListPage";
import MembershipDetailPage from "./MembershipDetailPage";

export default function MembershipPage() {
  const [searchParams] = useSearchParams();
  const membershipId = searchParams.get("membershipId");

  // If membershipId is present in query params, show detail view
  if (membershipId) {
    return <MembershipDetailPage />;
  }

  // Otherwise, show list view
  return <MembershipListPage />;
}
