/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/app');

describe('Rule', () => {
  it('Should be able to register', async () => {
    const response = await request(app)
      .post('/rules/daily')
      .send({
        days:['Quarta'],
        date_start: '2020-03-10 13:00:00',
        date_end: '2020-03-15 18:00:00'
      });

    expect(response.body).toHaveProperty('menssage');
  });
});
