import db from '../../__DATA__/api';

const all = () => db;

const users = () => db.users;

// Helper method to concatenate a new user
// to our in-memory db (usually post-registration).
// We need this because, when a new user is created,
// the __DATA__/api.json file has the new record,
// but because our imported db is cached, it is not aware of this new record.
// To make it aware of new records, we would need to restart the API server,
// whenever a new user is created else, they wouldn't be able to login
// since the  imported db won't have their records in memory.
// And we need every record to be available to the user-filter middleware
// in order for our implementation of login to work.
const syncUser = (user) =>  db.users = db.users.concat([user]);

/**
 * Only this db module (should) use default export in this utils directory.
 * Because of its peculiar nature of reaching out to the __DATA__/api.json file,
 * which ordinarily is handled by json-server,
 * I want its API to be accessible only via the object it exports
 */
export default {
  all,
  users,
  syncUser,
};
