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
    </div>
  );
}
