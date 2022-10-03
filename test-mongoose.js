
const mongoose = require('mongoose');
const { uuid } = require('uuidv4');



const init = async () => {
    
    try {
        await mongoose.connect('mongodb://localhost:27019/Back-end-Typescript-com-MongoDB');

        const UserSchema = new mongoose.Schema({
            key: { type: String, required: true},
            nome: { type: String, required: true },
            email: { type: String, required: true },
            perfil: { type: String, required: true },
            data_cadastro: { type: Date, default: Date.now }
        });

        const User = mongoose.model('user_v3', UserSchema);

        const usuario = new User({ 
            key: uuid(),
            nome: 'test 01',
            email: 'test 01',
            perfil: 'test 01',
        });

        const result = await usuario.save();

        console.log(result);

    } catch (error) {

        console.log(error);
        
    }


}


init();
