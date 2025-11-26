import os
import pandas as pd
import mysql.connector
from langchain_core.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser
from langgraph.graph import StateGraph, START, END 
from typing import TypedDict, Optional

#CONFIGURANDO O AMBIENTE

os.environ["GOOGLE_API_KEY"] = "AIzaSyD9o1oKEAx0wx9wKYB2LoIgnnKWw4LKKno"

DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "Urubu100#",
    "database": "upfinity"
}

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    api_key=os.environ["GOOGLE_API_KEY"],
    temperature=0.2,
)

INFOS_USUARIO = {
        "idUsuario": 0,
        "nome": "",
        "email": "",
        "CPF": "",
        "fkEmpresa": 0,
        "fkTipoUsuario": 0,
    }

class GraphState(TypedDict):
    request: str
    user: dict
    analise: str
    query: str
    answer: Optional[str]
    df: Optional[pd.DataFrame]

#ABRINDO OS ARQUIVOS QUE SERÃO UTILIZADOS NO CÓDIGO

with open("prompts/upfinity_schema.txt", "r", encoding="utf-8") as f:
    schema = f.read()

with open("prompts/categorizador.txt", "r", encoding="utf-8") as f:
    categorizador = f.read()

with open("prompts/promptATM.txt", "r", encoding="utf-8") as f:
    promptATM = f.read()

with open("prompts/promptUSUARIO.txt", "r", encoding="utf-8") as f:
    promptUSUARIO = f.read()

with open("prompts/formatador.txt", "r", encoding="utf-8") as f:
    formatador = f.read()

with open("prompts/contextualizador.txt", "r", encoding="utf-8") as f:
    contextualizador = f.read()

#INICIANDO AS LISTAS QUE SERÃO ENVIADAS PARA A IA ANALISAR

def definir_listas():
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()
    query1 = "select nome from TipoComponente"
    cursor.execute(query1)
    global lista_componentes
    lista_componentes = cursor.fetchall()
    query2 = "select descricao from TipoAlerta"
    cursor.execute(query2)
    global lista_alertas
    lista_alertas = cursor.fetchall()
    query3 = f"select numeracao from Atm where fkEmpresa = {INFOS_USUARIO['fkEmpresa']};"
    cursor.execute(query3)
    global lista_atms
    lista_atms = cursor.fetchall()
    query4 = f"select nome from Usuario where fkEmpresa = {INFOS_USUARIO['fkEmpresa']};"
    cursor.execute(query4)
    global lista_usuarios
    lista_usuarios = cursor.fetchall()
    query5 = "select descricao from TipoUsuario  where idTipoUsuario <> 1;"
    cursor.execute(query5)
    global lista_tipos_usuarios
    lista_tipos_usuarios = cursor.fetchall()
    cursor.close()
    conn.close()
definir_listas()

#FUNÇÕES DOS GRAFOS

def inicializar(state: GraphState):
    print("Inicializando") 
    return {"request": user_request}

def inicializar_usuario(state: GraphState):
    return {"user": INFOS_USUARIO}

def analisar_request(state: GraphState):
    prompt = PromptTemplate(
        input_variables=["request"],
        template=categorizador
    )
    chain = prompt | llm | StrOutputParser()
    analise = chain.invoke({"request": state["request"]})
    print("\nDefinindo o tipo de request")
    print("Tipo = ", analise)
    return {"analise": analise}

def redirecionar_funcao(state: GraphState):
    print("\nRedirecionando função")
    if state["analise"] == "1":
        return "gerarATM"
    elif  state["analise"] == "2":
        if INFOS_USUARIO["fkTipoUsuario"] == 2 or INFOS_USUARIO["fkTipoUsuario"] == 1:
            return "gerarUSUARIO"
        elif INFOS_USUARIO["fkTipoUsuario"] == 3:
            return "retornar_erro"
    elif state["analise"] == "3":
        return "negar"
    
def retornar_resposta_erro(state: GraphState):
    return {"answer": "Sinto muito, você não tem permissão para acessar as informações de qualquer usuário"}

def gerar_queryATM(state: GraphState):
    print("\n Buscando informações (Gerando Query)\n")
    prompt = PromptTemplate(
        input_variables=["schema", "request", "lista_componentes", "lista_alertas", "lista_atms", "infos_user"],
        template=promptATM
    )
    chain = prompt | llm | StrOutputParser()
    sql_query = chain.invoke(
        {
        "schema": schema,
        "request": state["request"], 
        "lista_componentes": lista_componentes,
        "lista_alertas": lista_alertas,
        "lista_atms": lista_atms,
        "infos_user": INFOS_USUARIO
        })
    sql_query = sql_query.replace("```sql", "").replace("```", "").strip()
    print(sql_query)
    return {"query": sql_query}


def gerar_queryUSUARIO(state: GraphState):
    print("\n Buscando informações (Gerando Query)\n")
    prompt = PromptTemplate(
        input_variables=["schema", "request", "lista_usuarios", "lista_tipos_usuarios", "infos_user"],
        template= promptUSUARIO
    )
    chain = prompt | llm | StrOutputParser()
    sql_query = chain.invoke(
        {"schema": schema, 
         "request": state["request"],
         "lista_usuarios": lista_usuarios,
         "lista_tipo_usuarios": lista_tipos_usuarios,
         "infos_user": INFOS_USUARIO
         })
    sql_query = sql_query.replace("```sql", "").replace("```", "").strip()
    print(sql_query)
    print("ESSAS SAO AS INFOS DA VAR INFOS_USUARIO:", INFOS_USUARIO)
    return {"query": sql_query}

def negar_request(state: GraphState):
    return {"answer": "Sinto muito, você não tem permissão para consultar dados de outras empresas ou endereços"}

def executar_query(state: GraphState):
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()
    cursor.execute(state["query"])
    rows = cursor.fetchall()
    cols = [desc[0] for desc in cursor.description]
    cursor.close()
    conn.close()
    df = pd.DataFrame(rows, columns=cols)
    return {"df": df}

def formatar_resposta(state: GraphState):
    prompt = PromptTemplate(
        input_variables=["request", "df"],
        template= formatador
    )
    chain = prompt | llm | StrOutputParser()
    formatacao = chain.invoke({"request": state["request"], "df": state["df"]})
    if formatacao == "1":
        return "salvar"
    elif formatacao == "2":
        return "contextualizar"
    
def contextualizar_resposta(state: GraphState):
    print("\n Elaborando a melhor resposta\n")
    prompt = PromptTemplate(
        input_variables=["request", "df"],
        template= contextualizador
    )
    chain = prompt | llm | StrOutputParser()
    contextualizacao = chain.invoke({"request": state["request"], "df": state["df"]})
    print(contextualizacao)
    return {"answer": contextualizacao}

def salvar_csv(state: GraphState):
    print("\n Salvando a tabela")
    df = state["df"]
    df.to_csv("query_result.csv", index=False)
    print("Resultado salvo em query_result.csv")
    return {}


#DEFININDO O FLUXO DO LANGGRAPH

g = StateGraph(GraphState)

g.add_node("inicializar", inicializar)
g.add_node("inicializar_usuario", inicializar_usuario)
g.add_node("analisar", analisar_request)
g.add_node("gerarATM", gerar_queryATM)
g.add_node("gerarUSUARIO", gerar_queryUSUARIO)
g.add_node("negar", negar_request)
g.add_node("retornar_erro", retornar_resposta_erro)
g.add_node("executar", executar_query)
g.add_node("contextualizar", contextualizar_resposta)
g.add_node("salvar", salvar_csv)

g.add_edge(START, "inicializar")
g.add_edge(START, "inicializar_usuario")
g.add_edge("inicializar", "analisar")
g.add_conditional_edges("analisar", redirecionar_funcao)
g.add_edge("gerarATM", "executar")
g.add_edge("gerarUSUARIO", "executar")
g.add_edge("negar", END)
g.add_edge("retornar_erro", END)
g.add_conditional_edges("executar", formatar_resposta)
g.add_edge("contextualizar", END)
g.add_edge("salvar", END)

app = g.compile()

#FUNÇÃO QUE SERÁ CHAMADA PELO FETCH

def executar(pergunta, idUsuario, nome, email, cpf, fkEmpresa, fkTipoUsuario):
    global user_request
    user_request = pergunta
    global INFOS_USUARIO
    INFOS_USUARIO = {
        "idUsuario": idUsuario,
        "nome": nome,
        "email": email,
        "CPF": cpf,
        "fkEmpresa": fkEmpresa,
        "fkTipoUsuario": fkTipoUsuario,
    }
    state = app.invoke({})

    if state.get("answer") == None:
       return {
           'tipo': 'df',
           'res': state.get("df").to_dict(orient="records")
       }
    return {
        'tipo': 'text',
        'res': state.get("answer")
    }   