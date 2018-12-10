const storage = {
  set: (key, obj) => {
    if (!localStorage) {
      return;
    }
    localStorage[key] = typeof obj === 'string' ? obj : JSON.stringify(obj);
  },
  get: key => {
    if (!localStorage || !localStorage[key]) {
      return null;
    }
    try {
      const parsed = JSON.parse(localStorage[key]);
      return parsed;
    } catch (e) {
      return localStorage[key];
    }
  },
  remove: key => {
    if (!localStorage) {
      return;
    }
    if (localStorage[key]) {
      localStorage.removeItem(key);
    }
  },
};

export default storage;
