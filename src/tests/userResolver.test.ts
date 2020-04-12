const axios = require('axios');

beforeAll(() => {});

test('Info Query ', async () => {
  const req = {
    query: `
		query {
			info
		}`,
  };

  const res = await axios.post('https://komic-api.herokuapp.com/', req);

  const { data } = res;
  expect(data.data.info).toBe('Hi');
});
