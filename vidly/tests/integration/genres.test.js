const request = require('supertest');
const mongoose = require('mongoose');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');

let server;

describe('/api/genres', () => {
  beforeEach(() => {
    server = require('../../index');
  });
  afterEach(async () => {
    await server.close();
    // await Genre.remove({});
    await Genre.deleteMany({}, function(err) {});
  });
  describe('GET', () => {
    it('should return all genres', async () => {
      Genre.collection.insertMany([
        { name: 'Action' },
        { name: 'Horror' },
        { name: 'Romance' }
      ]);
      // cleanup after
      const res = await request(server).get('/api/genres');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
      expect(res.body.some(g => g.name === 'Action'));
      expect(res.body.some(g => g.name === 'Horror'));
      expect(res.body.some(g => g.name === 'Romance'));
    });
  });
  describe('GET /:id', () => {
    it('should return genre if valid id is passed', async () => {
      const genre = new Genre({ name: 'Action' });
      await genre.save();

      const res = await request(server).get('/api/genres/' + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);
    });
  });
  describe('GET /:id', () => {
    it('should return 404 if invalid id is passed', async () => {
      const res = await request(server).get('/api/genres/1');

      expect(res.status).toBe(404);
    });
  });
  describe('POST /', () => {
    //
    let token;
    let name;

    const exec = async () => {
      return await request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({ name });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = 'genre1';
    });

    it('should return 401 if client is not logged in', async () => {
      token = '';
      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 400 if genre < 5 chars (invalid)', async () => {
      name = '1234';
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if genre > 50 chars (invalid)', async () => {
      name = new Array(52).join('a');
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should save the genre if it is valid', async () => {
      const res = await exec();
      const genre = await Genre.find({ name });

      expect(res.status).toBe(200);
      expect(genre).not.toBeNull();
    });

    it('should return the genre if it is valid', async () => {
      name = 'Action';
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', name);
    });
  });
});
