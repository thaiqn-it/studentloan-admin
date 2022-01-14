import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const schools = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: sample(['FPT',
  'Hoa Sen',
  'HuTech',
  'Văn Lang',
  'Luật',
  'Y Dược']),
  subject: faker.datatype.number({
    'min': 1,
    'max': 100,
}),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  subsubject: faker.datatype.number({
    'min': 1,
    'max': 100,
}),
}));

export default schools;
