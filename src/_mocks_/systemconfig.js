import faker from 'faker';
import { sample } from 'lodash';
// ----------------------------------------------------------------------

const systemconfig = [...Array(5)].map((_, index) => ({
  id: faker.datatype.uuid(),
  yearFrom: faker.datatype.number({
    'min': 2018,
    'max': 2023,
}),
yearTo: faker.datatype.number({
    'min': 2018,
    'max': 2023,
}),
transactionFee: faker.datatype.float({
    'min': 0.0005,
    'max': 0.001,
}),
interest: faker.datatype.number({
    'min': 0.01,
    'max': 0.03,
}),
fixedMoney: faker.datatype.number({
    'min': 300000,
    'max': 500000,
}),
  status: sample(['ACTIVE', 'INACTIVE']),
}));

export default systemconfig;
