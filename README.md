<h1>Buscador de CEP utilizando a API ViaCEP</h1>
Este projeto consiste em um buscador de endereços a partir de um CEP informado pelo usuário. O resultado da busca é obtido através da API <strong>ViaCEP</strong>, que fornece informações de endereços brasileiros a partir de um CEP.
<p><a href="https://willowy-centaur-8bb3e0.netlify.app/?cep=&rua=&complemento=&bairro=&cidade=&estado=">Link do projeto</a>
<h2>Instalação</h2>
Para utilizar este projeto, você precisará cloná-lo para sua máquina local:<br>

<p>git clone https://github.com/silashorta/Busca-CEP.git</p>

<br>

<h2>Uso</h2>

<p>As informações são capturadas através da utilização do método GET da API ViaCEP: https://viacep.com.br/ws/{CEP}/json/</p>
<p>Exemplo de retorno da API:</p>

<code>{
 "cep": "01001-000",
 "logradouro": "Praça da Sé",
 "complemento": "lado ímpar",
 "bairro": "Sé",
 "localidade": "São Paulo",
 "uf": "SP",
 "unidade": "",
 "ibge": "3550308",
 "gia": "1004"
}</code>
<br>
<h2>Funcionalidades</h2>

<p>A busca pode ser feita de duas maneiras:</p>
<br>
<ol>
  <li>Informando o número do CEP a ser pesquisado</li>
  <li>Informando o Endereço a ser pesquisado</li>
  <li>Todo endereço pesquisado pode ser copiado através do botão Copiar</li>
</ol>
<br>
<h2>Contribuição</h2>
<p>Este projeto é open-source e aceita contribuições. Se você tem interesse em colaborar, siga as seguintes etapas:</p>
<ol>
<li>Faça um fork do projeto.</li>
<li>Crie sua branch de contribuição: <code>git checkout -b minha-contribuicao</code>.</li>
<li>Commit suas alterações: <code>git commit -m "Adicionando nova funcionalidade"</code>.</li>
<li>Faça push para sua branch: <code>git push origin minha-contribuicao</code>.</li>
<li>Crie um pull request para o projeto original.</li>
</ol>
