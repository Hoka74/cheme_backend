const preventToStopServer = () => {
  setInterval(() => {
    fetch("https://www.dev.saaiota.ca/")
      .then((res) => console.log("fetch success"))
      .catch(() => console.log("fetch error"));
    // 15min
  }, 900000);
};

module.exports = preventToStopServer;
