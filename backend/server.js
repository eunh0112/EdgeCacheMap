require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


const PORT     = process.env.PORT     || 3000;
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('❌ MONGO_URI 가 설정되지 않았습니다.');
  process.exit(1);
}


app.use(cors());
app.use(bodyParser.json());

// MongoDB 연결
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB 연결 성공'))
  .catch(err => {
    console.error('❌ MongoDB 연결 실패:', err);
    process.exit(1);
  });

// 라우터
app.use('/auth',  require('./routes/auth'));
app.use('/places', require('./routes/Place'));


app.get('/', (req, res) => {
  res.send('🌐 서버가 정상 작동 중입니다!');
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 서버가 http://0.0.0.0:${PORT} 에서 실행 중입니다`);
});
