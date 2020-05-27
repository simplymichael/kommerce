export const generateActionName = (name, ns = 'default') => `app/${ns}/${name}`;

export const generateAction = (type, data = {}) => {
  if(Object.keys(data).length > 0) {
    return {
      type,
      payload: { ...data }
    };
  } else {
    return {
      type
    };
  }
};

export const generateErrorAction = (type, error, data = {}) => {
  if(Object.keys(data).length > 0) {
    return {
      type,
      error,
      payload: { ...data },
    };
  } else {
    return {
      type,
      error
    };  
  }
};
