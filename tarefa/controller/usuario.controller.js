const usuarios = [
  {
    id: 1,
    nome: "Yondaime",
    email: "yondaime@email.com",
    senha: 123456,
    
  },
  {
    id: 2,
    nome: "Naruto",
    email: "naruto@email.com",
    senha: 12345,
  },
  {
    id: 3,
    nome: "Kakashi",
    email: "kakashi@email",
    senha: 1234,
  },
  {
    id: 4,
    nome: "Jiraya",
    email: "Jiraya@email",
    senha: 123,
  },
  {
    id: 5,
    nome: "Tsunade",
    email: "tsunade@email",
    senha: 123456,
  },
];

const listar = (req, res) => {
  const id = req.params.id;
  let found = false;

  usuarios.map(function (valor) {
    if (valor.id == id) {
      found = true;
      return res.send(valor);
    }
  });

  if (!found) {
    res.status(404).send({ message: "Não foi encontrado" });
  }
};




const listarTodosUsuarios = (req, res) => {
  res.send(usuarios);
};

const createUsuarios = (req, res) => {
  const usuario = req.body;

  if (Object.keys(usuario).length === 0) {
    return res.status(400).send({ message: "Nada encontrado, esta vazio!" });
  }

  if (!usuario.id) {
    return res.status(400).send({ message: "O campo id não foi encontrado" });
  }

  if (!usuario.nome) {
    return res.status(400).send({ message: "O campo nome não foi encontrado" });
  }

  if (!usuario.email) {
    return res
      .status(400)
      .send({ message: "O campo email não foi encontrado" });
  }

  if (!usuario.senha) {
    return res
      .status(400)
      .send({ message: "O campo senha não foi encontrado" });
  }

  usuario.nacionalidade = "Brasileira";

  usuarios.push(usuario);
  res.status(201).send(usuarios);
};



const updateUsuario = (req, res) => {
  const id = req.params.id;
  const usuario = req.body;
  let found = false;

  if (Object.keys(usuario).length === 0) {
    return res.status(400).send({ message: "Nada encontrado, esta vazio!"  });
  }

  if (!usuario.id) {
    return res.status(400).send({ message: "O campo id não foi encontrado" });
  }

  if (!usuario.nome) {
    return res.status(400).send({ message: "O campo nome não foi encontrado" });
  }

  if (!usuario.email) {
    return res
      .status(400)
      .send({ message: "O campo email não foi encontrado" });
  }

  if (!usuario.senha) {
    return res
      .status(400)
      .send({ message: "O campo senha não foi encontrado" });
  }

  usuarios.map(function (valor, index) {
    if (valor.id == id) {
      found = true;
      usuarios[index] = usuario;
      return res.send(usuarios[index]);
    }
  });

  if (!found) {
    res.status(404).send({ message: "Não foi encontrado" });
  }


};

const deleteUsuario = (req, res) => {
  const id = req.params.id;

  let found = false;

  usuarios.map(function (valor, index) {
    if (valor.id == id) {
      found = true;
      usuarios.splice(index, 1);
      return res.send(valor);
    }
  });

  if (!found) {
    res.status(404).send({ message: "Não foi encontrado" });
  }
};

module.exports = {
  listar,
  listarTodosUsuarios,
  createUsuarios,
  updateUsuario,
  deleteUsuario,
};
