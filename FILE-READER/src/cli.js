import chalk from 'chalk';
import PegarArquivo2 from './index.js';

const caminho = process.argv;

// console.log(caminho);
// console.log(caminho[0]);
// console.log(caminho[1]);

// Digite no TERMINAL: "node src/cli.js coisa"
// Digite no TERMINAL: "node src/cli.js ./arquivos/texto.md"

// console.log(caminho[2]);

async function processarTexto(caminho) {
  const resultado = await PegarArquivo2(caminho[2]);
  console.log('-----------------------------------------------');
  console.log(chalk.yellow('Lista e Links'), resultado);
  console.log('-----------------------------------------------');
}

//PegarArquivo2(caminho[2]);
processarTexto(caminho);

// Para tornar a mensagem: "Não há links no arquivo" rodar o arquivo 2: "texto2.md".
// Digite no TERMINAL: "node src/cli.js ./arquivos/texto2.md"
