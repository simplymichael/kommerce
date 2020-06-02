import db from './db';
import { checkPassword } from './auth';

/**
 * @param filters object in format:
 * { name: userName, 'email': userEmail, password: userPassword, ...}
 *
 * @return array of filtered users
 */
export const filterBy = async (filters) => {
  const users = await db.users();

  return users.filter((user) => {
    let includeUser = true;

    for(let [key, value] of Object.entries(filters)) {
      if(key === 'password') {
        includeUser = checkPassword(value, user.password);
      } else {
        if(typeof user[key] === 'string' && typeof value === 'string' &&
           (user[key].toLowerCase() !== value.toLowerCase())) {
          includeUser = false;
        } else if(user[key] !== value) {
          includeUser = false;
        }
      }

      if(!includeUser) {
        break;
      }
    }

    return includeUser;
  });
};

export const findByEmail = async (email) => {
  const users = await filterBy({ email });

  return users.length > 0;
};
