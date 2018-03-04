window.onload = initPage;
function initPage() {
    tocart = document.getElementsByClassName("tocart");
    for (var i = 0; i < tocart.length; i++) {
        tocart[i].onclick = function () {
            atualizarCarrinho(1);
            document.getElementById('load-carrinho').style.display = "Block";
        };
    }

    var link=document.createElement("div");
    link.setAttribute('id', 'conteudo-carrinho-lateral');
    document.body.appendChild(link);
    document.getElementById('conteudo-carrinho-lateral').innerHTML = '<div id="jsr_carrinho" class="carrinho"><div id="produtos_carrinho">Sua conexão esta muito lenta!!</div></div><div id="load-carrinho" style="display: none"><img src="'+LOADING_IMG+'" /> </div>';

    atualizarCarrinho(0);
    atualizarQtdCarrinho();
}

function atualizarCarrinho(a) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("produtos_carrinho").innerHTML = this.responseText;
            atualizarQtdCarrinho();
            if(objinput1 = document.getElementById('load-item-carrinho'))
                objinput1.style.display = "none";

            if(objinput2 = document.getElementById('load-carrinho'))
                objinput2.style.display = "none";

            if(a == 1)
                openNav();
        }
    };
    xmlhttp.open("GET", WEB_URL +"iw3_carrinholateral?t=1&_="+Date.now() , true);
    xmlhttp.send();
}

function atualizarQtd(obj,id) {
    document.getElementById('load-item-carrinho').style.display = "Block";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            atualizarQtdCarrinho();
            atualizarCarrinho(1);
        }
    };
    xmlhttp.open("GET", WEB_URL +"iw3_carrinholateral?t=2&id="+id+"&qtd="+obj.value+"&_="+Date.now() , true);
    xmlhttp.send();
}
function deletarItem(id) {
    document.getElementById('load-item-carrinho').style.display = "Block";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            atualizarQtdCarrinho();
            atualizarCarrinho(1);
        }
    };
    xmlhttp.open("GET", WEB_URL +"iw3_carrinholateral?t=4&id="+id+"&_="+Date.now() , true);
    xmlhttp.send();
}
function atualizarQtdCarrinho() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.querySelector(".minicart-wrapper").innerHTML = this.responseText;
            if(objinput1 = document.getElementById('load-item-carrinho'))
                objinput1.style.display = "none";

        }
    };
    xmlhttp.open("GET", WEB_URL +"iw3_carrinholateral?t=3&_="+Date.now() , true);
    xmlhttp.send();
}

function openNav() {
    document.getElementById("jsr_carrinho").style.width = "330px";
    document.getElementById("jsr_carrinho").style.padding = "60px 0 118px 22px";
}

function closeNav() {
    document.getElementById("jsr_carrinho").style.width = "0";
    document.getElementById("jsr_carrinho").style.padding = "0";
}

function process(qty,id){
    obj = document.getElementById("qty-cart-"+id);
    obj.focus();
    var value = parseInt(obj.value);
    value+=qty;
    if(value < 1){
        obj.value = 1;
    }else{
        obj.value = value;
    }
}

