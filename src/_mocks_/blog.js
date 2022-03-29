import faker from 'faker';
// utils
const posts = [...Array(25)].map((_, index) => ({
  totalMoney: "14302166",
  id: faker.datatype.uuid(),
  title: "This is a title",
  postCreatedAt: "2022-02-19T12:18:43.391Z",
  Student: {
    id: faker.datatype.uuid(),
    SchoolMajor: {
      id: faker.datatype.uuid(),
      Major: {
        name: "Software Engineering"
      },
      School: {
        name: "FPT Campus Khu công nghệ cao"
      }
    },
    User: {
      firstName: "Nguyễn",
      lastName: "Văn A",
      profileUrl: "https://i.pinimg.com/originals/47/e0/01/47e001f1be26293d7f8826c5b262d9df.jpg",
      id: faker.datatype.uuid(),
    }
  }
}));

export default posts;
