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
		this.age = 20;
	}
}

class Items {
	constructor(imgUrl, imgName, cost, numUnitsPurchased, profit, maxPurchase) {
		this.imgUrl = imgUrl;
		this.imgName = imgName;
		this.cost = cost;
		this.numUnitsPurchased = numUnitsPurchased;
		this.profit = profit;
		this.maxPurchase = maxPurchase
	}
}

let itemsInstance = [
	new Items("img/flipMachine.webp", "Flip machine", "￥15000", 0, "￥25/click", 500),
	new Items("img/etf.webp", "ETF Stock", "￥300000", 0, "￥0.1/sec", "infinite"),
	new Items("img/etf.webp", "ETF Bonds", "￥300000", 0, "￥0.07/sec", "infinite")
];

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
						<input type="text" class="form-control" placeholder="Your Name">
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
	
	return config.initialPage.append(container);
}

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
				</div>
				<div class="bg-dark m-2 col-8">
					<div class="d-flex justify-content-center">
						<div class="col-6 bg-primary m-1">
							<h5>${user.userName}</h5>
						</div>
						<div class="col-6 bg-primary m-1">
							<h5>${user.age} years old</h5>
						</div>
					</div>
					<div class="d-flex justify-content-center">
						<div class="col-6 bg-primary m-1">
							<h5>days</h5>
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
					<h5>${itemsInstance[i].cost}</h5>
				</div>
				<div class="col d-flex my-auto flex-column text-right">
					<h3 class="pull-right">${itemsInstance[i].numUnitsPurchased}</h3>
					<h5 class="text-warning">${itemsInstance[i].profit}</h5>
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
}

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
						<h5 class="py-3">Price: ${item.cost}</h5>
						<h5 class="py-3">Get: ${item.profit}</h5>
					</div>
					<img src=${item.imgUrl} class="img-size-items">
				</div>
				<h5 class="py-3">How many would you like to buy?</h5>
				<input type="number" value="0" min="0" class="input-size"></input>
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

let user = new UserInfo("suuu");
createMainPage(user);

let bugerClick = document.getElementById("burgerClick");
bugerClick.addEventListener("click", function() {
	user.haveBurgers += 1;
	document.getElementById("haveBurgers").innerHTML = user.haveBurgers + " Burgers";

	user.haveMoney += 25;
	document.getElementById("haveMoney").innerHTML = "￥" + user.haveMoney;
});

