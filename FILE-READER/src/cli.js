import chalk from 'chalk';
import listaValidada from './http-validacao.js';
import fs from 'fs';
import PegarArquivo2 from './index.js';

const caminho = process.argv;

// console.log(caminho);
// console.log(caminho[0]);
// console.log(caminho[1]);

// Digite no TERMINAL: "node src/cli.js coisa"
// Digite no TERMINAL: "node src/cli.js ./arquivos/texto.md"

// console.log(caminho[2]);

function imprimirLista(valida, resultado, identificador = '') {
  //Observação: Se você colocar o "resultado" dentro de um "chalk" vai apresentar erro.

  console.log('-----------------------------------------------');
  //console.log(valida);

  if (valida) {
    console.log(
      chalk.yellow('* Lista validada: '),
      chalk.black.bgGreen(identificador),
      listaValidada(resultado),
    );
  } else {
    console.log(
      chalk.yellow('* Lista de links: '),
      chalk.black.bgGreen(identificador),
      resultado,
    );
  }
}

async function processarTexto(caminho) {
  const resultado = await PegarArquivo2(caminho[2]);

  console.log('-----------------------------------------------');
  console.log(chalk.yellow('Lista e Links'), resultado);
  console.log('-----------------------------------------------');
}

//PegarArquivo2(caminho[2]);
// processarTexto(caminho);

// Para tornar a mensagem: "Não há links no arquivo" rodar o arquivo 2: "texto2.md".
// Digite no TERMINAL: "node src/cli.js ./arquivos/texto2.md"

async function processarTexto2(argumentos) {
  const caminho = argumentos[2];
  const valida = argumentos[3] === '--valida';

  //console.log(valida);

  try {
    fs.lstatSync(caminho);
  } catch (error) {
    if (error.code === 'ENOENT')
      console.log(
        chalk.blueBright(
          `Arquivo ou diretório ${chalk.redBright('NÃO')} existe!`,
        ),
      );

    return;
  }

  if (fs.lstatSync(caminho).isFile()) {
    const resultado = await PegarArquivo2(argumentos[2]);

    imprimirLista(valida, resultado);
  } else if (fs.lstatSync(caminho).isDirectory(caminho)) {
    const arquivos = await fs.promises.readdir(caminho);
    console.log(chalk.blue(`Tem estes arquivos na pasta: ${arquivos}`));

    arquivos.forEach(async (nomeDoArquivo) => {
      const lista = await PegarArquivo2(`${caminho}/${nomeDoArquivo}`);

      imprimirLista(valida, lista, nomeDoArquivo);
    });
  }
}

processarTexto2(caminho);

// * TESTE:
// Detalhe: - O nome do arquivo tem um espaço.
// Digite no TERMINAL o parâmetro (caminho) entre aspas: "node src/cli.js "./arquivos/texto 3.md""

// * TESTE 2 (mostrar os arquivos dentro do diretório):
// Digite no TERMINAL: "node src/cli.js ./arquivos/"

// Forçar o erro "ENOENT" (Error NO Entity):
// Digite no TERMINAL: "node src/cli.js ./arqu"
