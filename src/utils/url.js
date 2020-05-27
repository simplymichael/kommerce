export const containsQueryString = path => /[?&]/.test(path);

export const getLeadingQueryStringChar = path =>
  containsQueryString(path) ? '&' : '?';
