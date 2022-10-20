const config = {
	initialPage: document.getElementById("initialPage"),
	mainPage: document.getElementById("mainPage"),
	sidePage: document.getElementById("sidePage")
};

class UserInfo {
	constructor(userName) {
		this.userName = userName;
		this.haveBurgers = 0;
		this.haveMoney = 50000;
		this.pastDays = 0;
		this.age = 20;
		this.purchaseItems = {}
	}
}

class Items {
	constructor(imgUrl, imgName, cost, profit, maxPurchase) {
		this.imgUrl = imgUrl;
		this.imgName = imgName;
		this.cost = cost;
		this.profit = profit;
		this.maxPurchase = maxPurchase
	}
}

// 購入できるアイテムの生成
let itemsInstance = [
	new Items("img/flipMachine.webp", "Flip machine", 15000, 25, 500),
	new Items("img/etf.webp", "ETF Stock", 300000, 0.1, "infinite"),
	new Items("img/etf.webp", "ETF Bonds", 300000, 0.07, "infinite")
];

// アイテムの名前から利益を返すための関数
function getItemProfit(itemName) {
	for (let i = 0; i < itemsInstance.length; i++) {
		if (itemName === itemsInstance[i].imgName) {
			return itemsInstance[i].profit;
		}
	}
	return None;
}

// ログインページ作成のための関数
function createInitialPage() {
	let container = document.createElement("div");
	container.classList.add("vh-100", "d-flex", "justify-content-center", "align-items-center");
	container.innerHTML =
	`
		<div class="bg-white text-ceter">
			<h2 class="p-3">Clicker Empire Game</h2>
			<form>
				<div class="form-row p-3">
					<div class="col">
						<input type="name" class="form-control" placeholder="Your Name" id="userName">
					<div>
				</div>
			</form>
		<div class="d-flex justify-content-between p-3">
			<div class="col-6">
				<button type="submit" class="btn btn-primary col-12" id="newGame">New</button>
			</div>
			<div class="col-6">
				<button type="submit" class="btn btn-primary col-12" id="login">Login</button>
			</div>
		</div>
	`
	
	config.initialPage.append(container);
}

// メインページ作成のための関数
function createMainPage(user) {
	let container = '<div class="bg-dark">';
	container += 
	`
		<div class="vh-100 d-flex justify-content-center align-items-center text-white text-center">
			<div class="bg-primary d-flex justify-content-center">
				<div class="d-flex flex-column bg-dark m-2 col-3">
					<div class="bg-primary m-2">
						<h3 id="haveBurgers">${user.haveBurgers} Burgers</h3>
						<h5>one click ￥25</h5>
					</div>
					<input type="image" src="img/burger.webp" class="d-block m-auto img-size-burger" id="burgerClick">
					<button class="btn btn-primary mb-3 save-btn-font-size">save</button>
				</div>
				<div class="bg-dark m-2 col-8">
					<div class="d-flex justify-content-center">
						<div class="col-6 bg-primary m-1">
							<h5>${user.userName}</h5>
						</div>
						<div class="col-6 bg-primary m-1">
							<h5 id="age">${user.age} years old</h5>
						</div>
					</div>
					<div class="d-flex justify-content-center">
						<div class="col-6 bg-primary m-1">
							<h5 id="days">0days</h5>
						</div>
						<div class="col-6 bg-primary m-1">
							<h5 id="haveMoney">￥${user.haveMoney}</h5>
						</div>
					</div>
					<div class="overflow-scroll">
	`
	for (let i = 0; i < itemsInstance.length; i++) {
		container +=
		`
			<div class="d-flex div-items-size bg-primary m-2 hover" id=${i}>
				<img src=${itemsInstance[i].imgUrl} class="col img-size-items">
				<div class="col d-flex my-auto flex-column">
					<h3>${itemsInstance[i].imgName}</h3>
					<h5>￥${itemsInstance[i].cost}</h5>
				</div>
				<div class="col d-flex my-auto flex-column text-right">
					<h3 class="pull-right" id="${itemsInstance[i].imgName}">0</h3>
					<h5 class="text-warning">￥${itemsInstance[i].profit} /sec</h5>
				</div>
			</div>
		`
	}

	config.mainPage.innerHTML = container;

	for (let i = 0; i < itemsInstance.length; i++) {
		document.getElementById(i).addEventListener("click", function() {
			sidePageController(user, itemsInstance[i]);
		})
	}

	let bugerClick = document.getElementById("burgerClick");
	bugerClick.addEventListener("click", function() {
		user.haveBurgers += 1;
		document.getElementById("haveBurgers").innerHTML = user.haveBurgers + " Burgers";

		user.haveMoney += 25;
		document.getElementById("haveMoney").innerHTML = "￥" + user.haveMoney;
	});
}

// サイドページ作成のための関数
function createSidePage(user, item) {
	let container = '';
	container += 
	`
		<div class="bg-dark">
			<div class="vh-100 d-flex justify-content-center flex-column text-white text-center">
			<div class="bg-primary">
				<h2 class="p-4 font-weight-bold">Your Money: ￥${user.haveMoney}</h2>
				<div class="d-flex justify-content-center">
					<div class="d-flex flex-column">
						<h3 class="py-4">${item.imgName}</h3>
						<h5 class="py-3">Max purchases: ${item.maxPurchase}</h5>
						<h5 class="py-3">Price: ￥${item.cost}</h5>
						<h5 class="py-3">Get: ${item.profit}</h5>
					</div>
					<img src=${item.imgUrl} class="img-size-items">
				</div>
				<h5 class="py-3">How many would you like to buy?</h5>
				<input type="number" value="0" min="0" class="input-size" id="purchaseNum"></input>
				<h5 class="py-1" id="total">total: ￥0<h5>
				<div class="d-flex justify-content-center p-3">
					<div class="col-4">
						<button type="submit" class="btn btn-success col-12" id="backBtn">Go Back</button>
					</div>
					<div class="col-4">
						<button type="submit" class="btn btn-success col-12" id="purchaseBtn">Purchase</button>
					</div>
				</div>
			</div>
		</div>
	`
	
	config.sidePage.innerHTML = container;

	document.getElementById("backBtn").addEventListener("click", function() {
		displayNone(config.sidePage);
		displayBlock(config.mainPage);
	})

	let purchaseNum = document.getElementById("purchaseNum");
	purchaseNum.addEventListener("change", function() {
		total = item.cost * parseInt(purchaseNum.value);
		document.getElementById("total").innerHTML = `total ￥${total}`
	})

	let purchaseBtn = document.getElementById("purchaseBtn");
	purchaseBtn.addEventListener("click", function() {
		if (parseInt(purchaseNum.value) === 0) {
			alert("invalid value");
		}
		else if (total > user.haveMoney) {
			alert("money shortage");
		}
		else {
			tempNumUnitsPurchased = user.purchaseItems[item.imgName] + parseInt(purchaseNum.value);
			if (tempNumUnitsPurchased > item.maxPurchase) {
				alert("over max purchases");
			}
			else {
				user.haveMoney -= total;
				user.purchaseItems[item.imgName] += parseInt(purchaseNum.value);
				document.getElementById("haveMoney").innerHTML = `￥${user.haveMoney}`;
				document.getElementById(item.imgName).innerHTML = user.purchaseItems[item.imgName];
				displayNone(config.sidePage);
				displayBlock(config.mainPage);
			}
		}
	})
}

function displayNone(ele) {
	ele.classList.remove("d-block");
	ele.classList.add("d-none");
}

function displayBlock(ele) {
	ele.classList.remove("d-none");
	ele.classList.add("d-block");
}

function sidePageController(user, item) {
	displayNone(config.mainPage);
	displayBlock(config.sidePage);
	config.sidePage.innerHTML = "";
	createSidePage(user, item);
}

// 1秒ごとに情報を更新するための関数
function updateEverySecond(user) {
	document.getElementById("days").innerHTML = `${user.pastDays}days`

	if (user.pastDays > 365 && user.pastDays % 365 === 0) {
		user.age += 1;
		document.getElementById("age").innerHTML = `${user.age} years old`
	}

	let key = Object.keys(user.purchaseItems);
	for (let i = 0; i < key.length; i++) {
		user.haveMoney += getItemProfit(key[i]) * user.purchaseItems[key[i]];
	}
	document.getElementById("haveMoney").innerHTML = `￥${user.haveMoney}`
}

// ゲームスタートのための関数
function startGame() {
	createInitialPage();

	let newGame = document.getElementById("newGame");
	newGame.addEventListener("click", function() {
		let userName = document.getElementById("userName").value;
		if (userName === "") {
			alert("Please input your name")
		}
		else {
			let user = new UserInfo(userName);
			for (let i = 0; i < itemsInstance.length; i++) {
				user.purchaseItems[itemsInstance[i].imgName] = 0;
			}

			displayNone(config.initialPage);
			config.initialPage.innerHTML = "";
			createMainPage(user);
			displayBlock(config.mainPage);

			setInterval(function() {
				updateEverySecond(user);
				user.pastDays++;
			}, 1000);
		}
	})
}

// ゲームスタート
startGame();

