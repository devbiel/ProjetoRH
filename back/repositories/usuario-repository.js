const db = require('../database');

module.exports = {
    get() {
        return db.getUsuario();
    },

    login(usuario) {
        return db.login(usuario);
    },

    alterarPonto(registros){
        for(registro of registros){
            db.alterarPonto(registro);
        }
        return "Ok";
    },
    
    registrar(usuario) {
        return db.registrar(usuario);
    },

    obterRegistros(id) {
        return db.obterRegistros(id);
    },

    registrarPonto(registro) {
        return db.registrarPonto(registro);
    },

    obterPagamento(id, mes, ano) {
        return db.obterPagamento(id, mes, ano);
    }
} 