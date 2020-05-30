import TimeAgo from 'javascript-time-ago';
import { currentLanguage } from '../resources/strings';

// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'; // eslint-disable-line
import fr from 'javascript-time-ago/locale/fr'; // eslint-disable-line
import ru from 'javascript-time-ago/locale/ru' // eslint-disable-line

TimeAgo.addLocale(en);
TimeAgo.addLocale(fr);
TimeAgo.addLocale(ru);


export const formatTime = (timestamp) => {
  const timeAgo = new TimeAgo(currentLanguage);

  return timeAgo.format(new Date(timestamp));
};
