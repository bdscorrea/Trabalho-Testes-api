const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');
const app = require('../../../app');
const todoService = require('../../../service/todoService');
require('dotenv').config();

let token;
let id; 

describe('Teste de Excluir To-Do Rest - External', () => {
        beforeEach(async () => {
            const respostaLogin = await request(app)
                    .post('/login')
                    .send({
                            username: 'teste1',
                            password: '12345'
                           });

            token = respostaLogin.body.token;
              
            const criarToDo = await request(app)
                .post('/todos')
                .set('authorization', `Bearer ${token}`)
                .send({
                    title: "TESTANDO DELETE APLICAÇÃO",
                    status: "A",
                    description: "testando aplicação"
                    });
    
             id = criarToDo.body.id;
});
        it('Excluir um To-Do', async () => {
                const resposta = await request(app)
                .delete(`/todos/${id}`)
                .set('authorization', `Bearer ${token}`)
              
              
        expect(resposta.status).to.equal(200);
     });
        
     
        it('Excluir um To-Do inexistente - 404', async () => {
                const id = 85;
                const resposta = await request(process.env.BASE_URL_REST)
                .delete(`/todos/${id}`)
                .set('authorization', `Bearer ${token}`)
                   
                   
        expect(resposta.status).to.equal(404);
         });
});