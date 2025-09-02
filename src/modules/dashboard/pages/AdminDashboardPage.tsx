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
  useDashboardAdmin,
  useDashboardStats,
  useAppointmentStats,
  useRecentActivities,
} from "../hooks";
import { useAuth } from "@/modules/auth/hooks/use-auth-context";

export default function AdminDashboardPage() {
  const {
    data: dashboardData,
    isLoading,
    error,
    isError,
  } = useDashboardAdmin();

  // Lấy user hiện tại
  const { user } = useAuth();

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
    <div className="min-h-full space-y-6">
      {/* Dashboard Content */}
      {/* Welcome Header */}
      <WelcomeHeader
        pending={appointmentStats.processing}
        completed={appointmentStats.completed}
        lastUpdated={dashboardData?.lastUpdated}
        role={user?.role}
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
        />
      </ChartsGrid>
    </div>
  );
}
