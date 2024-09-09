const authProvider = {
  login: ({ username, password }) => {
    const request = new Request('http://localhost:4000/users', {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return fetch(request)
      .then((response) => response.json())
      .then((users) => {
        const user = users.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (u: any) => u.username === username && u.password === password
        );
        if (!user) {
          throw new Error('Invalid login credentials');
        }
        localStorage.setItem('auth', JSON.stringify(user)); // Store user details (including role)
        return Promise.resolve();
      });
  },

  logout: () => {
    localStorage.removeItem('auth');
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem('auth') ? Promise.resolve() : Promise.reject();
  },

  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('auth');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => {
    const user = JSON.parse(localStorage.getItem('auth') || '{}');
    return Promise.resolve(user ? user.role : '');
  },
};

export default authProvider;
