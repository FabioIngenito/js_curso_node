var http = require('http');

// Cria um servidor HTTP e uma escuta de requisições para a porta 8080
http.createServer(function (req, res) {
  // Configura o cabeçalho de resposta com um status HTTP e um tipo de Conteúdo
  res.writeHead(200, {'Content-Type': 'text/plain'});

  // Manda o corpo da resposta "Olá Mundo"
  res.end('Hello World!');
}).listen(8000, "127.0.0.1");

// Imprime no console a URL de acesso ao servidor
console.log("Servidor executando em: http://127.0.0.1:8000/")
