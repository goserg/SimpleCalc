document.addEventListener('keydown', function(event) {
    if (event.code === 'Backspace' ||
        event.code === 'KeyZ' && (event.ctrlKey || event.metaKey)) {
        backspace();
        return;
    }
    let key = Number(event.key)
    if (!isNaN(key) && event.key !== null && event.key !== ' ') {
        input(event.key);
        return;
    }
    if (event.key === "." || event.key ===",") {
        input(".");
        return;
    }
    if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
        input_action(event.key);
        return;
    }
    if (event.key === "Enter") {
        calculate();
    }

});

function input(n) {
    if (document.querySelector("#Eval").textContent.length < 16) {
        document.querySelector("#Eval").textContent += n;
    }
}

function input_action(a) {
    if (document.querySelector("#Eval").textContent === "" &&
        document.querySelector("#Result").textContent !== "" &&
        document.querySelector("#Result").textContent !== "Infinity" &&
        document.querySelector("#Result").textContent !== "NaN") {
        document.querySelector("#Eval").textContent = document.querySelector("#Result").textContent
    }
    _clearAction();
    if (document.querySelector("#Eval").textContent.length < 16) {
        document.querySelector("#Eval").textContent += a;
    }
}

function calculate() {
    _clearAction();
    document.querySelector("#Result").textContent = eval(document.querySelector("#Eval").textContent);
    document.querySelector("#Eval").textContent = "";
}

function clear_all() {
    if (document.querySelector("#Eval").textContent === "") {
        document.querySelector("#Result").textContent = "";
    } else {
        document.querySelector("#Eval").textContent = "";
    }
}

function backspace() {
    document.querySelector("#Eval").textContent = document.querySelector("#Eval").textContent.slice(0,-1);
}

function _clearAction() {
    let last = document.querySelector("#Eval").textContent.slice(-1);
    console.log(last);
    if (last === "+" || last === "-" || last === "*" || last === "/") {
        backspace();
    }
}