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
        });
            
            it('Registrar um To-Do', async () => {
            const resposta = await request(app)
                .post('/todos')
                .set('authorization', `Bearer ${token}`)
                .send({
                    title: "TESTANDO APLICAÇÃO",
                    status: "A",
                    description: "testando aplicação"
                    });
    
        expect(resposta.status).to.equal(201);
        expect(resposta.body.title).to.equal("TESTANDO APLICAÇÃO");
        expect(resposta.body.id).to.not.equal(null);
        });

           it('Registrar um To-Do sem o campo Titulo - 400', async () => {
            const resposta = await request(app)
                .post('/todos')
                .set('authorization', `Bearer ${token}`)
                .send({
                    title: "",
                    status: "A",
                    description: "testando aplicação"
                    });
    
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.have.property('error', 'Título obrigatório');
        });

           it('Registrar um To-Do sem o campo Status - 400', async () => {
            const resposta = await request(app)
                .post('/todos')
                .set('authorization', `Bearer ${token}`)
                .send({
                    title: "Teste Campo",
                    status: "",
                    description: "testando aplicação"
                    });
    
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.have.property('error', 'Status obrigatório. A- ativo. I- inativo');
        });

         it('Usando Mocks: Registrar um To-Do sem o campo Status - 400', async () => {
            const todoServiceMock = sinon.stub(todoService, 'create');
            todoServiceMock.returns({ error: 'Status obrigatório. A- ativo. I- inativo' });

            const resposta = await request(app)
                .post('/todos')
                .set('authorization', `Bearer ${token}`)
                .send({
                    title: "",
                    status: "",
                    description: "testando mock"
                    });
    
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.have.property('error', 'Status obrigatório. A- ativo. I- inativo');

        sinon.restore();

        });
});