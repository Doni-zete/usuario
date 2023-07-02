// importando o módulo mongoose
const mongoose = require('mongoose');

// Função para conectar ao banco de dados
function connecToDatabase(){
    // Estabelece a conexão com o banco de dados MongoDB
    mongoose.connect('mongodb://localhost:27017/aulas', {
        useNewUrlParser:  true,
        useUnifiedTopology: true
    }).then(()=>{
        // Exibe uma mensagem de sucesso quando a conexão é estabelecida
        console.log("Mongo db conectado"); 
    }).catch((err) =>{
        // Exibe uma mensagem de erro se ocorrer um problema na conexão
        return console.log(`Erro na conexão com o banco: ${err}`); 
    });
}
// Exporta a função para que ela possa ser utilizada em outros arquivos
module.exports = connecToDatabase; 
