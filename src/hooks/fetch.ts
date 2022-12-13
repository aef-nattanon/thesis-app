import axios from 'axios';

import config from '../config';

export const callDetection = (url: string) =>
  axios({
    method: "post",
    url: `${config.THESIS_API_URL}/detection`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: JSON.stringify({ url: url }),
  });
