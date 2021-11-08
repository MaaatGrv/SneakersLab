const panier=[];
var OPTIONS = ["1","b","B","2"];
console.log(window.location.pathname)

if ( window.location.pathname == "/perso.html" ) {

	window.onload = function () {
		const colour_btn_els = document.querySelectorAll('.colours .colour');
		const lacet_btn_els = document.querySelectorAll('.lacets .lacet');
		const capacity_btn_els = document.querySelectorAll('.capacity .modele');
		const imagery_el = document.querySelector('.imagery');
		const image_el = document.querySelector('.imagery .image');
	
		let produit_id = new URLSearchParams(window.location.search).get("id");
	
		if (produit_id != null) {
			image_el.src = "..//Images/ImagesChaussures/" + produit_id + '.png';
			const tag = produit_id.split('');
	
			document.querySelector('.capacity .modele.selected').classList.remove('selected');
			m = document.getElementById(tag[1]);
			m.classList.add('selected');
			OPTIONS[0]=tag[1]
	
			document.querySelector('.colours .colour.selected').classList.remove('selected');
			c = document.getElementById(tag[2]);
			c.classList.add('selected');
			OPTIONS[1]=tag[2]
	
			document.querySelector('.lacets .lacet.selected').classList.remove('selected');
			l = document.getElementById(tag[3]);
			l.classList.add('selected');
			OPTIONS[2]=tag[3]
	
		}
	
	
		for (let i = 0; i < capacity_btn_els.length; i++) {
			let btn = capacity_btn_els[i];
			btn.addEventListener('click', function () {
				document.querySelector('.capacity .modele.selected').classList.remove('selected');
				this.classList.add('selected');
				console.log(this)
				image_el.src = "..//Images/ImagesChaussures/m" + this.dataset.name + OPTIONS[1] + OPTIONS[2] + '.png';
				const MOD = this.dataset.name
				OPTIONS[0]=MOD
			});
		}
	
		for (let i = 0; i < colour_btn_els.length; i++) {
			let btn = colour_btn_els[i];
			btn.addEventListener('click', function () {
				document.querySelector('.colours .colour.selected').classList.remove('selected');
				this.classList.add('selected');
				image_el.src = "..//Images/ImagesChaussures/m"+ OPTIONS[0] + this.dataset.name + '.png';
				const COL = this.dataset.name
				OPTIONS[1]=COL
			});
		}
	
		for (let i = 0; i < lacet_btn_els.length; i++) {
			let btn = lacet_btn_els[i];
			btn.addEventListener('click', function () {
				document.querySelector('.lacets .lacet.selected').classList.remove('selected');
				this.classList.add('selected');
				image_el.src = "..//Images/ImagesChaussures/m"+ OPTIONS[0]+ OPTIONS[1] + this.dataset.name + '.png';
				const LAC = this.dataset.name
				OPTIONS[2]=LAC
			});
		}
	
		//Taille Option
			var x, i, j, l, ll, selElmnt, a, b, c;
		/*look for any elements with the class "custom-select":*/
		x = document.getElementsByClassName("custom-select");
		l = x.length;
		for (i = 0; i < l; i++) {
		selElmnt = x[i].getElementsByTagName("select")[0];
		ll = selElmnt.length;
		/*for each element, create a new DIV that will act as the selected item:*/
		a = document.createElement("DIV");
		a.setAttribute("class", "select-selected");
		a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
		x[i].appendChild(a);
		/*for each element, create a new DIV that will contain the option list:*/
		b = document.createElement("DIV");
		b.setAttribute("class", "select-items select-hide");
		for (j = 1; j < ll; j++) {
			/*for each option in the original select element,
			create a new DIV that will act as an option item:*/
			c = document.createElement("DIV");
			c.innerHTML = selElmnt.options[j].innerHTML;
			c.addEventListener("click", function(e) {
				/*when an item is clicked, update the original select box,
				and the selected item:*/
				var y, i, k, s, h, sl, yl;
				s = this.parentNode.parentNode.getElementsByTagName("select")[0];
				sl = s.length;
				h = this.parentNode.previousSibling;
				for (i = 0; i < sl; i++) {
				if (s.options[i].innerHTML == this.innerHTML) {
					s.selectedIndex = i;
					h.innerHTML = this.innerHTML;
					y = this.parentNode.getElementsByClassName("same-as-selected");
					yl = y.length;
					for (k = 0; k < yl; k++) {
					y[k].removeAttribute("class");
					}
					this.setAttribute("class", "same-as-selected");
					break;
				}
				}
				const SZ = i;
				OPTIONS[3]=SZ;
				h.click();
			});
			b.appendChild(c);
		}
		x[i].appendChild(b);
		a.addEventListener("click", function(e) {
			/*when the select box is clicked, close any other select boxes,
			and open/close the current select box:*/
			e.stopPropagation();
			closeAllSelect(this);
			this.nextSibling.classList.toggle("select-hide");
			this.classList.toggle("select-arrow-active");
			});
		}
		function closeAllSelect(elmnt) {
		/*a function that will close all select boxes in the document,
		except the current select box:*/
		var x, y, i, xl, yl, arrNo = [];
		x = document.getElementsByClassName("select-items");
		y = document.getElementsByClassName("select-selected"); 
		xl = x.length;
		yl = y.length;
		for (i = 0; i < yl; i++) {
			if (elmnt == y[i]) {
			arrNo.push(i)
			} else {
			y[i].classList.remove("select-arrow-active");
			}
		}
		for (i = 0; i < xl; i++) {
			if (arrNo.indexOf(i)) {
			x[i].classList.add("select-hide");
			}
		}
		}
		/*if the user clicks anywhere outside the select box,
		then close all select boxes:*/
		document.addEventListener("click", closeAllSelect);
	
		document.getElementById("submit").addEventListener('click', function () {
			panier[0]=OPTIONS;
			console.log(OPTIONS)
		});
	}
}

//Gestion du panier
let carts = document.querySelectorAll('.submit');

const url="../JS/data.json";
const xhr = new XMLHttpRequest();

//Ajout des produits dans le panier
for (let i=0; i<carts.length; i++) {
	carts[i].addEventListener('click', () => {
		id='m' + OPTIONS[0] + OPTIONS[1] + OPTIONS[2];
		xhr.onload = async function() {
			const database = JSON.parse(this.responseText);
			cartNumbers(database[id]);
			totalCost(database[id]);
		};
		xhr.open('get',"../JS/data.json");
		xhr.send();
	})
}

function onLoadCartNumbers() {
	let productNumbers = localStorage.getItem('cartNumbers');
	if(productNumbers){
		document.querySelector('.cart span').textContent = productNumbers;
	}
}

//Fonction permettant d'avoir le nombre de produits ajoutés au panier via le localstorage et le modifier dans la navbar
function cartNumbers(product) {
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);
	if ( productNumbers ){
		localStorage.setItem('cartNumbers', productNumbers + 1);
		document.querySelector('.cart span').textContent = productNumbers +1 ;
	} else {
		localStorage.setItem('cartNumbers', 1);
		document.querySelector('.cart span').textContent = 1;
	}
	setItem(product);
}

function lessCartNumbers(product) {
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);
	if ( productNumbers ){
		localStorage.setItem('cartNumbers', productNumbers - 1);
		document.querySelector('.cart span').textContent = productNumbers -1 ;
	} else {
		localStorage.setItem('cartNumbers', 1);
		document.querySelector('.cart span').textContent = 1;
	}
	lessProduct(product);
}

function moreCartNumbers(product) {
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);
	if ( productNumbers ){
		localStorage.setItem('cartNumbers', productNumbers + 1);
		document.querySelector('.cart span').textContent = productNumbers +1 ;
	} else {
		localStorage.setItem('cartNumbers', 1);
		document.querySelector('.cart span').textContent = 1;
	}
	moreProduct(product);
}

function removeCartNumbers(product,N) {
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);
	localStorage.setItem('cartNumbers', productNumbers - N);
	document.querySelector('.cart span').textContent = productNumbers - N ;
	removeProduct(product);
}

//Fonction permettant de savoir quels produits ont été ajouté au panier via le localstorage et leur quantité
function setItem(product) {
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	if (cartItems != null) {
		if (cartItems[product.tag] == undefined) {
			cartItems = {
				...cartItems,
				[product.tag]: product
			}
		}
		cartItems[product.tag].incart += 1;
	} else {
		product.incart = 1;
		cartItems= {
			[product.tag]: product
		}
	}
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
	let cartCost = localStorage.getItem('totalCost');
	if ( cartCost != null){
		cartCost = parseInt(cartCost);
		localStorage.setItem('totalCost', cartCost + product.price);
	} else {
		localStorage.setItem('totalCost', product.price);
	}
}

function lessTotalCost(product) {
	let cartCost = localStorage.getItem('totalCost');
	if ( cartCost != null){
		cartCost = parseInt(cartCost);
		localStorage.setItem('totalCost', cartCost - product.price);
		console.log("yo");
	} else {
		localStorage.setItem('totalCost', product.price);
	}
}

function moreTotalCost(product) {
	let cartCost = localStorage.getItem('totalCost');
	if ( cartCost != null){
		cartCost = parseInt(cartCost);
		localStorage.setItem('totalCost', cartCost + product.price);
	} else {
		localStorage.setItem('totalCost', product.price);
	}
}

function removeTotalCost(product) {
	let cartCost = localStorage.getItem('totalCost');
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	cartCost = parseInt(cartCost);
	localStorage.setItem('totalCost', cartCost - product.price * cartItems[product.tag].incart);
}

function displayCart() {
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let ProductResume = document.querySelector(".CartInfo");
	let TotalPrice = document.querySelector(".TotalPrice");
	let cartCost = localStorage.getItem("totalCost");
	if (cartItems && ProductResume) {
		ProductResume.innerHTML='';
		Object.values(cartItems).map(item => {
			if (item.incart != 0) {
				ProductResume.innerHTML += `
				<div class="Products">
					<div class="Panier Info">
						<img class="ProductImage" src="..//Images/ImagesChaussures/${item.tag}.png"></img>
					</div>
					<div class="Price Info">
						<span>${item.price},00€<span>
					</div>
					<div class="Quantity Info">
						<div class="less"  id="${item.tag}">
							<ion-icon class="less" name="arrow-back-circle-outline"></ion-icon>
						</div>
						<div>
							<span>${item.incart}<span>
						</div>
						<div class="more"  id="${item.tag}">
							<ion-icon name="arrow-forward-circle-outline"></ion-icon>
						</div>
					</div>
					<div class="TotalPriceItem Info">
						<span>${item.price*item.incart},00€<span>
					</div>
					<div class="Remove Infos"  id="${item.tag}">
						<ion-icon name="close-circle-outline"></ion-icon>
					</div>
				<div>
				`
			}
		})
		TotalPrice.innerHTML=''
		TotalPrice.innerHTML += `
		<div class="SubTotal" style="
			display: flex;
			width: 200px;
			flex-direction: row;
			justify-content: space-around;
			">
			<div class="price title">
				Prix
			</div>
			<div class="TotalPrix">
				<span>${cartCost},00€<span>
			</div>
		<div>
		`
	}

	let less = document.querySelectorAll('.less');

	for (let i=0; i<less.length; i++) {
		less[i].addEventListener('click', () => {
			//Récupération de l'id de l'élément à modifier
			var id = document.getElementsByClassName("less")[i].id;
			console.log("cc")

			//Récupération de l'objet concerné
			xhr.onload = async function() {
				const database = JSON.parse(this.responseText);
				lessCartNumbers(database[id]);
				lessTotalCost(database[id]);
				displayCart();
			};
			xhr.open('get',"../JS/data.json");
			xhr.send();
		})
	}

	let more = document.querySelectorAll('.more');

	for (let i=0; i<more.length; i++) {
		more[i].addEventListener('click', () => {
			//Récupération de l'id de l'élément à modifier
			var id = document.getElementsByClassName("more")[i].id;

			//Récupération de l'objet concerné
			xhr.onload = async function() {
				const database = JSON.parse(this.responseText);
				moreCartNumbers(database[id]);
				moreTotalCost(database[id]);
				displayCart();
			};
			xhr.open('get',"../JS/data.json");
			xhr.send();
			
		})
	}

	let remove = document.querySelectorAll('.Remove');

	for (let i=0; i<remove.length; i++) {
		remove[i].addEventListener('click', () => {
			//Récupération de l'id de l'élément à modifier
			var id = document.getElementsByClassName("Remove")[i].id;

			//Récupération de l'objet concerné
			xhr.onload = async function() {
				const database = JSON.parse(this.responseText);
				let cartItems = localStorage.getItem("productsInCart");
				cartItems = JSON.parse(cartItems);
				let N= cartItems[database[id].tag].incart;
				removeTotalCost(database[id]);
				removeCartNumbers(database[id],N);
				displayCart();
			};
			xhr.open('get',"../JS/data.json");
			xhr.send();
			displayCart();
		})
	}

}

//Fonction gérant l'ajout de produit via la flèche "more" du panier
function moreProduct(product) {
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	if (cartItems != null) {
		if (cartItems[product.tag] == undefined) {
			cartItems = {
				...cartItems,
				[product.tag]: product
			}
		}
		cartItems[product.tag].incart += 1;
	} else {
		product.incart = 1;
		cartItems= {
			[product.tag]: product
		}
	}
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
//Fonction gérant la suppression d'un produit via la flèche "less" du panier
function lessProduct(product) {
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	if (cartItems != null) {
		if (cartItems[product.tag] == undefined) {
			cartItems = {
				...cartItems,
				[product.tag]: product
			}
		}
		cartItems[product.tag].incart -= 1;
	} else {
		product.incart = 1;
		cartItems= {
			[product.tag]: product
		}
	}
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function removeProduct(product) {
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	if (cartItems != null) {
		if (cartItems[product.tag] == undefined) {
			cartItems = {
				...cartItems,
				[product.tag]: product
			}
		}
		cartItems[product.tag].incart = 0;
	} else {
		product.incart = 0;
		cartItems= {
			[product.tag]: product
		}
	}
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}


displayCart();

//Fonctionnement boutons du panier
let Shop = document.querySelectorAll('.BackToShopping');
let Order = document.querySelectorAll('.Order');

//Retour à la page de personnalisation
for (let i=0; i<Shop.length; i++) {
	Shop[i].addEventListener('click', () => {
		window.location.href = "perso.html"
	})
}

//Lien vers la page de finalisation de la commande (form)
for (let i=0; i<Order.length; i++) {
	Order[i].addEventListener('click', () => {
		window.location.href = "panierform.html"
	})
}

//Fonction permettant l'affichage aléatoire de tous les items contenus dans la base de donné JSON

function displayGrid(filter) {
	let GridItem = document.querySelector(".grid");
	xhr.onload = async function() {
		const database = JSON.parse(this.responseText);
		dataTag=[];

		const n0 = filter[0].length;
		const n1 = filter[1].length;
		const n2 = filter[2].length;
		console.log(n0,n1,n2)
		

		if ( n0 == 0 & n1 == 0 & n2 == 0) {
			for (var key in database) {
				if (key != 'opt1' && key != 'opt2') {
					dataTag.push(key);
				}
			}
		} else {
			for (var key in database) {
				var verif = 0;
				var verifinal = 3;

				if ( filter[0].length != 0 ) {
					for (let i = 0; i<filter[0].length; i++) {
						if (database[key].name == filter[0][i]) {
							verif += 1;
						}
					}
				} else {
					verifinal -= 1;
				}

				if ( filter[1].length != 0 ) {
					for (let i = 0; i<filter[1].length; i++) {
						if (database[key].color_name == filter[1][i]) {
							verif += 1;
						}
					}
				} else {
					verifinal -= 1;
				}

				if ( filter[2].length != 0 ) {
					for (let i = 0; i<filter[2].length; i++) {
						if (database[key].laces == filter[2][i]) {
							verif += 1;
						}
					}
				} else {
					verifinal -= 1;
				}

				if (verif == verifinal) {
					dataTag.push(key);
				}
			}
		}

		const N = dataTag.length;
		var q = Math.floor(N/3);
		var r = N % 3;
		GridItem.innerHTML = ``;
		for (let i = 0; i<q; i++) {
			let count = i*3;
			GridItem.innerHTML += `
			<div class="ligne" style="
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				text-align: center;
				align-items: center;
				width: 1000px;
				margin-top: 5%;
				margin-right: 6%;
			">
				<div class="column">
					<div class="card" style="width: 300px;height: 300px;border-radius: 20%;">
						<div class="img">
							<a href="perso.html?id=${dataTag[count]}"><img class="ProductImage" src="../Images/ImagesChaussures/${dataTag[count]}.png" style="width: 200px;"></img></a>
						</div>
						<h3>${database[dataTag[count]].name}</h3>
						<p>${database[dataTag[count]].price},00€</p>
					</div>
				</div>

				<div class="column">
					<div class="card" style="width: 300px;height: 300px;border-radius: 20%;">
						<div class="img">
							<a href="perso.html?id=${dataTag[count+1]}"><img class="ProductImage" src="../Images/ImagesChaussures/${dataTag[count+1]}.png" style="width: 200px;"></img></a>
						</div>
						<h3>${database[dataTag[count+1]].name}</h3>
						<p>${database[dataTag[count+1]].price},00€</p>
					</div>
				</div>

				<div class="column">
					<div class="card" style="width: 300px;height: 300px;border-radius: 20%;">
						<div class="img">
							<a href="perso.html?id=${dataTag[count+2]}"><img class="ProductImage" src="../Images/ImagesChaussures/${dataTag[count+2]}.png" style="width: 200px;"></img></a>
						</div>
						<h3>${database[dataTag[count+2]].name}</h3>
						<p>${database[dataTag[count+2]].price},00€</p>
					</div>
				</div>

			</div>
			</div>
			`
		}
		if ( r==1 ) {
			GridItem.innerHTML += `
			<div class="ligne" style="
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				text-align: center;
				align-items: center;
				width: 1000px;
				margin-top: 5%;
				margin-right: 6%;
				margin-bottom: 5%;
			">
				<div class="column">
					<div class="card" style="width: 300px;height: 300px;border-radius: 20%;">
						<div class="img">
							<a href="perso.html?id=${dataTag[q*3]}"><img class="ProductImage" src="../Images/ImagesChaussures/${dataTag[q*3]}.png" style="width: 200px;"></img></a>
						</div>
						<h3>${database[dataTag[q*3]].name}</h3>
						<p>${database[dataTag[q*3]].price},00€</p>
					</div>
				</div>

				<div class="column">
					<div class="transp" style="width: 300px;height: 300px;border-radius: 20%;">
					</div>
				</div>

				<div class="column">
					<div class="transp" style="width: 300px;height: 300px;border-radius: 20%;">
					</div>
				</div>

			</div>
			</div>
			`
		}
		if (r==2) {
			GridItem.innerHTML += `
			<div class="ligne" style="
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				text-align: center;
				align-items: center;
				width: 1000px;
				margin-top: 5%;
				margin-right: 6%;
				margin-bottom: 5%;
			">
				<div class="column">
					<div class="card" style="width: 300px;height: 300px;border-radius: 20%;">
						<div class="img">
							<a href="perso.html?id=${dataTag[q*3]}"><img class="ProductImage" src="../Images/ImagesChaussures/${dataTag[q*3]}.png" style="width: 200px;"></img></a>
						</div>
						<h3>${database[dataTag[q*3]].name}</h3>
						<p>${database[dataTag[q*3]].price},00€</p>
					</div>
				</div>

				<div class="column">
					<div class="card" style="width: 300px;height: 300px;border-radius: 20%;">
						<div class="img">
							<a href="perso.html?id=${dataTag[q*3+1]}"><img class="ProductImage" src="../Images/ImagesChaussures/${dataTag[q*3+1]}.png" style="width: 200px;"></img></a>
						</div>
						<h3>${database[dataTag[q*3+1]].name}</h3>
						<p>${database[dataTag[q*3+1]].price},00€</p>
					</div>
				</div>

				<div class="column">
					<div class="transp" style="width: 300px;height: 300px;border-radius: 20%;">
					</div>
				</div>

			</div>
			</div>
			`
		}
	};
	xhr.open('get',"../JS/data.json");
	xhr.send();
}
//Mise en place du footer dynamique
function displayFooter() {
	let myFooter = document.querySelector(".footer");
	myFooter.innerHTML += `
	<div class="logolien2">
		<a href="index.html">
		<img class="LogoFooter" src="../Images/Logo2blanc.png" alt="logo">
		</a>
  	</div>
  	<div class="column" style="background-color: transparent;">
		<h3 class="TitreFooter">Contactez nous</h3><br>
		<p class="adresse">Le Sneakers Lab<br>45 rue des Pommiers<br>Villeurbanne 69100</p><br>
		<div class="click">
			<a class="adresse" href="tel:330642123456">Tel: 33 (0)6 42 12 34 56</a><br>
			<a class="adresse" href="mailto:lelabosneakers@cpe.fr?subject=Renseignement">Mail: lelabosneakers@cpe.fr</a>
		</div>
  	</div>
	<div class="Social">
		<a href="#" class="fa fa-facebook"></a>
		<a href="#" class="fa fa-instagram"></a>
		<a href="#" class="fa fa-twitter"></a>
	</div>
	`
}

//Mise en place du header dynamique
function displayHeader() {
	let myHeader = document.querySelector(".dashboard");
	myHeader.innerHTML += `
	<nav>
		<ul class="nav__links">
			<li><a href="index.html">Accueil</a></li>
			<li><a href="contact.html">Contact</a></li>
			<li><a href="perso.html">Personnalisation</a></li>
			<li class='cart'>
				<a href="panier.html">
					<div class='cartnb'>
						<div class='logocart'>
							<ion-icon name="cart-outline"></ion-icon>
						</div>
						<div>
							<span>0</span>
						</div>             
					</div>
				</a>
			</li>
		</ul>
	</nav>
	<div class="logolien">
		<a href="index.html">
			<img class="logo1" src="../Images/Logo2blanc.png" alt="logo">
		</a>
	</div>
	`
	onLoadCartNumbers();

}

displayHeader();
displayFooter();

function backToTop(){
	let top = document.querySelector(".topBtn");
	top.innerHTML += `
	<a href="#" class="to-top">
		<ion-icon name="arrow-up-outline"></ion-icon>
  	</a>
	`
	const toTop = document.querySelector(".to-top");
	window.addEventListener("scroll", () => {
	if (window.pageYOffset > 100) {
		toTop.classList.add("active");
	} else {
		toTop.classList.remove("active");
	}
	})
}

backToTop();

//Gestion des Options
function displayOpt(){
	const xhr2 = new XMLHttpRequest();
	let opt = document.querySelector(".Options");
	xhr2.onload = async function() {
		const database = JSON.parse(this.responseText);
		var OptTag=[]
		for (var key in database) {
			OptTag.push(key);
		}
		const N = OptTag.length;
		for (let i = 0; i<N; i++) {
			opt.innerHTML += `
			<div class="Opt">
				<div class="Panier Info">
					<div class="SprayLegend">${database[OptTag[i]].name}</div>
				</div>
				<div class="Price Info">
					<span>${database[OptTag[i]].price},00€<span>
				</div>
				<div class="Quantity Info">
					<div class="moreOpt"  id="${database[OptTag[i]].tag}">
						<ion-icon name="add-circle-outline"></ion-icon>
					</div>
				</div>
				<div class="TotalPriceItem Info">
				</div>
				<div class="Remove Infos"  id="${database[OptTag[i]].tag}">
				</div>
			<div>
			`
		}

		let moreOpt = document.querySelectorAll('.moreOpt');
		for (let i=0; i<moreOpt.length; i++) {
			moreOpt[i].addEventListener('click', () => {
				//Récupération de l'id de l'élément à modifier
				var id = document.getElementsByClassName("moreOpt")[i].id;
				console.log("more opt");
				//Récupération de l'objet concerné
				xhr.onload = async function() {
					const database = JSON.parse(this.responseText);
					moreCartNumbers(database[id]);
					moreTotalCost(database[id]);
					displayCart();
				};
				xhr.open('get',"../JS/options.json");
				xhr.send();
			})
		}
	}
	xhr2.open('get',"../JS/options.json");
	xhr2.send();
}

//Appel des fonctions dès le chargement de la page
if ( window.location.pathname == "/panier.html" ) {
	displayOpt();
}

if ( window.location.pathname == "/panierform.html" ) {
	formulaire();
}

if ( window.location.pathname == "/index.html" ) {
	displayFiltre();
}


//Gestion des champs obligatoires :
function formulaire() {
	//On recupère l'id du formulaire
	document.getElementById('form').addEventListener("submit",function(e) {
		var erreur;
		var nom = document.getElementById("nom");
		var prénom = document.getElementById("prénom");
		var email = document.getElementById("email");
		var tel = document.getElementById("tel");
		var adresse = document.getElementById("adresse");
		var dateL = document.getElementById("dateL");
		var numCB = document.getElementById("numCB");
		var expiration = document.getElementById("expiration");
		var cvc = document.getElementById("cvc");

		
		if (!cvc.value) {
			erreur = "Veuillez renseigner le numéro CVC!";
		}
		if (!expiration.value) {
			erreur="Veuillez renseigner la date d'expiration de votre carte banquaire";
		}
		if (!numCB.value) {
			erreur="Veuillez renseigner un numéro de carte banquaire"
		}
		if (!dateL.value) {
			erreur="Veuillez renseigner une date de livraison"
		}
		if (!adresse.value) {
			erreur="Veuillez renseigner une adresse de livraison"
		}
		if (!tel.value) {
			erreur="Veuillez renseigner un numéro de téléphone"
		}
		if (!email.value) {
			erreur="Veuillez renseigner un email"
		}
		if (!prénom.value) {
			erreur="Veuillez renseigner un prénom"
		}
		if (!nom.value) {
			erreur="Veuillez renseigner un nom"
		}

		if (erreur) {
			e.preventDefault();
			document.getElementById("erreur").innerHTML= erreur;
			return false;
		} else {
			alert("Merci pour votre commande!");
		}

	} );
}

//Gestion du filtre

if ( window.location.pathname == "/index.html" ) {

	Filtre([[],[],[]]);

	document.getElementById("delete").addEventListener('click', function () {
		Filtre([[],[],[]]);
	});

	window.onload = function () {
		var OPTIONS2 = ["","","",""];
		const colour_btn_els = document.querySelectorAll('.colours .colour');
		const lacet_btn_els = document.querySelectorAll('.lacets .lacet');
		const capacity_btn_els = document.querySelectorAll('.capacity .modele');
		const image_el = document.querySelector('.imagery .image');
	
		for (let i = 0; i < capacity_btn_els.length; i++) {
			let btn = capacity_btn_els[i];
			btn.addEventListener('click', function () {
				document.querySelector('.capacity .modele.selected').classList.remove('selected');
				this.classList.add('selected');
				const MOD = this.dataset.name;
				OPTIONS2[0]=MOD;
			});
		}
	
		for (let i = 0; i < colour_btn_els.length; i++) {
			let btn = colour_btn_els[i];
			btn.addEventListener('click', function () {
				document.querySelector('.colours .colour.selected').classList.remove('selected');
				this.classList.add('selected');
				const COL = this.dataset.name;
				OPTIONS2[1]=COL;
			});
		}
	
		for (let i = 0; i < lacet_btn_els.length; i++) {
			let btn = lacet_btn_els[i];
			btn.addEventListener('click', function () {
				document.querySelector('.lacets .lacet.selected').classList.remove('selected');
				this.classList.add('selected');
				const LAC = this.dataset.name;
				OPTIONS2[2]=LAC;
			});
		}

		document.getElementById("filter").addEventListener('click', function () {
			Filtre(OPTIONS2);
		});
	}
}

function Filtre(toFilter) {
	filter=[[],[],[]]

	if (toFilter[0]==1) {
		filter[0][0]='Skate 2'
	} else if (toFilter[0]==2) {
		filter[0][0]='Air 1'
	} else if (toFilter[0]==3) {
		filter[0][0]='Jump 5'
	} else if (toFilter[0]==4) {
		filter[0][0]='Class G'
	}

	if (toFilter[1]=='b') {
		filter[1][0]='blue'
	} else if (toFilter[1]=='g') {
		filter[1][0]='green'
	} else if (toFilter[1]=='o') {
		filter[1][0]='orange'
	} else if (toFilter[1]=='r') {
		filter[1][0]='red'
	}

	if (toFilter[2]=='B') {
		filter[2][0]='blanc'
	} else if (toFilter[2]=='C') {
		filter[2][0]='cyan'
	} else if (toFilter[2]=='J') {
		filter[2][0]='jaune'
	} else if (toFilter[2]=='V') {
		filter[2][0]='violet'
	}

	displayGrid(filter);
}

function displayFiltre() {
	let GridItem = document.querySelector(".filtre");
	GridItem.innerHTML += `	
	<div class="filter">
		<div class="ModeleOptions">
			<div class="TitreOptions">
				Modèle
			</div>
			<div class="capacity btn_grid">
				<div class="btn_wrap">
					<button type="button" class="modele selected" id="1" data-name="1">
					SKATE 2
					</button>
				</div>
				<div class="btn_wrap">
					<button type="button" class="modele" id="2" data-name="2">
					AIR 1
					</button>
				</div>
				<div class="btn_wrap">
					<button type="button" class="modele" id="3" data-name="3">
					JUMP 5
					</button>
				</div>
					<div class="btn_wrap">
					<button type="button" class="modele" id="4" data-name="4">
					CLASS G
					</button>
				</div>
				</div>
			</div>
		<div class="ColourOptions">
			<div class="TitreOptions">
				Couleur
			</div>
			<div class="colours btn_grid">
			<div class="btn_wrap">
				<button type="button" class="colour blue selected" id='b' data-name="b" data-colour="#38B4D7">
				Bleu
				</button>
			</div>
			<div class="btn_wrap">
				<button type="button" class="colour red" id='r' data-name="r" data-colour="#DE5C47">
				Rouge
				</button>
			</div>
			<div class="btn_wrap">
				<button type="button" class="colour orange" id='o' data-name="o" data-colour="#FF9648">
				Orange
				</button>
			</div>
			<div class="btn_wrap">
				<button type="button" class="colour green" id='g' data-name="g" data-colour="#92C266">
				Vert
				</button>
			</div>
			</div>
		</div>
		<div class="LacetOptions">
			<div class="TitreOptions">
			Lacets
			</div>
			<div class="lacets btn_grid">
			<div class="btn_wrap">
				<button type="button" class="lacet blanc selected" id='B' data-name="B" data-colour="#FAFAFA">
				BLANC
				</button>
			</div>
			<div class="btn_wrap">
				<button type="button" class="lacet cyan" id='C' data-name="C" data-colour="#59A1D9">
				CYAN
				</button>
			</div>
			<div class="btn_wrap">
				<button type="button" class="lacet jaune" id='J' data-name="J" data-colour="#FCC10A">
				JAUNE
				</button>
			</div>
			<div class="btn_wrap">
				<button type="button" class="lacet violet" id='V' data-name="V" data-colour="#CE89BA">
				VIOLET
				</button>
			</div>
			</div>
		</div>
		<div class="filter">
			<button type="submit" class="filter" id="filter">Filtrer</button>
			<button type="submit" class="delete" id="delete">Effacer</button>
		</div>
		  
	</div>
	`
}