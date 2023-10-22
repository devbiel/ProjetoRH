import axios from "axios";

const Config = {
    Start() {
        return axios.create({
            validateStatus: function (status) {
                return (
                    status !== 204 && status !== 401 && status !== 400 && status !== 406
                );
            },
            baseURL: "http://localhost:3000/api/",
            timeout: 120000,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });

    },
};

export const Api = {
    async GetUsuario() {
        return await Config.Start()
            .get('usuario')
            .then(res => res.data)
            .catch(e => e);
    },

    async Login(usuario) {
        return await Config.Start()
            .post('usuario/login', usuario)
            .then(res => res.data)
            .catch(e => e);
    },

    
    async Registrar(usuario) {
        return await Config.Start()
            .post('usuario/registrar', usuario)
            .then(res => res.data)
            .catch(e => e);
    },

    async ObterRegistros(id) {
        return await Config.Start()
            .get('usuario/obter-registros?id=' + id)
            .then(res => res.data)
            .catch(e => e);
    },

    async RegistrarPonto(registro) {
        return await Config.Start()
            .post('usuario/registrar-ponto', registro)
            .then(res => res.data)
            .catch(e => e);
    },

    async ObterPagamento(id, mes, ano) {
        return await Config.Start()
            .get(`usuario/obter-pagamento?id=${id}&mes=${mes}&ano=${ano}`)
            .then(res => res.data)
            .catch(e => e);
    },
};