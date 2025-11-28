from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import ast
from dotenv import load_dotenv

load_dotenv("../../../../../.env.dev")

from MultiAgent import perguntar

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Mensagem(BaseModel):
    texto: str
    idUsuario: str
    nome: str
    email: str
    cpf: str
    fkEmpresa: int
    fkTipoUsuario: int
 
@app.post("/agente")
def executar_agente(msg: Mensagem):

    resposta = f"{perguntar(msg.texto, msg.idUsuario, msg.nome, msg.email, msg.cpf, msg.fkEmpresa, msg.fkTipoUsuario)}"
    
    print("RESPOSTA")

    dados = ast.literal_eval(resposta)

    if dados['tipo'] == 'df':
        return {"resposta": dados['res'], "tipo": "df"}    
    return {"resposta": dados['res'], "tipo": "text"}
    
    
    
    # return dados
    # return {"resposta": dados['res'], "tipo": dados['tipo']}