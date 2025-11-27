import os
from langchain_core.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser

os.environ["GOOGLE_API_KEY"] = "AIzaSyASzqnsYiwW-QbrTzFovIi2pSyyyZSAL0M"

with open("prompts/docUpfinity.md", "r", encoding="utf-8") as f:
    documentacao = f.read()

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    api_key=os.environ["GOOGLE_API_KEY"],
    temperature=0.,
)

def perguntarDoc(pergunta):
    prompt_template = PromptTemplate(
        input_variables=["request", "documentacao"],
        template="""
        Você é um assistente que responde perguntas do cliente exclusivamente com base na documentação do projeto. Use somente informações presentes nela.

Escreva de forma natural e conversacional, em texto corrido, sem qualquer tipo de formatação.

Responda sempre de maneira curta, direta e objetiva. Dê apenas o essencial para responder corretamente à pergunta, evitando explicações longas.
A resposta ideal deve ter no máximo três a quatro frases.

Valorize o projeto de forma sutil quando fizer sentido, sem exageros e sem inventar funcionalidades.

Se a informação não estiver na documentação e não puder ser deduzida com segurança, peça desculpas educadamente e diga que não há dados suficientes.

Não explique seu raciocínio nem inclua pensamentos internos.

Documentação:
{documentacao}

Pergunta:
{request}
    """
    )


    chain = prompt_template | llm | StrOutputParser()

    print("Pensando...")
    resposta = chain.invoke({"request": pergunta, "documentacao": documentacao})
    print("Resultado:", resposta)
    return {
        'tipo': 'text',
        'res': resposta
    }