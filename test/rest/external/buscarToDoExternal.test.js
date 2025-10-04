const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../../app');

const todoService = require('../../../service/todoService');

describe('Teste de Buscar To-Do Rest - External', () => {
        beforeEach(async () => {
            const respostaLogin = await request(process.env.BASE_URL_REST)
                    .post('/login')
                    .send({
                            username: 'teste1',
                            password: '12345'
                           });

            token = respostaLogin.body.token;
        });

            it('Buscar To-Do', async () => {
                const id = 1;
            const resposta = await request(process.env.BASE_URL_REST)
                .get(`/todos/${id}`)
                .set('authorization', `Bearer ${token}`)
               
        expect(resposta.status).to.equal(200);
        expect(resposta.body.title).to.equal("TESTANDO APLICAÇÃO"); 
        });

         it('Buscar To-Do inexistente - 404', async () => {
                const id = 85;
            const resposta = await request(process.env.BASE_URL_REST)
                .get(`/todos/${id}`)
                .set('authorization', `Bearer ${token}`)
               
        expect(resposta.status).to.equal(404);
        expect(resposta.body).to.have.property('error', 'Não encontrado');
        });
});