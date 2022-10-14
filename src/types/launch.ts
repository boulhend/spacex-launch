interface LaunchSite {
  site_name: string;
}
interface Launches {
  launch_success: boolean;
  launch_site: LaunchSite;
}

interface LaunchSiteStatus {
  successLaunches: number;
  failedLaunches: number;
}

export interface LaunchSiteStatusData {
  [key: string]: LaunchSiteStatus;
}
export interface LaunchesData {
  launches: Launches[];
}
