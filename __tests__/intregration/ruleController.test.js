/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/app');

describe('Rules', () => {

  it('Should be able list', async () => {
    const response = await request(app)
      .get('/rules');

    expect(response.body).toHaveProperty('rules');
  });

  it('Should be able to delete rule', async () => {
    const response = await request(app)
      .delete('/rules/7');

    expect(response.body).toBe(true);
  });

  it('Should be able to update rule', async () => {
    const response = await request(app)
      .post('/rules/daily')
      .send({
        days:[],
        date_start: '2020-03-10 10:00:00',
        date_end: '2020-03-15 12:00:00'
      });

    expect(response.body).toHaveProperty('menssage');
  });

  it('Should be able to register rule', async () => {
    const response = await request(app)
      .post('/rules/specific')
      .send({
        days:[],
        date_start: '2020-03-10 13:00:00',
        date_end: '2020-03-15 18:00:00'
      });

    expect(response.body).toHaveProperty('rules');
  });

  it('Should be able to list period', async () => {
    const response = await request(app)
      .post('/rules/period')
      .send({
        since: '2019-11-01',
        until: '2019-11-13'
      });

    expect(response.body).toHaveProperty('rules');
  });

  it('error try/catch', async () => {
    const response = await request(app)
      .post('/rules/period')
      .send({
        since: '2050-11-01',
        until: '2050-11-40'
      });

    expect(response.body).toHaveProperty('error');
  });

  it('error date ivalid', async () => {
    const response = await request(app)
      .post('/rules/period')
      .send({
        since: '2019-11-01',
        until: '2019-11-40'
      });

    expect(response.body).toHaveProperty('error');
  });

  it('error same hour start', async () => {
    const response = await request(app)
      .post('/rules/specific')
      .send({
        days:[],
        date_start: '2020-03-10 13:00:00',
        date_end: '2020-03-10 18:00:00'
      });

    expect(response.body).toHaveProperty('error');
  });

  it('error same hour end', async () => {
    const response = await request(app)
      .post('/rules/specific')
      .send({
        days:[],
        date_start: '2020-03-10 16:00:00',
        date_end: '2020-03-10 18:00:00'
      });

    expect(response.body).toHaveProperty('error');
  });

  it('error date ivalid in create', async () => {
    const response = await request(app)
      .post('/rules/specific')
      .send({
        days:[],
        date_start: '2020-03-40 13:00:00',
        date_end: '2020-03-15 18:00:00'
      });

    expect(response.body).toHaveProperty('error');
  });

  it('error type ivalid in create', async () => {
    const response = await request(app)
      .post('/rules/error')
      .send({
        days:[],
        date_start: '2020-03-05 13:00:00',
        date_end: '2020-03-15 18:00:00'
      });

    expect(response.body).toHaveProperty('error');
  });

});
