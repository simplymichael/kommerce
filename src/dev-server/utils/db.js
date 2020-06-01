import db from '../../__DATA__/api';

const all = () => db;

const users = () => db.users;

export default {
  all,
  users,
};
