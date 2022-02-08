const users = [
  {
    id: 1,
    cpf: '210.879.200-08',
    name: 'João Zé Neto',
  },
  {
    id: 2,
    cpf: '454.877.124-04',
    name: 'Maria de Carvalho Oliveira'
  }
];

const body = {
  cpf: '121.500.826-08',
  name: 'Rafael de Oliveira Romano'
}

const errorBody = {
  cpf: '121.500.828',
  name: 'Rafael de Oliveira Romano'
}

export {
  users,
  body,
  errorBody
}
