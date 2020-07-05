const input = document.querySelector("#Input");
const result = document.querySelector(".result_num");
const action = document.querySelector(".result_action");

document.addEventListener('keydown', function(event) {
    if (event.code === 'Backspace' ||
        event.code === 'KeyZ' && (event.ctrlKey || event.metaKey)) {
        backspace();
        return;
    }
    let key = Number(event.key)
    if (!isNaN(key) && event.key !== null && event.key !== ' ') {
        input_number(event.key);
        return;
    }
    if (event.key === "." || event.key ===",") {
        input_number(".");
        return;
    }
    if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
        input_action(event.key);
        return;
    }
    if (event.key === "Enter") {
        input_action("=");
    }

});

function input_number(n) {
    if (input.textContent === "0" && n !== ".") {
        input.textContent = "";
    }
    if (n === ".") {
        for (let i of input.textContent) if (i === ".") return;
    }
    if (input.textContent.length < 16) {
        input.textContent += n;
    }
}

function input_action(a) {
    if (result.textContent === "") {
        result.textContent = input.textContent;
        action.textContent = (a !== "=") ? a: "";
        input.textContent = "";
    } else {
        if (input.textContent !== "0") {
            if (action.textContent !== "") {
                result.textContent = String(Number(calculate().slice(0, 16)));
                action.textContent = (a !== "=") ? a: "";
                input.textContent = "0";
            } else {
                result.textContent = input.textContent;
                input.textContent = "0";
                action.textContent = (a !== "=") ? a: "";
            }
        } else {
            if (a === "=") {
                result.textContent = String(Number(calculate().slice(0, 16)));
                action.textContent = "";
            } else {
                action.textContent = (a !== "=") ? a: "";
            }
        }
    }
}

function calculate() {
    if (action.textContent === "+") {
        return  String(Number(result.textContent) + Number(input.textContent));
    }
    if (action.textContent === "-") {
        return  String(Number(result.textContent) - Number(input.textContent));
    }
    if (action.textContent === "*") {
        return  String(Number(result.textContent) * Number(input.textContent));
    }
    if (action.textContent === "/") {
        console.log(result.textContent, "/", input.textContent);
        if (input.textContent === "0") {
            if (result.textContent === "0") {
                return "Undefined";
            }
            return "0 division error";
        }
        return  String(Number(result.textContent) / Number(input.textContent));
    }
}

function clear_all() {
    if (input.textContent === "0") {
        if (action.textContent === "") {
            result.textContent = "";
        } else {
            action.textContent = "";
        }
    } else {
        input.textContent = "0";
    }
}

function backspace() {
    input.textContent = input.textContent.slice(0,-1);
    if (input.textContent === "") {
        input.textContent = "0";
    }
}
