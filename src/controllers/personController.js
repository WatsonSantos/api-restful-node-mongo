const Person = require("../models/Person");

exports.create_person = async function (req, res) {
  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };

  try {
    if (!name) {
      res.status(422).json({ error: "O nome é obrogatório" });
      return;
    }
    if (!salary) {
      res.status(422).json({ error: "O salary é obrogatório" });
      return;
    }
    if (!approved) {
      res.status(422).json({ error: "O approved é obrogatório" });
      return;
    }

    await Person.create(person)
      .then(() => {
        res
          .status(201)
          .json({ message: "Pessoa inserida no sistema com sucesso!" });
      })
      .catch((error) => {
        res.status(400).json({ error: "Erro ao criar pessoa" });
        console.log(error);
      });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.list_all_person = async function (req, res) {
  try {
    const people = await Person.find();

    if (!people) {
      res.status(422).json({ message: "Não há utilizadores cadastrados." });
      return;
    }

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.lis_one_person = async function (res, res) {
  try {
    const id = req.params.id;
    const person = await Person.findOne({ _id: id });

    if (!person) {
      res.status(422).json({ message: "Utilizador não encontrado." });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.update_person = async function (req, res) {
  const id = req.params.id;

  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };

  try {
    const updatePerson = await Person.updateOne({ _id: id }, person);

    //Verificando se houve alguma mudança mo tutilizador
    //Se não houve então quer dizer que o utilizador não exite
    if (updatePerson.matchedCount === 0) {
      res.status(422).json({ message: "Utilizador não encontrado." });
      return;
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.delete_person = async function (req, res) {
  const id = req.params.id;
  const person = await Person.findOne({ _id: id });

  if (!person) {
    res.status(422).json({ message: "Utilizador não encontrado." });
    return;
  }

  try {
    await Person.deleteOne({ _id: id });

    res.status(200).json({ message: "Utilizador removido com sucesso!" });
  } catch {
    res.status(500).json({ error: error });
  }
};
