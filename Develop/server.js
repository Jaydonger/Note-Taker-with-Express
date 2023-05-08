const express = require('express');
const apiRoutes = require('./routes/apiroutes');
const router = require('./routes/route');
const { clog } = require('./middleware/clog');
// const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

app.use(express.static('public'));
app.use('/', router);
app.use('/api', apiRoutes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);