import http from "k6/http";
import { sleep } from "k6";

export let options = {
  stages: [
    { duration: '0.5m', target: 10 }, // below normal load
    { duration: '2m', target: 10 },
    { duration: '0.5m', target: 15 }, // normal load
    { duration: '2m', target: 15 },
    { duration: '0.5m', target: 20 }, // around the breaking point
    { duration: '2m', target: 20 },
    { duration: '0.5m', target: 25 }, // beyond the breaking point
    { duration: '2m', target: 25 },
    { duration: '2m', target: 0 }, // scale down. Recovery stage.
  ],

  ext: {
    loadimpact: {
      projectID: 3531620,
      // Test runs with the same name groups test runs together
      name: "FYP_stress_test_1",
    },
  },
};

export default function () {
  const BASE_URL = "https://test-api.k6.io"; // make sure this is not production

  let responses = http.batch([
    [
      "GET",
      `${BASE_URL}/public/crocodiles/1/`,
      null,
      { tags: { name: "PublicCrocs" } },
    ],
    [
      "GET",
      `${BASE_URL}/public/crocodiles/2/`,
      null,
      { tags: { name: "PublicCrocs" } },
    ],
    [
      "GET",
      `${BASE_URL}/public/crocodiles/3/`,
      null,
      { tags: { name: "PublicCrocs" } },
    ],
    [
      "GET",
      `${BASE_URL}/public/crocodiles/4/`,
      null,
      { tags: { name: "PublicCrocs" } },
    ],
  ]);

  sleep(1);
}
