
const Usuario = {
    nome: "",
    dataNascimento: "",
    email: "",
    senha: "",

    exibirInformacoes: function() {
      console.log("Nome: " + this.nome);
      console.log("Data de Nascimento: " + this.dataNascimento);
      console.log("Email: " + this.email);
      console.log("Senha: " + this.senha);
    }
  };
  

  const usuario1 = Object.create(Usuario);
  usuario1.nome = "Yondaime";
  usuario1.dataNascimento = "25/01/1999";
  usuario1.email = "yondaime@email.com";
  usuario1.senha = 123456;

  usuario1.exibirInformacoes();