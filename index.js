const { select, input } = require("@inquirer/prompts"); // abrir uma caixinha de seleção

let meta = {
  value: "Tomar 3L de água por dia",
  checked: false,
};

// let metas = []; Posso declarar a list assim, sem nada entrer os colchetes
let metas = [meta];

const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite a meta:" });

  if (meta.length == 0) {
    console.log("A meta não pode ser vazia.");
    return;
    //Se quisesse que ficasse preso na função até digitar: return cadastrarMeta(); Ou seja,
    //returna para a própria função
  }

  metas.push(
    { value: meta, checked: false } //como ainda não terminei a meta, so estou cadastrando, crio como false
  );
};

// Interromper loop infinito: CTRL + C
const start = async () => {
  while (true) {
    //sempre que eu executar o comando await
    //devo colocar a palavra ASYNC na arrow fuction
    //o comando await é utilizado para fazer o programa esperar que o user digite
    const opcao = await select({
      //A função await está associada a promises, a ideia de que irá buscar
      //algo e retornarar, mesmo se a resposta da promessa for negativa
      //A funcção select está esperando um objeto que tenha os atributos
      //message e choices, esse objeto não pode pode receber nomes alternativos...
      //choices precisa ser um array
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar meta",
          value: "cadastrar",
        },
        {
          name: "Listar metas",
          value: "listar",
        },
        {
          name: "Sair",
          value: "sair",
        },
      ],
    });

    switch (opcao) {
      case "cadastrar":
        await cadastrarMeta(); //o await faz com que ele espere o retorno da função async
        console.log(metas); // se coloca assim sai formatado como array
        break;
      case "listar":
        console.log("vamos listar");
        break;
      case "sair":
        console.log("Até a próxima!");
        return; // dentro da função start ele para a função
    }
  }
};

start();
