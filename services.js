function lerTodos() {
console.log("ler todos");
    var resultado = document.getElementById("statusConexao");
    resultado.innerHTML = "carregando...";
    var table = document.getElementById("ListaUsuarios");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
           var obj = JSON.parse(this.responseText);
           console.log(obj);
           let conteudo = '';
           obj.forEach(user => {
            if(document.getElementById("u" + user.id)==null) {
            var index = table.rows.length
            console.log("indice =" + index);
            var row = table.insertRow(-1);
            row.id = 'u' + user.id;
            var cellId = row.insertCell(0);
            var cellNome = row.insertCell(1);
            var cellEmail = row.insertCell(2);
            var cellEditar = row.insertCell(3);
            var cellDeletar = row.insertCell(4);
            cellId.innerHTML = user.id;
            cellNome.innerHTML = user.nome;
            cellEmail.innerHTML = user.email;
            cellEditar.innerHTML = '<button onclick="setToEdit(' + user.id + ')">Editar</button>'
            cellDeletar.innerHTML = '<button onclick="deletar(' + user.id + ')">Deletar</button>'
            resultado.innerHTML = "";
            }
        });
        } else {
            resultado.innerHTML = "";
           console.log("erro");
        }
    }
    xhttp.open("GET","http://localhost:8001/usuarios",true);
    xhttp.send();
}

function salvar() {
    let idUser = document.getElementById("idUser").value;
    console.log("Salvar usuario " + idUser);
        let nome = document.getElementById("nome").value;
        console.log(nome);
        let email = document.getElementById("email").value;
        let user = {'nome': nome, 'email' : email};
        console.log(user);
        var xhttp = new XMLHttpRequest();
        if(!idUser != "") {
        xhttp.open("POST","http://localhost:8001/usuarios",true);
        xhttp.setRequestHeader(
            'Content-type', 'application/json');
        xhttp.onreadystatechange = function () {
            if(this.readyState == 4 && this.status == 200)
                lerTodos();
        }
        xhttp.send(JSON.stringify(user));
        } else {
            xhttp.open("PUT","http://localhost:8001/usuarios/" + idUser,true);
            xhttp.setRequestHeader(
                'Content-type', 'application/json');
            xhttp.onreadystatechange = function () {
                if(this.readyState == 4 && this.status == 200)
                    lerTodos();
                }
            xhttp.send(JSON.stringify(user));
        }
        document.getElementById("nome").value =  "";
        document.getElementById("email").value = "";
        document.getElementById("idUser").value = "";
       
    }

    function setToEdit(id) {
    console.log("colocando na lista de edição");
            var row = document.getElementById("u" + id);
            console.log("editando row " + row);
                let nome = document.getElementById("nome");
                let email = document.getElementById("email");
                let idUser = document.getElementById("idUser");
                console.log(row.childNodes);
                nome.value = row.childNodes[1].outerText;
                email.value = row.childNodes[2].outerText;
                idUser.value = row.childNodes[0].outerText;
                row.remove();
        }

function deletar(id) {
            console.log("deletar usuario");
            var table = document.getElementById("ListaUsuarios");
            var row = document.getElementById("u" + id);
                var xhttp = new XMLHttpRequest();
                xhttp.open("DELETE","http://localhost:8001/usuarios/" + id,true);
                xhttp.onreadystatechange = function () {
                    if(this.readyState == 4 && this.status == 200)
                    lerTodos();
                }
                xhttp.send();
                row.remove();
                lerTodos();
}