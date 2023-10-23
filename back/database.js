const sql = require('mssql')
const sqlConfig = {
  user: 'desenvolvedor',
  password: 'SqlServer2023',
  database: 'Gerenciador',
  server: 'DESKTOP-7NOS8P0\\SQLEXPRESS',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 3000
  },
  options: {
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}


async function getUsuario() {
  try {
    await sql.connect(sqlConfig);
    const result = (await sql.query`select * from USUARIO`).recordset;
    console.log(result)
    return result;
  } catch (ex) {
    console.log('ex', ex)
    return ex;
  }
}

async function login(usuario) {
  console.log(usuario)
  try {
    await sql.connect(sqlConfig);

    const result = await sql.query`
      SELECT 
        ID AS id,
        NOME AS nome,
        EMAIL AS email,
        TIPO_ID AS tipoId
      FROM 
        USUARIO
      WHERE 0=0
        AND EMAIL=${usuario.email}
        AND SENHA=${usuario.senha}
      `;

    console.log(result)
    return result.recordset;
  } catch (ex) {
    console.log('ex', ex)
    return ex;
  }
}

async function alterarPonto(registro) {
  console.log(registro)
  try {
    await sql.connect(sqlConfig);

    const result = await sql.query`
      UPDATE PONTO SET 
      DATA_REGISTRO = DATEADD(
                        HOUR,
                        CAST(${registro.hora} AS INT),
                        DATEADD(
                          MINUTE,
                          CAST(${registro.minuto} AS INT),
                          CAST(CAST(DATA_REGISTRO AS DATE) AS DATETIME))
                        )
      WHERE 0=0
        AND ID=${registro.id}
      `;

    console.log(result)
    return result.recordset;
  } catch (ex) {
    console.log('ex', ex)
    return ex;
  }
}

async function registrar(usuario) {
  console.log(usuario)
  try {
    await sql.connect(sqlConfig);
    const result = (await sql.query`
      INSERT INTO USUARIO VALUES(
        ${usuario.nome},
        ${usuario.email},
        ${usuario.senha},
        ${usuario.tipoId}
      )
    `).recordset;
    console.log(result)
    return result;
  } catch (ex) {
    console.log('ex', ex)
    return ex;
  }
}

async function obterRegistros(id) {
  try {
    await sql.connect(sqlConfig);
    const result = (await sql.query`
    SELECT 
      ID AS id,
      USUARIO_ID AS usuarioId,
      DATA_REGISTRO AS dataRegistro,
      TIPO_REGISTRO AS tipoRegistro
    FROM
      PONTO
    WHERE
      USUARIO_ID = ${id}
      AND CAST(DATA_REGISTRO AS DATE) = CAST(GETDATE() AS DATE) 
    `).recordset;
    console.log(result)
    return result;
  } catch (ex) {
    console.log('ex', ex)
    return ex;
  }
}

async function registrarPonto(registro) {
  try {
    console.log(registro)

    await sql.connect(sqlConfig);
    const result = await sql.query`
      INSERT INTO PONTO VALUES
      (${registro.usuarioId},
      GETDATE(),
      ${registro.tipoRegistro})	  
    `;
    return result;
  } catch (ex) {
    console.log('ex', ex)
    return ex;
  }
}

async function obterPagamento(id, mes, ano) {
  try {
    console.log(id, mes, ano)
    await sql.connect(sqlConfig);
    const result = await sql.query`
        SELECT 
          ID AS id,
          USUARIO_ID AS usuarioId,
          DATA_PAGAMENTO AS dataPagamento,
          VALOR_PAGAMENTO AS valorPagamento
        FROM
          PAGAMENTO
        WHERE
          USUARIO_ID=${id}
          AND MONTH(DATA_PAGAMENTO) = ${mes}
          AND YEAR(DATA_PAGAMENTO) = ${ano}
      `;
    return result.recordset[0];
  } catch (ex) {
    console.log('ex', ex)
    return ex;
  }
}

module.exports = {
  getUsuario,
  obterRegistros,
  registrarPonto,
  obterPagamento,
  login,
  registrar,
  alterarPonto,
}