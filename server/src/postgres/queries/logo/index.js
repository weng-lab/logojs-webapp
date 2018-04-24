import select from './select';
import insert from './insert';

export default dbconn => Object.assign(
    select(dbconn), insert(dbconn)
);
