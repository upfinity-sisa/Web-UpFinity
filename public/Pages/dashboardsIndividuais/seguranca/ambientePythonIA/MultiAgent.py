import os
from langchain_core.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser
from DBagent import executar
from DOCagent import perguntarDoc
from dotenv import load_dotenv
from dotenv import load_dotenv

load_dotenv("../../../../../.env.dev")
API_KEY = os.getenv("GOOGLE_API_KEY")

user_request = "Quais as infos do joao?"

with open("prompts/docUpfinity.md", "r", encoding="utf-8") as f:
    documentacao = f.read()

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    api_key= API_KEY,
    temperature=0.,
)

def perguntar(pergunta, idUsuario, nome, email, cpf, fkEmpresa, fkTipoUsuario):
    prompt_template = PromptTemplate(
        input_variables=["request"],
        template="""
    Você é um classificador de perguntas.  
    Sua tarefa é identificar para qual agente a pergunta do usuário deve ser enviada.

    Categorias:

    1. **DBagent**  
    Use esta categoria para qualquer pergunta relacionada a **dados concretos do sistema**, incluindo:  
    - ATMs  
    - Usuários / Funcionários  
    - Empresas  
    - Alertas (IMPORTANTE: *qualquer pergunta sobre alertas é SEMPRE do BD*, mesmo que pareça conceitual)  
    - Listas, quantidades, detalhes, status, tipos, histórico, dados específicos  
    - Qualquer informação que esteja registrada no banco de dados

    2. **DOCagent**  
    Use esta categoria para perguntas sobre:  
    - Regras de negócio  
    - Objetivo do sistema  
    - Explicações conceituais  
    - Planos e serviços da empresa  
    - Justificativas do projeto  
    - Descrições do funcionamento geral (não relacionadas a dados reais)

    3. **ForaDeContexto**  
    Perguntas que não têm relação com o sistema de monitoramento de ATMs, por exemplo:  
    - Clima, política, receitas, tecnologia pessoal, etc.

    4. **Cumprimentos**  
    Use esta categoria para mensagens que não são perguntas e representam apenas interação social, como:  
    - "Oi", "E aí?", "Boa tarde", "Você poderia me ajudar, por favor?"
    - "Valeu!", "Obrigado", "Obrigada"  
    - "Tchau", "Até mais", "Bom dia"  
    - Qualquer cumprimento, despedida ou cordialidade que não peça informação

    Contexto:  
    Nossa empresa é a UpFinity!
    O sistema monitora hardware de ATMs.  
    O banco de dados contém informações sobre empresas, ATMs, funcionários e alertas.  
    A documentação contém regras e informações gerais.

    ---

    ### Regras:
    - Escolha **somente a categoria mais adequada**.  
    - Retorne **apenas o número (1, 2 ou 3)**.  
    - Não explique, não comente.  
    - Não invente informações.

    ---

    ### Exemplos:
    Pergunta: "Me mostre uma lista dos meus funcionários" ou "quais as informações dos meus útlimos ATMs?" -> **1**  
    Pergunta: "Quanto custa o plano mais básico da empresa?" ou "Como esse serviço ajuda meu negócio?" -> **2**  
    Pergunta: "Como diminuir a temperatura do ATM?" ou "Como resolver X problema da minha CPU?" ou algo mais aleatório como "Me passe uma receita de bolo" -> **3**  
    **Pergunta: "Que tipos de alertas o sistema possui?" -> 1 (alertas sempre vêm do banco de dados)**
    Mensagem: "Oi", "Obrigado", "Valeu", "Tchau", "Bom dia" -> **4**

    ---

    ### Classifique a pergunta a seguir:
    **"{request}"**


    """
    )


    chain = prompt_template | llm | StrOutputParser()

    print("Pensando...")
    resposta = chain.invoke({"request": pergunta, "documentacao": documentacao})
    print("Resultado:", resposta)
    return redirecionar(resposta, pergunta, idUsuario, nome, email, cpf, fkEmpresa, fkTipoUsuario)
    

def redirecionar(resultado, pergunta, idUsuario, nome, email, cpf, fkEmpresa, fkTipoUsuario):
    if resultado == "1":
        return executar(pergunta, idUsuario, nome, email, cpf, fkEmpresa, fkTipoUsuario)
    elif resultado == "2":
        return perguntarDoc(pergunta)
    elif resultado == "3":
        return {
            'tipo': 'text',
            'res': "Sinto muito, eu sou um agente especializado nos serviços da UpFinity, portanto, não sou capaz de responder este tipo de pergunta"
        }
    elif resultado == "4":
        return cumprimentar(pergunta)
    


def cumprimentar(pergunta):
    prompt_template = PromptTemplate(
        input_variables=["request"],
        template="""
    Você é um agente responsável por responder cumprimentos. Sempre que receber uma saudação ou 
    um agradecimento, responda de maneira simples, natural e educada, como uma pessoa comum 
    responderia. Não ofereça ajuda, não pergunte nada e não tente prolongar a conversa. 
    Apenas devolva um cumprimento adequado ou uma resposta breve a agradecimentos.
    Pode usar um emoji de vez em quando.

    Responda à seguinte mensagem: "{request}"
    """
    )


    chain = prompt_template | llm | StrOutputParser()

    print("Pensando...")
    resposta = chain.invoke({"request": pergunta})
    print("Resultado:", resposta)
    return {
            'tipo': 'text',
            'res': resposta
        }