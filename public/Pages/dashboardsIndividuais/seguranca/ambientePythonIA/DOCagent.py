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
    Você é um assistente que responde perguntas do cliente exclusivamente com base 
    na documentação do projeto.
    Use as informações presentes na documentação para responder à pergunta do usuário.

    Valorize o projeto de forma natural sempre que possível, 
    destacando seus pontos positivos sem exageros.
    Não faça críticas ao projeto, ao escopo, ao time ou ao cliente.
    Seja realista e não invente funcionalidades ou detalhes que não existam na documentação.

    Caso a resposta não esteja na documentação, você pode responder apenas se for algo 
    evidente por conhecimento geral.
    Se a informação solicitada exigir detalhes que não aparecem na documentação e não puder 
    ser inferida com segurança, peça desculpas educadamente e informe que não há dados suficientes para responder com precisão.

    Não adicione explicações sobre o processo.
    Responda apenas com a resposta final destinada ao cliente.]

    Seja direto, conciso e assertivo. Respostas devem ser claras, curtas e sem explicações desnecessárias.

    Documentação:
    {documentacao}

    Pergunta do cliente:
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