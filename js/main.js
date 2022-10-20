const config = {
	initialPage: document.getElementById("initialPage"),
	mainPage: document.getElementById("mainPage"),
	sidePage: document.getElementById("sidePage")
};

class UserInfo {
	constructor(userName) {
		this.userName = userName;
		this.haveBurgers = 0;
		this.burgerPrice = 25;
		this.haveMoney = 50000;
		this.pastDays = 0;
		this.age = 20;
		this.purchaseItems = {};
		this.etf = {
			"etfStock": 0,
			"etfBonds": 0
		}
	}
}

class Items {
	constructor(imgUrl, imgName, cost, profit, profitHtml, maxPurchase) {
		this.imgUrl = imgUrl;
		this.imgName = imgName;
		this.cost = cost;
		this.profit = profit;
		this.profitHtml = profitHtml;
		this.maxPurchase = maxPurchase
	}
}

// 購入できるアイテムの生成
let itemsInstance = [
	new Items("img/flipMachine.webp", "Flip machine", 15000, 25, "￥25 /click", 500),
	new Items("img/etf.webp", "ETF Stock", 300000, 0.1, "0.1% /sec", "infinite"),
	new Items("img/etf.webp", "ETF Bonds", 300000, 0.07, "0.07% /sec", "infinite"),
	new Items("img/lemonade.webp", "Lemonade Stand", 30000, 30, "￥30 /sec", 1000),
	new Items("img/iceCream.png", "Ice Cream Truck", 100000, 120, "￥120 /sec", 500),
	new Items("img/house.webp", "House", 20000000, 32000, "￥32000 /sec", 100),
	new Items("img/townHouse.webp", "TownHouse", 40000000, 64000, "￥64000 /sec", 100),
	new Items("img/mansion.webp", "Mansion", 250000000, 500000, "￥500000 /sec", 20),
	new Items("img/industrialSpace.webp", "Industrial Space", 1000000000, 2200000, "￥2200000 /sec", 10),
	new Items("img/hotel.png", "Hotel Skyscraper", 10000000000, 25000000, "￥25000000 /sec", 5),
	new Items("img/railway.webp", "Bullet-Speed Sky Railway", 10000000000000, 30000000000, "￥30000000000 /sec", 1)
];

// アイテムの名前から利益を返すための関数
function getItemProfit(itemName) {
	for (let i = 0; i < itemsInstance.length; i++) {
		if (itemName === itemsInstance[i].imgName) {
			return itemsInstance[i].profit;
		}
	}
	return null;
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
						<h5 id="burgerPrice">one click ￥${user.burgerPrice}</h5>
					</div>
					<input type="image" src="img/burger.webp" class="d-block m-auto img-size-burger" id="burgerClick">
					<button class="btn btn-primary mb-3 save-btn-font-size" id="saveBtn">Save</button>
					<button class="btn btn-primary mb-3 save-btn-font-size" id="deleteBtn">Delete</button>
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
					<h5 id="${itemsInstance[i].imgName}Cost">￥${itemsInstance[i].cost}</h5>
				</div>
				<div class="col d-flex my-auto flex-column text-right">
					<h3 class="pull-right" id="${itemsInstance[i].imgName}Purchase">${user.purchaseItems[itemsInstance[i].imgName]}</h3>
					<h5 class="text-warning">${itemsInstance[i].profitHtml}</h5>
				</div>
			</div>
		`
	}

	config.mainPage.innerHTML = container;

	// 購入アイテムがクリックされた時のイベント処理
	for (let i = 0; i < itemsInstance.length; i++) {
		document.getElementById(i).addEventListener("click", function() {
			sidePageController(user, itemsInstance[i]);
		})
	}

	// ハンバーガーがクリックされた時のイベント処理
	let bugerClick = document.getElementById("burgerClick");
	bugerClick.addEventListener("click", function() {
		user.haveBurgers += 1;
		document.getElementById("haveBurgers").innerHTML = user.haveBurgers + " Burgers";

		user.haveMoney += user.burgerPrice;
		document.getElementById("haveMoney").innerHTML = "￥" + user.haveMoney;
	});

	// Saveボタンがクリックされた時のイベント処理
	let saveBtn = document.getElementById("saveBtn");
	saveBtn.addEventListener("click", function() {
		// ユーザ情報をJSONにエンコード
		let userJsonEncoded = JSON.stringify(user);

		// localStrageを使ってユーザーのブラウザ上にデータを保存
		localStorage.setItem(user.userName, userJsonEncoded);

		displayNone(config.mainPage);
		config.mainPage.innerHTML = "";
		createInitialPage();
		displayBlock(config.initialPage);
	});

	// Daleteボタンがクリックされた時のイベント処理
	let deleteBtn = document.getElementById("deleteBtn");
	deleteBtn.addEventListener("click", function() {
		let userData = localStorage.getItem(user.userName);
		if (userData === null) {
			alert("no data in local storage");
		} 
		else {
			localStorage.removeItem(user.userName);
			displayNone(config.mainPage);
			config.mainPage.innerHTML = "";
			createInitialPage();
			displayBlock(config.initialPage);
		}
	})
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
						<h5 class="py-3">Get: ${item.profitHtml}</h5>
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

	// Go Backボタンが押された時のイベント処理
	document.getElementById("backBtn").addEventListener("click", function() {
		displayNone(config.sidePage);
		displayBlock(config.mainPage);
	})

	// アイテム購入数が変更された時のイベント処理
	let purchaseNum = document.getElementById("purchaseNum");
	let total = 0;
	purchaseNum.addEventListener("change", function() {
		let etfRate = 1;
		if (item.imgName === "ETF Stock") {
			let etfTotalRate = 0;
			for (let i = 0; i < parseInt(purchaseNum.value); i++) {
				etfTotalRate += etfRate
				etfRate *= 1.1;
			}
			total = Math.floor(item.cost * etfTotalRate);
			document.getElementById("total").innerHTML = `total ￥${total}`;
		}
		else {
			total = item.cost * parseInt(purchaseNum.value);
			document.getElementById("total").innerHTML = `total ￥${total}`
			console.log(2);
		}
	})

	// Purchaseボタンが押された時のイベント処理
	let purchaseBtn = document.getElementById("purchaseBtn");
	purchaseBtn.addEventListener("click", function() {
		// 購入数が０ならアラート
		if (parseInt(purchaseNum.value) === 0) {
			alert("invalid value");
		}
		// 購入金額が所持金より多ければアラート
		else if (total > user.haveMoney) {
			alert("money shortage");
		}
		else {
			tempNumUnitsPurchased = user.purchaseItems[item.imgName] + parseInt(purchaseNum.value);
			itemMaxPurchase = item.maxPurchase;
			// アイテムの最大購入数が無限のものは、intの最大値に置換
			if (itemMaxPurchase === "infinite") {
				itemMaxPurchase = Number.MAX_SAFE_INTEGER;
			}

			// アイテムの最大購入数より多ければアラート
			if (tempNumUnitsPurchased > itemMaxPurchase) {
				alert("over max purchases");
			}
			else {
				user.haveMoney -= total;
				user.purchaseItems[item.imgName] += parseInt(purchaseNum.value);
				document.getElementById("haveMoney").innerHTML = `￥${user.haveMoney}`;
				document.getElementById(item.imgName+"Purchase").innerHTML = user.purchaseItems[item.imgName];
				// Flip machineのときはバーガークリックで得られるお金を25円増やす
				if (item.imgName === "Flip machine") {
					user.burgerPrice += 25 * parseInt(purchaseNum.value);
					document.getElementById("burgerPrice").innerHTML = `one click ￥${user.burgerPrice}`;
				}
				// ETF Stockのときは購入個数に応じて値段を10%増やす
				if (item.imgName === "ETF Stock") {
					user.etf["etfStock"] += total;
					let etfRate = 1 * 1.1 ** purchaseNum.value;
					item.cost = Math.floor(item.cost * etfRate);
					document.getElementById(item.imgName+"Cost").innerHTML = `￥${item.cost}`;
				}
				if (item.imgName === "ETF Bonds") {
					user.etf["etfBonds"] += total;
				}
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

	// ユーザの年齢更新
	if (user.pastDays >= 365 && user.pastDays % 365 === 0) {
		user.age += 1;
		document.getElementById("age").innerHTML = `${user.age} years old`
	}

	// ユーザの所持金更新
	let key = Object.keys(user.purchaseItems);
	for (let i = 0; i < key.length; i++) {
		if (key[i] === "ETF Stock") {
			user.haveMoney += user.etf["etfStock"] * 0.1;
		}
		else if (key[i] === "ETF Bonds") {
			user.haveMoney += user.etf["etfBonds"] * 0.07;
		}
		else if (key[i] !== "Flip machine") {
			user.haveMoney += getItemProfit(key[i]) * user.purchaseItems[key[i]];
		}
	}
	document.getElementById("haveMoney").innerHTML = `￥${user.haveMoney}`
}

// ゲームスタートのための関数
function startGame() {
	// ログイン画面の作成
	createInitialPage();

	// newGameボタンが押された時のイベント処理
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

	// loginボタンが押された時のイベント処理
	let login = document.getElementById("login");
	login.addEventListener("click", function() {
		let userName = document.getElementById("userName").value;
		let userJsonEncoded = localStorage.getItem(userName);

		// localStrageにデータがない場合はアラート
		if (userJsonEncoded === null) {
			alert("your data is none");
		}
		else {
			// localStrageのJSONデータをデコード
			let userJsonDecoded = JSON.parse(userJsonEncoded);
			displayNone(config.initialPage);
			config.initialPage.innerHTML = "";
			createMainPage(userJsonDecoded);
			displayBlock(config.mainPage);

			setInterval(function() {
				updateEverySecond(userJsonDecoded);
				userJsonDecoded.pastDays++;
			}, 1000);
		}
	})
}

// ゲームスタート
startGame();