import axios from 'axios';

import config from '../config';

var configFetch = (url: string) => {
  return {
    method: "post",
    url: `${config.THESIS_API_URL}/detection`,
    headers: {
      "User-Agent": " WHENEVER",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ url }),
  };
};

export const callDetection = (url: string) => axios(configFetch(url));
