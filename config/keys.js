module.exports = {
  jwtPrivateKey: process.env.JWT_SECRET || 'dsfsdfkasdjfkasdhfkashdflashfdfsdaf',
  // dburl:process.env.DATABASE_URL||'mongodb+srv://rootUser:25524825233@directory.d16b0.mongodb.net/directory?retryWrites=true&w=majority',
  dburl: process.env.DATABASE_URL || 'mongodb://localhost:27017/moctweb',
  port: process.env.PORT || 9000
}