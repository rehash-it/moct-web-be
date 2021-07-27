module.exports = {
  jwtPrivateKey: process.env.JWT_SECRET || 'dsfsdfkasdjfkasdhfkashdflashfdfsdaf',
  // dburl:process.env.DATABASE_URL||'mongodb+srv://root:25524825233@cluster0.mlhns.mongodb.net/moctweb?retryWrites=true&w=majority',
  dburl: process.env.DATABASE_URL || 'mongodb://localhost:27017/moctweb',
  port: process.env.PORT || 9000
}