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
  useDashboardStaff,
  useDashboardStaffStats,
  useStaffAppointmentStats,
  useStaffRecentActivities,
} from "../hooks";

export default function StaffDashboardPage() {
  const {
    data: dashboardData,
    isLoading,
    error,
    isError,
  } = useDashboardStaff();

  // Custom hooks for data processing
  const stats = useDashboardStaffStats(dashboardData);
  const appointmentStats = useStaffAppointmentStats(dashboardData);
  const recentActivitiesData = useStaffRecentActivities(dashboardData);

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
          totalVets={dashboardData?.totalVets || 0}
        />
      </ActivitiesGrid>

      {/* Charts Section */}
      <ChartsGrid>
        <SystemOverview
          totalAccounts={dashboardData?.totalCustomers || 0}
          totalActiveAccounts={dashboardData?.totalPets || 0}
          totalMicrochips={dashboardData?.totalAppointmentMicrochips || 0}
          totalDiseases={dashboardData?.totalDiseases || 0}
        />
        <VaccineManagement
          totalVaccines={dashboardData?.totalVaccines || 0}
          totalVaccineBatches={dashboardData?.totalVaccineBatches || 0}
          totalVaccineExports={dashboardData?.totalAppointmentVaccinations || 0}
          totalVaccineReceipts={
            dashboardData?.totalCompletedAppointmentVaccinations || 0
          }
          totalVaccineReceiptDetails={
            dashboardData?.totalPaidAppointmentVaccinations || 0
          }
        />
      </ChartsGrid>
    </DashboardLayout>
  );
}
