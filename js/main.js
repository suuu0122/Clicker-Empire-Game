function displayNone(ele) {
	ele.classList.remove("d-block");
	ele.classList.add("d-none");
}

function displayBlock(ele) {
	ele.classList.remove("d-none");
	ele.classList.add("d-block");
}

const config = {
	initialPage: document.getElementById("initialPage"),
	mainPage: document.getElementById("mainPage")
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
	constructor(imgUrl, imgName, cost, numUnitsPurchased, profit) {
		this.imgUrl = imgUrl;
		this.imgName = imgName;
		this.cost = cost;
		this.numUnitsPurchased = numUnitsPurchased;
		this.profit = profit;
	}
}

let itemsInstance = [
	new Items("img/flipMachine.webp", "Flip machine", "￥15000", 0, "￥25/click"),
	new Items("img/etf.webp", "ETF Stock", "￥300000", 0, "￥0.1/sec"),
	new Items("img/etf.webp", "ETF Bonds", "￥300000", 0, "￥0.07/sec",)
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
	let container = '<div class="bg-dark">'
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
			<div class="d-flex div-items-size bg-primary m-2">
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

	return config.mainPage.innerHTML = container;
}

// createInitialPage();

let user = new UserInfo("suuu");
createMainPage(user);

let bugerClick = document.getElementById("burgerClick");
bugerClick.addEventListener("click", function() {
	user.haveBurgers += 1;
	document.getElementById("haveBurgers").innerHTML = user.haveBurgers + " Burgers";

	user.haveMoney += 25;
	document.getElementById("haveMoney").innerHTML = "￥" + user.haveMoney;
});