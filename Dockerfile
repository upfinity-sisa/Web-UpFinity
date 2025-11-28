# Step 1/7 — Node.js como base
FROM node:latest

# Instalar Python 3 e pip
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    apt-get clean

# Step 2/7 — diretório de trabalho
WORKDIR /usr/src/app

# Step 3/7 — clonar repositório
RUN git clone https://github.com/upfinity-sisa/Web-UpFinity.git

# Step 4/7 — mudar diretório
WORKDIR /usr/src/app/Web-UpFinity

# Step 5/7 — instalar dependências Node.js
RUN npm install

# Step 6/7 — expor portas
EXPOSE 3333
EXPOSE 8000

RUN apt install python3.11-venv

# Step 7/7 — comando inicial
CMD ["npm", "run", "start-all"]
