const request = require('supertest');
const HttpStatus = require('http-status-codes');
const mongoose = require('mongoose');
const app = require('../src/app');

beforeAll(async () => {
    mongoose.Promise = Promise;
    const mongooseOpts = {
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
    };
    await mongoose.connect(global.__MONGO_URI__, mongooseOpts);
});

afterAll(() => {
    mongoose.disconnect();
});

const userJack = {
    'firstName': 'Jack',
    'lastName': 'Sparrow',
    'email': 'jack.sparrow@blackpearl.com',
};

const userWill = {
    'firstName': 'Will',
    'lastName': 'Turner',
    'email': 'will.turner@flyingdutchman.com',
};

let userId = null;

describe('Test the user resource', () => {
    test('It should POST a user', async () => {
        const response = await request(app).post('/api/user')
            .send(userJack);
        expect(response.statusCode).toBe(HttpStatus.CREATED);
        expect(response.body).toMatchObject(userJack);
        expect(response.body).toHaveProperty('_id');
        userId = response.body._id;
    });

    test('It should GET a user', async () => {
        const response = await request(app).get(`/api/user/${userId}`);
        expect(response.statusCode).toBe(HttpStatus.OK);
        expect(response.body).toMatchObject(userJack);
    });

    test('It should GET all users', async () => {
        const response = await request(app).get('/api/user');
        expect(response.statusCode).toBe(HttpStatus.OK);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toMatchObject(userJack);
    });

    test('It sould PUT an existing user', async () => {
        const response = await request(app).put(`/api/user/${userId}`)
            .send(userWill);
        expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
    });

    test('It should GET a modified user', async () => {
        const response = await request(app).get(`/api/user/${userId}`);
        expect(response.statusCode).toBe(HttpStatus.OK);
        expect(response.body).toMatchObject(userWill);
    });

    test('It should DELETE a user', async () => {
        const response = await request(app).delete(`/api/user/${userId}`);
        expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
    });

    test('It should failed to GET a deleted user', async () => {
        const response = await request(app).get(`/api/user/${userId}`);
        expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    });
});
