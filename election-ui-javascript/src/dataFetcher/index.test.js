import fetchResults from "../dataFetcher";
import { fetchResultData } from "../fakeAPI";

jest.mock("../fakeAPI");

// const mockFakeApi = () => {
//   fetchResultData.mockImplementationOnce(() => {
//     return Promise.resolve({
//       isComplete: false,
//       results: [
//         {
//           'party': 'Giraffe Party',
//           'candidateId': 2,
//           'votes': '9900'
//         }
//       ]
//     })
//   });
// }

const mockFakeApi = () => {
  fetchResultData.mockImplementationOnce(() => {
    return Promise.resolve({
      candidateData: [
        {
          id: 2,
          name: "Lord Buckethead",
        },
      ],
      isComplete: false,
      results: [
        {
          party: "Giraffe Party",
          candidateId: 2,
          votes: "9900",
        },
      ],
    });
  });
};

test("returns an Object", async () => {
  mockFakeApi();
  const resultData = await fetchResults();
  expect(typeof resultData === "object").toBe(true);
});

test("response contains a result array", async () => {
  mockFakeApi();
  const resultData = await fetchResults();
  expect(Array.isArray(resultData.results)).toBe(true);
});

// test('response contains a result array', async () => {
//   mockFakeApi();
//   const resultData = await fetchResults();
//   expect(Array.isArray(resultData.results)).toBe(true);
// });
