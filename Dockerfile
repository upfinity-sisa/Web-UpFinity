# Base Node.js
FROM node:latest

# Instalar Python3, pip e venv
RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-venv git && \
    apt-get clean

# Diretório de trabalho
WORKDIR /usr/src/app

# Clonar repositório
RUN git clone https://github.com/upfinity-sisa/Web-UpFinity.git

# Entrar no diretório do projeto
WORKDIR /usr/src/app/Web-UpFinity

# Instalar dependências Node.js
RUN npm install

# Criar venv para Python
RUN python3 -m venv venv

# Ativar venv e instalar requirements
RUN ./venv/bin/pip install --upgrade pip
RUN ./venv/bin/pip install -r public/Pages/dashboardsIndividuais/seguranca/ambientePythonIA/requirements.txt

# Expor portas
EXPOSE 3333
EXPOSE 8000

# Comando inicial
CMD ["npm", "run", "start-prod"]
