module.exports = {
  jwtPrivateKey: process.env.JWT_SECRET || 'dsfsdfkasdjfkasdhfkashdflashfdfsdaf',
  // dburl:process.env.DATABASE_URL||'mongodb+srv://root:25524825233@cluster0.mlhns.mongodb.net/moctweb?retryWrites=true&w=majority',
  dburl: process.env.DATABASE_URL || 'mongodb://localhost:27017/moctweb',
  mgdb: 'mongodb+srv://Dagic_zewdu:Oehqa5SYa2umwuCV@mycluster-edpny.mongodb.net/motc?retryWrites=true&w=majority',
  port: process.env.PORT || 9000,
}