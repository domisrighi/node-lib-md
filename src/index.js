import fs from 'fs';
import chalk from 'chalk';

function extrairLinks(texto){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}));
    return resultados.length !== 0 ? resultados : 'não há links no arquivos.';
}

function trataErro(erro){
    throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
}

//Com async e await:
async function pegaArquivo(caminhoDoArquivo){
    try{
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return extrairLinks(texto);
    } catch(erro){
        trataErro(erro);
    } finally{
        console.log(chalk.yellow('operação concluída'));
    }
}

export default pegaArquivo;