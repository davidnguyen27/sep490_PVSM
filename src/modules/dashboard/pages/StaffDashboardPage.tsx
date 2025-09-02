// Components
import {
  WelcomeHeader,
  StatsCard,
  RecentActivities,
  QuickStatsActions,
  DashboardLoading,
  DashboardError,
  StatsGrid,
  ActivitiesGrid,
  ChartsGrid,
} from "../components";
import StaffSystemOverview from "../components/StaffSystemOverview";
import VetWorkScheduleManagement from "../components/VetWorkScheduleManagement";

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

  // Lấy role từ localStorage (ưu tiên giống AdminDashboardPage)
  const roleFromStorage = localStorage.getItem("role");
  const currentRole = roleFromStorage ? Number(roleFromStorage) : undefined;

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
        pending={appointmentStats.processing}
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
          processingAppointments={appointmentStats.processing}
          confirmedAppointments={appointmentStats.confirmed}
          checkedInAppointments={appointmentStats.checkedIn}
          processedAppointments={appointmentStats.processed}
          paidAppointments={appointmentStats.paid}
          completedAppointments={appointmentStats.completed}
          cancelledAppointments={appointmentStats.cancel}
        />
      </ActivitiesGrid>

      {/* Charts Section */}
      <ChartsGrid>
        <StaffSystemOverview
          totalCustomers={dashboardData?.totalCustomers || 0}
          totalPets={dashboardData?.totalPets || 0}
          totalVouchers={dashboardData?.totalVouchers || 0}
          totalPayments={dashboardData?.totalPayments || 0}
        />
        <VetWorkScheduleManagement
          totalSchedules={dashboardData?.totalVetSchedules || 0}
          totalAvailableVetSchedules={dashboardData?.totalAvailableVetSchedules || 0}
          totalScheduledVetSchedules={dashboardData?.totalScheduledVetSchedules || 0}
          totalUnavailableVetSchedules={dashboardData?.totalUnavailableVetSchedules || 0}
        />
      </ChartsGrid>
    </div>
  );
}
