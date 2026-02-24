# 🔧 GarageManager - Gestão de Oficina Mecânica

O **GarageManager** é um ecossistema completo para a administração de oficinas mecânicas. Este projeto foi desenvolvido para resolver necessidades reais que identifiquei no meu dia a dia de trabalho em uma oficina, transformando processos manuais e desorganizados em uma gestão digital fluida.

> **Link do Repositório:** [github.com/barrosGuih/GarageManager](https://github.com/barrosGuih/GarageManager)

---

## 🚀 O Problema e a Solução

### O Problema
No cotidiano de uma mecânica, é comum enfrentar:
* **Falta de controle de estoque:** Peças que acabam sem aviso, paralisando serviços.
* **Esquecimento de cobrança:** Peças usadas em motores ou suspensões que não são registradas na Ordem de Serviço (O.S).
* **Dificuldade Financeira:** Não saber exatamente quanto entrou no caixa ou quantas movimentações ocorreram no mês.

### A Solução
O **GarageManager** centraliza tudo isso:
* **Estoque em Tempo Real:** Visualização imediata de itens em alerta (abaixo de 5 unidades).
* **Módulo de Vendas/O.S:** Permite montar um carrinho de peças para o cliente e dar baixa automática no estoque ao finalizar.
* **Histórico de Movimentações:** Rastreabilidade total de quem entrou e quem saiu das prateleiras.

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
* **React (Vite):** Performance ultrarrápida no desenvolvimento.
* **Tailwind CSS v4:** Estilização moderna com tema "Laranja Profissional".
* **Lucide React:** Conjunto de ícones minimalistas.
* **Chart.js:** Visualização de dados por meio de gráficos.
* **React Router v6:** Navegação dinâmica entre as telas de Dashboard, Estoque e Vendas.

### **Backend**
* **Spring Boot (Java):** API REST robusta para persistência e lógica de negócio.
* **Maven:** Gerenciamento de dependências.

---

## 📁 Estrutura do Projeto (Frontend)

```text
src/
 ├─ components/  # Componentes visuais (Sidebar, Modais, Cards)
 ├─ pages/       # Telas: Dashboard, Produtos, Movimentações e Vendas
 ├─ services/    # api.js - Integração via Fetch com o Spring Boot
 ├─ routes.jsx   # Definição das rotas do React Router
 └─ index.css    # Configuração do Tailwind v4 e variáveis de tema
⚙️ Como Executar
1. Clonar o repositório
code
Bash
git clone https://github.com/barrosGuih/GarageManager.git
cd GarageManager

2. Configurar o Backend
Certifique-se de que o Spring Boot está rodando na porta 8080.
Verifique se o banco de dados está configurado no application.properties.

3. Executar o Frontend
code
Bash

# Instalar dependências (use --legacy-peer-deps para evitar conflitos de plugins)
npm install --legacy-peer-deps

# Rodar em modo de desenvolvimento
npm run dev
Acesse: http://localhost:5173

📊 Funcionalidades em Destaque
Dashboard Administrativo
Resumo visual com cards de alerta para produtos com estoque baixo e faturamento estimado, auxiliando na tomada de decisão de compra.
Estoque Inteligente
Interface limpa com busca em tempo real. Cadastro de novos produtos através de Modais que não interrompem o fluxo de trabalho.
Carrinho de Peças (Vendas/O.S)
O sistema permite adicionar múltiplas peças a uma venda, calcula o subtotal automaticamente e, ao finalizar, faz a baixa de todos os itens simultaneamente no banco de dados.

🚧 Próximos Passos

Implementar login de funcionários.

Gerar PDF de Ordem de Serviço para o cliente.

Adicionar campo de foto para as peças.

👤 Autor
Desenvolvido por (barrosGuih).
