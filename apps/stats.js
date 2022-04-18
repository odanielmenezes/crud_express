// setInterval(() => {
//   const os = require("os");
//   const { freemem, totalmem } = os;

//   const mem = parseInt(freemem() / 1024 / 1024);
//   const total = parseInt(totalmem() / 1024 / 1024);
//   const percents = parseInt((mem / total) * 100);
//   const stats = {
//     freemem: `${mem} MB`,
//     total: `${total} MB`,
//     usage: `${percents} %`,
//   };
//   console.clear()
//   console.log(stats)
// }, 1000);

app.get("/teste", (req, res) => {
  const os = require("os");
  const { freemem, totalmem } = os;
  const mem = parseInt(freemem() / 1024 / 1024);
  const total = parseInt(totalmem() / 1024 / 1024);
  const percents = parseInt((mem / total) * 100);
  var dados = [
    {
      mem,
      total,
      percents
    },
  ];
  res.render('index', { data: dados})
});
