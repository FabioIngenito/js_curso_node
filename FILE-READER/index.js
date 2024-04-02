import chalk from 'chalk';
import fs from 'fs';

function extrairLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const resultados = capturas.map((captura) => ({
    [captura[0]]: captura[1],
  }));

  return resultados;
}

// OBS.: Se tiver uma "extensão" ligada (exemplo: "Origamid Next"), influencia a cor do Chalk. SOMENTE DESLIGUE A EXTENSÃO, não precisa desinstalar.
// console.log(chalk.green('Olá, mundo!'));
// console.log(chalk.bgMagenta('Olá, mundo!'));

function tratarErro(erro) {
  console.log(erro);
  throw new Error(chalk.bgYellowBright.red(erro.code, '-> NÃO é um arquivo.'));
}

function pegarArquivo(caminhoDoArquivo) {
  const encoding = 'utf-8';
  // SEM tratamento de erro:
  //fs.readFile(caminhoDoArquivo, encoding, (_, texto) => {
  fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
    if (erro) tratarErro(erro);

    console.log(chalk.green(texto));
  });
}

function pegarArquivoAssincrona(caminhoDoArquivo) {
  const encoding = 'utf-8';

  fs.promises
    .readFile(caminhoDoArquivo, encoding)
    .then((texto) => console.log(chalk.green(texto)))
    .catch(tratarErro);
}

//pegarArquivo("./arquivos/texto.md");

// FORÇAR UM ERRO:
// pegarArquivo("./arquivos/");

// ------------------------
// ASSÍNCRONA:
//pegarArquivoAssincrona('./arquivos/texto.md');

// FORÇAR UM ERRO:
// pegarArquivoAssincrona("./arquivos/");

async function asyncPegarArquivo(caminhoDoArquivo) {
  try {
    const encoding = 'utf-8';
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);

    // ---> ERRO - motivo: chalk:
    //console.log(chalk.green(texto));

    // ---> Apresentar SEM o CHALK:
    console.log(extrairLinks(texto));

    // ---> Forma de usar o CHALK SEM ERRO:
    const objeto = extrairLinks(texto);

    objeto.forEach((linha) => {
      for (const [key, value] of Object.entries(linha)) {
        console.log(`${chalk.blue(key)}: ${chalk.bgYellow.blue(value)}`);
      }
    });
  } catch (error) {
    tratarErro(error);
  }
}

asyncPegarArquivo('./arquivos/texto.md');

// FORÇAR UM ERRO:
// asyncPegarArquivo('./arquivos/');
