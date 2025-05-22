import express from "express";

const app = express();
const host = "0.0.0.0";
const port = 3000;

app.use(express.urlencoded({ extended: true }));

const cadastros = [];

const style = `
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #b1b9d1;
        padding: 20px;
    }
    .container {
        max-width: 600px;
        margin: auto;
        background: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    input, select, button {
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        border-radius: 5px;
        border: 1px solid #ccc;
    }
    .text-danger {
        color: red;
        font-size: 0.9em;
    }
    .logout-message {
        text-align: center;
        margin-top: 20px;
        font-weight: bold;
        color: green;
    }
</style>
`;

app.get("/", (req, res) => {
    res.send(`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    ${style}
</head>
<body>
    <div class="container">
        <h1>Login</h1>
        <form action="/menu" method="GET">
            <input type="text" placeholder="Usuário" required>
            <input type="password" placeholder="Senha" required>
            <input type="password" placeholder="Confirme a Senha" required>
            <button type="submit">Entrar</button>
        </form>
        <form action="/logout" method="GET">
            <button type="submit">Sair</button>
        </form>
    </div>
</body>
</html>`);
});

app.get("/menu", (req, res) => {
    res.send(`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Menu</title>
    ${style}
</head>
<body>
    <div class="container">
        <h1>Menu do Sistema</h1>
        <form method="GET" action="/fornecedor">
            <select name="cadastro" onchange="if(this.value === 'fornecedor') this.form.submit();">
                <option value="">-- Selecione --</option>
                <option value="usuario">Cadastro de Usuários</option>
                <option value="produto">Cadastro de Produtos</option>
                <option value="cliente">Cadastro de Clientes</option>
                <option value="fornecedor">Cadastro de Fornecedores</option>
            </select>
        </form>
        <form action="/logout" method="GET">
            <button type="submit">Sair</button>
        </form>
    </div>
</body>
</html>`);
});

app.get("/logout", (req, res) => {
    res.send(`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Logout</title>
    ${style}
</head>
<body>
    <div class="container">
        <span class="logout-message">Logout realizado com sucesso!</span>
        <a href="/">Voltar para o login</a>
    </div>
</body>
</html>`);
});

app.get("/fornecedor", (req, res) => {
    res.send(getFornecedorForm({}));
});

app.post("/submit", (req, res) => {
    const campos = [
        "cnpj", "razaosocial", "nomefantasia", "rua", "numero", "bairro",
        "cidade", "estado", "cep", "email", "telefone"
    ];

    const dados = {};
    let erro = false;

    for (const campo of campos) {
        dados[campo] = req.body[campo]?.trim();
        if (!dados[campo]) erro = true;
    }

    if (erro) {
        return res.send(getFornecedorForm(dados));
    }

    cadastros.push(dados);
    res.redirect("/cadastros");
});

function getFornecedorForm(dados) {
    const {
        cnpj = "", razaosocial = "", nomefantasia = "", rua = "",
        numero = "", bairro = "", cidade = "", estado = "",
        cep = "", email = "", telefone = ""
    } = dados;

    let conteudo = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Cadastro de Fornecedor</title>
    ${style}
</head>
<body>
    <div class="container">
        <h1>Cadastro de Fornecedor</h1>
        <form action="/submit" method="POST">`;

    conteudo += `<label for="cnpj">CNPJ</label>`;
    if (!cnpj) {
        conteudo += `
            <input type="text" id="cnpj" name="cnpj" value="">
            <span class="text-danger">Por favor, informe o CNPJ</span>`;
    } else {
        conteudo += `
            <input type="text" id="cnpj" name="cnpj" value="${cnpj}">`;
    }

    conteudo += `<label for="razaosocial">RAZÃO SOCIAL</label>`;
    if (!razaosocial) {
        conteudo += `
            <input type="text" id="razaosocial" name="razaosocial" value="">
            <span class="text-danger">Por favor, informe a razão social</span>`;
    } else {
        conteudo += `
            <input type="text" id="razaosocial" name="razaosocial" value="${razaosocial}">`;
    }

    conteudo += `<label for="nomefantasia">NOME FANTASIA</label>`;
    if (!nomefantasia) {
        conteudo += `
            <input type="text" id="nomefantasia" name="nomefantasia" value="">
            <span class="text-danger">Por favor, informe o nome fantasia</span>`;
    } else {
        conteudo += `
            <input type="text" id="nomefantasia" name="nomefantasia" value="${nomefantasia}">`;
    }

    conteudo += `<label for="rua">RUA</label>`;
    if (!rua) {
        conteudo += `
            <input type="text" id="rua" name="rua" value="">
            <span class="text-danger">Por favor, informe a rua</span>`;
    } else {
        conteudo += `
            <input type="text" id="rua" name="rua" value="${rua}">`;
    }

    conteudo += `<label for="numero">NÚMERO</label>`;
    if (!numero) {
        conteudo += `
            <input type="text" id="numero" name="numero" value="">
            <span class="text-danger">Por favor, informe o número</span>`;
    } else {
        conteudo += `
            <input type="text" id="numero" name="numero" value="${numero}">`;
    }

    conteudo += `<label for="bairro">BAIRRO</label>`;
    if (!bairro) {
        conteudo += `
            <input type="text" id="bairro" name="bairro" value="">
            <span class="text-danger">Por favor, informe o bairro</span>`;
    } else {
        conteudo += `
            <input type="text" id="bairro" name="bairro" value="${bairro}">`;
    }

    conteudo += `<label for="cidade">CIDADE</label>`;
    if (!cidade) {
        conteudo += `
            <input type="text" id="cidade" name="cidade" value="">
            <span class="text-danger">Por favor, informe a cidade</span>`;
    } else {
        conteudo += `
            <input type="text" id="cidade" name="cidade" value="${cidade}">`;
    }

    conteudo += `<label for="estado">ESTADO</label>`;
    if (!estado) {
        conteudo += `
            <input type="text" id="estado" name="estado" value="">
            <span class="text-danger">Por favor, informe o estado</span>`;
    } else {
        conteudo += `
            <input type="text" id="estado" name="estado" value="${estado}">`;
    }

    conteudo += `<label for="cep">CEP</label>`;
    if (!cep) {
        conteudo += `
            <input type="text" id="cep" name="cep" value="">
            <span class="text-danger">Por favor, informe o CEP</span>`;
    } else {
        conteudo += `
            <input type="text" id="cep" name="cep" value="${cep}">`;
    }

    conteudo += `<label for="email">EMAIL</label>`;
    if (!email) {
        conteudo += `
            <input type="email" id="email" name="email" value="">
            <span class="text-danger">Por favor, informe o email</span>`;
    } else {
        conteudo += `
            <input type="email" id="email" name="email" value="${email}">`;
    }

    conteudo += `<label for="telefone">TELEFONE</label>`;
    if (!telefone) {
        conteudo += `
            <input type="text" id="telefone" name="telefone" value="">
            <span class="text-danger">Por favor, informe o telefone</span>`;
    } else {
        conteudo += `
            <input type="text" id="telefone" name="telefone" value="${telefone}">`;
    }

    conteudo += `
            <button type="submit">Cadastrar</button>
        </form>
    </div>
</body>
</html>`;

    return conteudo;
}

app.get("/cadastros", (req, res) => {
    let tabela = `
    <div class="container">
        <h1>Cadastros Recebidos</h1>
        <table>
            <tr>
                <th>CNPJ</th>
                <th>RAZÃO SOCIAL</th>
                <th>NOME FANTASIA</th>
                <th>RUA</th>
                <th>NÚMERO</th>
                <th>BAIRRO</th>
                <th>CIDADE</th>
                <th>ESTADO</th>
                <th>CEP</th>
                <th>EMAIL</th>
                <th>TELEFONE</th>
            </tr>`;

    for (const p of cadastros) {
        tabela += `<tr>
            <td>${p.cnpj}</td>
            <td>${p.razaosocial}</td>
            <td>${p.nomefantasia}</td>
            <td>${p.rua}</td>
            <td>${p.numero}</td>
            <td>${p.bairro}</td>
            <td>${p.cidade}</td>
            <td>${p.estado}</td>
            <td>${p.cep}</td>
            <td>${p.email}</td>
            <td>${p.telefone}</td>
        </tr>`;
    }

    tabela += `</table>
        <a href="/menu">Voltar ao menu</a>
    </div>`;

    res.send(`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Cadastros</title>
    ${style}
</head>
<body>
    ${tabela}
</body>
</html>`);
});

app.listen(port, host, () => {
    console.log(`Servidor em execução em http://${host}:${port}/`);
});