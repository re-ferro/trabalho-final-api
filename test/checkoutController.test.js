// Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

// Aplicação
const app = require('../app');

// Mock
const checkoutService = require('../src/services/checkoutService');

// Testes
describe('Checkout Controller', () => {
    describe('POST /checkout', () => {

        beforeEach(async () => {
            const respostaLogin = await request('http://localhost:3000')
                .post('/users/login')
                .send({
                    email: "renata@teste.com",
                    password: "renata"
                });

            token = respostaLogin.body.token;
        });

        it('Quando informo ID de produto valido tem que retornar 200', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/checkout')
                .set('Authorization', `Bearer ${token}`)
                .send({
                        "items": [
                            {
                            "productId": 1,
                            "quantity": 10
                            }
                        ],
                        "freight": 10,
                        "paymentMethod": "boleto",
                        "cardData": {
                            "number": "344354354354354",
                            "name": "Fulano de Tal",
                            "expiry": "06/30",
                            "cvv": "234"
                        }
                        });
            
            expect(resposta.status).to.equal(200);
        });

        it('Quando informo ID de produto invalido tem que retornar 400', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/checkout')
                .set('Authorization', `Bearer ${token}`)
                .send({
                        "items": [
                            {
                            "productId": 0,
                            "quantity": 10
                            }
                        ],
                        "freight": 10,
                        "paymentMethod": "boleto",
                        "cardData": {
                            "number": "344354354354354",
                            "name": "Fulano de Tal",
                            "expiry": "06/30",
                            "cvv": "234"
                        }
                        });
            
            expect(resposta.status).to.equal(400);
        });

        it('Quando não informo o token tem que retornar 401', async () => {
            const resposta = await request(app)
                .post('/checkout')
                .send({
                        "items": [
                            {
                            "productId": 1,
                            "quantity": 10
                            }
                        ],
                        "freight": 10,
                        "paymentMethod": "boleto",
                        "cardData": {
                            "number": "344354354354354",
                            "name": "Fulano de Tal",
                            "expiry": "06/30",
                            "cvv": "234"
                        }
                        });
            
            expect(resposta.status).to.equal(401);
        });
        

        afterEach(() => {
            // Reseto o Mock
            sinon.restore();
        })
    });

    describe('GET /checkouts', () => {
        // Its ficam aqui
    });
});