// Components
import {
  WelcomeHeader,
  StatsCard,
  RecentActivities,
  QuickStatsActions,
  SystemOverview,
  VaccineManagement,
  DashboardLoading,
  DashboardError,
  StatsGrid,
  ActivitiesGrid,
  ChartsGrid,
} from "../components";

// Hooks
import {
  useDashboardVet,
  useDashboardVetStats,
  useVetAppointmentStats,
  useVetRecentActivities,
} from "../hooks";

export default function VetDashboardPage() {
  // Lấy role từ localStorage (ưu tiên giống AdminDashboardPage)
  const roleFromStorage = localStorage.getItem("role");
  const currentRole = roleFromStorage ? Number(roleFromStorage) : undefined;
  const { data: dashboardData, isLoading, error, isError } = useDashboardVet();

  // Custom hooks for data processing
  const stats = useDashboardVetStats(dashboardData);
  const appointmentStats = useVetAppointmentStats(dashboardData);
  const recentActivitiesData = useVetRecentActivities(dashboardData);

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (isError) {
    return <DashboardError error={error} />;
  }

  return (
    <div className="min-h-full space-y-6">
      {/* Dashboard Content */}
      {/* Welcome Header */}
      <WelcomeHeader
        pending={appointmentStats.pending}
        completed={appointmentStats.completed}
        lastUpdated={dashboardData?.lastUpdated}
        role={currentRole}
      />

      {/* Stats Cards */}
      <StatsGrid>
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            iconName={stat.iconName}
            color={stat.color}
          />
        ))}
      </StatsGrid>

      {/* Activities Section */}
      <ActivitiesGrid>
        <RecentActivities activities={recentActivitiesData} />
        <QuickStatsActions
          appointmentStats={appointmentStats}
          totalVets={1} // Current vet only
        />
      </ActivitiesGrid>

      {/* Charts Section */}
      <ChartsGrid>
        <SystemOverview
          totalAccounts={0} // Not applicable for vet
          totalActiveAccounts={0} // Not applicable for vet
          totalMicrochips={
            dashboardData?.totalProcessedAppointmentMicrochips || 0
          }
          totalDiseases={dashboardData?.totalVaccines || 0}
        />
        <VaccineManagement
          totalVaccines={dashboardData?.totalVaccines || 0}
          totalVaccineBatches={dashboardData?.totalVaccineBatches || 0}
          totalVaccineExports={
            dashboardData?.totalProcessedAppointmentVaccinations || 0
          }
          totalVaccineReceipts={
            dashboardData?.totalCheckedInAppointmentVaccinations || 0
          }
          totalVaccineReceiptDetails={
            dashboardData?.totalCheckedInAppointmentHealthConditions || 0
          }
        />
      </ChartsGrid>
    </div>
  );
}
