import faker from 'faker';
import { sample } from 'lodash';
// utils
// import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const contracts = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  nameA: faker.name.findName(),
  nameB: faker.name.findName(),
  loanid: faker.datatype.uuid(),
  subject: faker.datatype.number({
    'min': 1000000,
    'max': 20000000,
}),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
}));

export default contracts;
