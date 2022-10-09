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

class UserAccount {
	constructor(userName) {
		this.userName = userName;
	}
}

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

createInitialPage();