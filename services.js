function lerTodos() {
console.log("ler todos");
    var resultado = document.getElementById("ListaUsuarios");
    resultado.innerHTML = "carregando...";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
           var obj = JSON.parse(this.responseText);
           console.log(obj);
           let conteudo = '';
           obj.forEach(user =>
            conteudo += "Nome: " + obj.nome + "<br>" + obj.email + "</br>"
            
            )
            resultado.innerHTML = conteudo;
        } else {
           console.log("erro");
        }
    }
    xhttp.open("GET","http://localhost:8001/produtos",true);
    xhttp.send();
}

function criar() {
    console.log("criar usuario");
        let nome = document.getElementById("nome").value;
        console.log(nome);
        let email = document.getElementById("email").value;
        let user = {'nome': nome, 'email' : email};
        console.log(user);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST","http://localhost:8001/produtos",true);
        xhttp.setRequestHeader(
            'Content-type', 'application/json');
        xhttp.send(JSON.stringify(user));
        lerTodos();
    }