export const fakeAuth = (username, password) =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (username === "bj" && password === "pass424") {
        return resolve('2342f2f1d131rf12')
      }
    }, 250);
  });
