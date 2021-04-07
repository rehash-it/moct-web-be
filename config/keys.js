module.exports = {
  jwtPrivateKey : process.env.JWT_SECRET||'dsfsdfkasdjfkasdhfkashdflashfdfsdaf',
  dburl:process.env.DATABASE_URL||'mongodb+srv://root:25524825233@cluster0.mlhns.mongodb.net/moctweb?retryWrites=true&w=majority',
  port:process.env.PORT || 9000 
}