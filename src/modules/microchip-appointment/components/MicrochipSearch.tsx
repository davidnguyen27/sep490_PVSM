// import { useState } from "react";
// import {
//   Search,
//   Scan,
//   PawPrint,
//   Calendar,
//   Info,
//   AlertCircle,
// } from "lucide-react";
// import { Button, Input, Label } from "@/components/ui";
// import { useMicrochipByCode } from "@/modules/microchip-item";
// import { AppStatusMapped, getBadgeColor } from "@/shared/utils/status.utils";

// interface MicrochipSearchProps {
//   disabled?: boolean;
//   className?: string;
// }

// export function MicrochipSearch({
//   disabled = false,
//   className,
// }: MicrochipSearchProps) {
//   const [searchCode, setSearchCode] = useState("");
//   const [submittedCode, setSubmittedCode] = useState<string>("");

//   const {
//     data: microchipData,
//     isLoading,
//     error,
//   } = useMicrochipByCode({
//     microchipCode: submittedCode,
//     status: 1, // Available status
//     enabled: !!submittedCode && submittedCode.length >= 3,
//   });

//   // microchipData is now always the object or null
//   const microchip = microchipData;

//   const handleSearch = () => {
//     if (!searchCode.trim() || searchCode.length < 3) return;
//     setSubmittedCode(searchCode.trim());
//   };

//   const renderSearchResult = () => {
//     if (!submittedCode || submittedCode.length < 3) return null;

//     if (isLoading) {
//       return (
//         <div className="mt-4 flex items-center gap-2 text-blue-600">
//           <span className="h-5 w-5 animate-spin rounded-full border-b-2 border-blue-600"></span>
//           Đang tìm kiếm...
//         </div>
//       );
//     }

//     if (error) {
//       return (
//         <div className="text-danger mt-4 flex items-center gap-2">
//           <AlertCircle className="h-5 w-5" /> Có lỗi xảy ra khi tìm kiếm.
//         </div>
//       );
//     }

//     if (!microchip) {
//       return (
//         <div className="mt-4 flex items-center gap-2 text-yellow-600">
//           <Info className="h-5 w-5" /> Không tìm thấy microchip với mã "
//           {submittedCode}"
//         </div>
//       );
//     }

//     return (
//       <div className="mt-6 space-y-6">
//         {/* Microchip Info */}
//         <div className="flex flex-col items-start gap-6 md:flex-row">
//           <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full border border-teal-200 bg-teal-50">
//             <Scan className="h-10 w-10 text-teal-500" />
//           </div>
//           <div className="flex-1">
//             <h3 className="font-inter-700 text-primary mb-1 flex items-center gap-2 text-lg">
//               Microchip #{microchip.microchipId}
//             </h3>
//             <div className="font-nunito-500 mb-1 text-gray-700">
//               {microchip.name}
//             </div>
//             <div className="font-nunito-400 mb-1 text-sm text-gray-500">
//               <span className="font-nunito-500">Ngày cài đặt:</span>{" "}
//               {microchip.installationDate
//                 ? new Date(microchip.installationDate).toLocaleDateString()
//                 : "-"}
//             </div>
//             <div className="font-nunito-400 text-sm">
//               <span className="font-nunito-500">Trạng thái:</span>{" "}
//               <span className="font-nunito-600 ml-1 inline-block rounded border px-2 py-0.5 text-xs text-white">
//                 {microchip.status}
//               </span>
//             </div>
//             {microchip.description && (
//               <div className="font-nunito-400 mt-1 text-xs text-gray-500 italic">
//                 {microchip.description}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Thông tin thú cưng */}
//         {microchip.pet && (
//           <div className="flex flex-col items-start gap-6 rounded-xl border border-teal-100 bg-teal-50 p-4 md:flex-row">
//             <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-teal-200 bg-white">
//               <PawPrint className="h-8 w-8 text-teal-400" />
//             </div>
//             <div className="flex-1">
//               <h4 className="font-inter-600 mb-1 flex items-center gap-2 text-base text-teal-700">
//                 Thú cưng: {microchip.pet.name}
//               </h4>
//               <div className="font-nunito-400 mb-1 text-sm text-gray-700">
//                 <span className="font-nunito-500">Mã thú cưng:</span>{" "}
//                 {microchip.pet.petCode}
//               </div>
//               <div className="font-nunito-400 mb-1 text-sm text-gray-700">
//                 <span className="font-nunito-500">Giống loài:</span>{" "}
//                 {microchip.pet.species}
//               </div>
//               <div className="font-nunito-400 mb-1 text-sm text-gray-700">
//                 <span className="font-nunito-500">Chủ nuôi:</span>{" "}
//                 {microchip.pet.customer?.fullName}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Lịch hẹn */}
//         {microchip.pet?.appointmentDetails &&
//           microchip.pet.appointmentDetails.length > 0 && (
//             <div>
//               <h4 className="font-inter-600 text-primary mb-2 flex items-center gap-2 text-base">
//                 <Calendar className="h-5 w-5" /> Lịch hẹn liên quan
//               </h4>
//               <div className="overflow-x-auto rounded-lg border border-gray-200">
//                 <table className="min-w-full bg-white text-sm">
//                   <thead>
//                     <tr className="bg-teal-50 text-teal-700">
//                       <th className="px-3 py-2 text-left">Mã lịch hẹn</th>
//                       <th className="px-3 py-2 text-left">Ngày hẹn</th>
//                       <th className="px-3 py-2 text-left">Loại dịch vụ</th>
//                       <th className="px-3 py-2 text-left">Trạng thái</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {microchip.pet.appointmentDetails.map((a) => (
//                       <tr key={a.appointmentDetailId} className="border-t">
//                         <td className="font-nunito-500 px-3 py-2">
//                           {a.appointmentDetailCode}
//                         </td>
//                         <td className="font-nunito-400 px-3 py-2">
//                           {a.appointmentDate
//                             ? new Date(a.appointmentDate).toLocaleString()
//                             : "-"}
//                         </td>
//                         <td className="font-nunito-400 px-3 py-2">
//                           {a.serviceType === 1
//                             ? "Khám bệnh"
//                             : a.serviceType === 2
//                               ? "Tiêm chủng"
//                               : a.serviceType === 3
//                                 ? "Microchip"
//                                 : "Khác"}
//                         </td>
//                         <td className="font-nunito-400 px-3 py-2">
//                           <span
//                             className={`rounded border px-2 py-0.5 ${getBadgeColor(a.appointmentStatus)} font-nunito-600 text-xs`}
//                           >
//                             {AppStatusMapped[a.appointmentStatus] ||
//                               "Không xác định"}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//         {/* Không có lịch hẹn */}
//         {microchip.pet?.appointmentDetails?.length === 0 && (
//           <div className="font-nunito-400 flex items-center gap-2 text-gray-500 italic">
//             <Info className="h-4 w-4" /> Không có lịch hẹn nào liên quan đến
//             microchip này.
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className={`space-y-4 ${className}`}>
//       <div className="space-y-2">
//         <Label htmlFor="microchip-search" className="font-inter-600 text-sm">
//           Tìm kiếm microchip
//         </Label>
//         <div className="flex gap-2">
//           <div className="relative flex-1">
//             <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
//             <Input
//               id="microchip-search"
//               type="text"
//               placeholder="Nhập mã microchip..."
//               value={searchCode}
//               onChange={(e) => setSearchCode(e.target.value)}
//               disabled={disabled}
//               className="font-nunito-400 pl-10"
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   e.preventDefault();
//                   handleSearch();
//                 }
//               }}
//             />
//           </div>
//           <Button
//             variant="outline"
//             onClick={handleSearch}
//             disabled={disabled || !searchCode.trim() || searchCode.length < 3}
//             className="font-inter-600 shrink-0"
//           >
//             <Scan className="h-4 w-4" />
//             Tìm kiếm
//           </Button>
//         </div>
//         <p className="text-muted-foreground font-nunito-400 text-xs">
//           Nhập ít nhất 3 ký tự để bắt đầu tìm kiếm
//         </p>
//       </div>

//       {renderSearchResult()}
//     </div>
//   );
// }
