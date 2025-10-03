const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../../app');

const todoService = require('../../../service/todoService');

describe('Teste de To-Do Rest - Controller', () => {
        beforeEach(async () => {
            const respostaLogin = await request(app)
                    .post('/login')
                    .send({
                            username: 'teste1',
                            password: '12345'
                           });

            token = respostaLogin.body.token;
            console.log(token);
        });
            
        it('Registrar um To-Do', async () => {
            const resposta = await request(app)
                .post('/todos')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: "TESTANDO APLICAÇÃO",
                    status: "A",
                    description: "testando aplicação"
                    });
    
        expect(resposta.status).to.equal(201);
        expect(resposta.body.title).to.equal("TESTANDO APLICAÇÃO");
        expect(resposta.body.id).to.not.equal(null);
        });
});