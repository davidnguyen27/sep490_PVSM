import { useSearchParams } from "react-router-dom";
import DiseaseListPage from "./DiseaseListPage";
import DiseaseDetailPage from "./DiseaseDetailPage";

export default function DiseaseMainPage() {
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");
  const diseaseId = searchParams.get("diseaseId");

  // Nếu có action=detail và diseaseId thì hiển thị trang detail
  if (action === "detail" && diseaseId) {
    return <DiseaseDetailPage />;
  }

  // Mặc định hiển thị danh sách
  return <DiseaseListPage />;
}
