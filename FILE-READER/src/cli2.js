import chalk from 'chalk';
import fs from 'fs';
import PegarArquivo2 from './index.js';
import pino from 'pino';
import { logger } from './logger.js';

const caminho = process.argv;

function imprimirLista(resultado, identificador = '') {
  console.log(
    chalk.yellow('* Lista de links: '),
    chalk.black.bgGreen(identificador),
    resultado,
  );
}

async function processarTexto(argumentos) {
  const caminho = argumentos[2];
  const valida = argumentos[3];

  console.log(valida);

  const dados = {};
  let arrayDados = [];

  try {
    fs.lstatSync(caminho);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // // *** Passando a informação direto
      // logger.warn([
      //   error.code,
      //   `Arquivo ou diretório '${caminho}' NÃO existe!`,
      // ]);

      // // *** Passando a informação como uma array
      // arrayDados[0] = error.code;
      // arrayDados[1] = `Arquivo ou diretório '${caminho}' NÃO existe!`;
      // logger.error({ arrayDados });

      // Passando a informação por objeto chave : valor (dicionário)
      dados.erro = error.code;
      dados.msg = `Arquivo ou diretório '${caminho}' NÃO existe!`;
      // Duas formas de apresentar:
      logger.catastrophe({ dados });
      //logger.notice( dados );

      console.log(
        chalk.blueBright(
          `Arquivo ou diretório "${chalk.yellowBright(caminho)}" ${chalk.redBright('NÃO')} existe!`,
        ),
      );
    }

    return;
  }

  if (fs.lstatSync(caminho).isFile()) {
    const resultado = await PegarArquivo2(argumentos[2]);

    imprimirLista(resultado);
  } else if (fs.lstatSync(caminho).isDirectory(caminho)) {
    const arquivos = await fs.promises.readdir(caminho);
    console.log(chalk.blue(`Tem estes arquivos na pasta: ${arquivos}`));

    arquivos.forEach(async (nomeDoArquivo) => {
      const lista = await PegarArquivo2(`${caminho}/${nomeDoArquivo}`);

      imprimirLista(lista, nomeDoArquivo);
    });
  }
}

processarTexto(caminho);
