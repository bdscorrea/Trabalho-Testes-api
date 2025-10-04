const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');
const app = require('../../../app');
const todoService = require('../../../service/todoService');
require('dotenv').config();

let token;
let id; 

describe('Teste de Alteração To-Do Rest - External', () => {
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
                    title: "TESTANDO ALTERAÇÃO",
                    status: "A",
                    description: "testando alteração"
                    });

            console.log(criarToDo.body.status);
             id = criarToDo.body.id;
});
        it('Alterar um To-Do', async () => {
                const resposta = await request(app)
                .put(`/todos/${id}`)
                .set('authorization', `Bearer ${token}`)
                .send({
                    title: "TESTANDO ALTERAÇÃO",
                    status: "D",
                    description: "testando alteração"
                    });
              
        console.log(resposta.body.status);
        expect(resposta.status).to.equal(200);
        expect(resposta.body.status).to.equal("D");
            
    });
        
     
        it('Alterar um To-Do inexistente - 404', async () => {
                const id = 85;
                const resposta = await request(app)
                .put(`/todos/${id}`)
                .set('authorization', `Bearer ${token}`)
                   
                   
        expect(resposta.status).to.equal(404); 
         });
});