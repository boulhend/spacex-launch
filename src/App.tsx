import { gql, useQuery } from '@apollo/client';
import React from 'react';

import Charts from './components/Charts';
import Message from './components/Message';
import { LaunchesData, LaunchSiteStatusData } from './types/launch';

function App() {
  const { loading, error, data } = useQuery<LaunchesData>(GET_LAUNCH_STATUSES);

  if (loading)
    return (
      <Message>
        <p>Loading...</p>
      </Message>
    );

  if (error)
    return (
      <Message>
        <p className="text-red-700">Error :(</p>
      </Message>
    );
  if (!data)
    return (
      <Message>
        <p>No data</p>
      </Message>
    );

  const launchSites: LaunchSiteStatusData = {};

  data.launches.forEach((launch) => {
    const isSuccessLaunch = launch.launch_success;
    if (!launchSites[launch?.launch_site?.site_name]) {
      launchSites[launch?.launch_site?.site_name] = {
        successLaunches: isSuccessLaunch ? 1 : 0,
        failedLaunches: isSuccessLaunch ? 0 : 1,
      };
    } else {
      const currentLaunch = launchSites[launch?.launch_site?.site_name];
      isSuccessLaunch ? currentLaunch.successLaunches++ : currentLaunch.failedLaunches++;
    }
  });
  return <Charts data={launchSites} />;
}

export default App;

const GET_LAUNCH_STATUSES = gql`
  query {
    launches {
      launch_success
      launch_site {
        site_name
      }
    }
  }
`;
