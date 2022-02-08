const body = {
  cpf: '121.854.987-08',
  name: 'Givanildo testando',
}

const errorBody = {
  cpf: '121.854.987-',
  name: 'Givanildo testando',
}

const bodyTransfer = {
  cpfOrigin: '147.789.987-78',
  quantity: 500,
  cpfDestiny: '148.759.987-77'
};

const bodyIncorrectTransfer = {
 cpfOrigin: '147.789.987-78',
  quantity: 500,
  cpfDestiny: '148759.987-77'
}

export  {
  body,
  errorBody,
  bodyIncorrectTransfer,
  bodyTransfer
}

