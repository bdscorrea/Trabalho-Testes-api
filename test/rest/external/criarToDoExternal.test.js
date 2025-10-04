const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const todoService = require('../../../service/todoService');
require('dotenv').config();


describe('Teste de Criar To-Do Rest - External', () => {
        beforeEach(async () => {
            const respostaLogin = await request(process.env.BASE_URL_REST)
                    .post('/login')
                    .send({
                            username: 'teste1',
                            password: '12345'
                           });

            token = respostaLogin.body.token;
        });
            
            it('Registrar um To-Do', async () => {
            const resposta = await request(process.env.BASE_URL_REST)
                .post('/todos')
                .set('authorization', `Bearer ${token}`)
                .send({
                    title: "TESTANDO APLICAÇÃO",
                    status: "A",
                    description: "testando aplicação"
                    });
    
        const respostaEsperada = require('../fixture/respostas/retornoToDo.json');
        expect(resposta.status).to.equal(201);
        delete resposta.body.id;
        delete respostaEsperada.id;
        delete resposta.body.userId;
        delete respostaEsperada.userId;
        expect(resposta.body).to.deep.equal(respostaEsperada);
        expect(resposta.body.id).to.not.equal(null);
        });

           it('Registrar um To-Do sem o campo Titulo - 400', async () => {
            const resposta = await request(process.env.BASE_URL_REST)
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
            const resposta = await request(process.env.BASE_URL_REST)
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
});