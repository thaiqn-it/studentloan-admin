import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const users = [...Array(20)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  name: faker.name.findName(),
  to: faker.name.findName(),
  money: faker.datatype.number({
    'min': 1,
    'max': 1000,
}),
  time: '01-10-2021 08:23',
  isSuccessful: sample(['Có', 'Không']),
  status: sample(['transfer', 'withdrawal', 'deposit']),
  role: sample([
    'Student',
    'Backer',
  ])
}));

export default users;
