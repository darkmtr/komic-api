const axios = require('axios');

beforeAll(() => {});

test('Info Query ', async () => {
  const req = {
    query: `
		query {
			info
		}`,
  };

  const res = await axios.post('http://localhost:4000', req);

  const { data } = res;
  expect(data.data.info).toBe('Hi');
});
