import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  name: faker.name.findName(),
  company: sample(['FPT',
  'Hoa Sen',
  'HuTech',
  'Văn Lang',
  'Luật',
  'Y Dược']),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    'Student',
    'Backer',
    // 'UI Designer',
    // 'UX Designer',
    // 'UI/UX Designer',
    // 'Project Manager',
    // 'Backend Developer',
    // 'Full Stack Designer',
    // 'Front End Developer',
    // 'Full Stack Developer'
  ])
}));

export default users;
