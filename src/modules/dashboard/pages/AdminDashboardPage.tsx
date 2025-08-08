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
  DashboardLayout,
  StatsGrid,
  ActivitiesGrid,
  ChartsGrid,
} from "../components";

// Hooks
import {
  useDashboardAdmin,
  useDashboardStats,
  useAppointmentStats,
  useRecentActivities,
} from "../hooks";

export default function AdminDashboardPage() {
  const {
    data: dashboardData,
    isLoading,
    error,
    isError,
  } = useDashboardAdmin();

  // Custom hooks for data processing
  const stats = useDashboardStats(dashboardData);
  const appointmentStats = useAppointmentStats(dashboardData);
  const recentActivitiesData = useRecentActivities(dashboardData);

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (isError) {
    return <DashboardError error={error} />;
  }

  return (
    <DashboardLayout>
      {/* Welcome Header */}
      <WelcomeHeader
        pending={appointmentStats.pending}
        completed={appointmentStats.completed}
        lastUpdated={dashboardData?.lastUpdated}
      />

      {/* Stats Cards */}
      <StatsGrid>
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            iconName={stat.iconName as any}
            color={stat.color}
          />
        ))}
      </StatsGrid>

      {/* Activities Section */}
      <ActivitiesGrid>
        <RecentActivities activities={recentActivitiesData as any} />
        <QuickStatsActions
          appointmentStats={appointmentStats}
          totalVets={dashboardData?.totalVets || 0}
        />
      </ActivitiesGrid>

      {/* Charts Section */}
      <ChartsGrid>
        <SystemOverview
          totalAccounts={dashboardData?.totalAccounts || 0}
          totalActiveAccounts={dashboardData?.totalActiveAccounts || 0}
          totalMicrochips={dashboardData?.totalMicrochips || 0}
          totalDiseases={dashboardData?.totalDiseases || 0}
        />
        <VaccineManagement
          totalVaccines={dashboardData?.totalVaccines || 0}
          totalVaccineBatches={dashboardData?.totalVaccineBatches || 0}
          totalVaccineExports={dashboardData?.totalVaccineExports || 0}
          totalVaccineReceipts={dashboardData?.totalVaccineReceipts || 0}
          totalVaccineReceiptDetails={
            dashboardData?.totalVaccineReceiptDetails || 0
          }
        />
      </ChartsGrid>
    </DashboardLayout>
  );
}
