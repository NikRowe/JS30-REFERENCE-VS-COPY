let externalObj = {
    rank: "Captain",
    ship: "Jolly Rodger"
};
const pirate = {
    name: "Smee",
    age: 35,
    info: externalObj
};
const inputs = document.querySelectorAll(".types input");
const ref = document.getElementById("ref");
const shallow = document.getElementById("shallow");
const deep = document.getElementById("deep");
const resetBtn = document.getElementById("make");
const updateCopyBtn = document.getElementById("update");

const whatAmI = (original, copy) => {
    console.clear()
    const logg = () => {
        console.log(`Original: `, original);
        console.log(`Copy: `, copy);
    };
    if (original.name === copy.name) {
        console.log("This is a reference");
        logg();
    } else if (original.info.rank === copy.info.rank) {
        console.log("This is a shallow copy");
        logg();
    } else {
        console.log("This is a deep copy");
        logg();
    }
};

function replaceHTML(original, copy, type) {
    document.getElementById("type").innerHTML = `${type}`;
    document.getElementById(
        "original"
    ).innerHTML = `${original.name}, ${original.info.rank}`;
    document.getElementById("copy").innerHTML = `${copy.name}, ${copy.info.rank}`;
}

const updateObj = (original, copy) => {
    copy.name = "Nik";
    externalObj.rank = "1st Mate";
};

function deepClone(aObject) {
    if (!aObject) {
        return aObject;
    }

    let v;
    let bObject = Array.isArray(aObject) ? [] : {};
    for (const k in aObject) {
        v = aObject[k];
        bObject[k] = typeof v === "object" ? deepClone(v) : v;
    }

    return bObject;
}

let selected = false;
function selectedToggle() {
    this.checked ? (selected = true) : (selected = false);
}

function resetOriginal() {
    externalObj.rank = "Captain";
    document.getElementById(
        "original"
    ).innerHTML = `${pirate.name}, ${externalObj.rank}`;
}

function updateCopy(e) {
    if (selected) {
        let type;
        let original = { ...pirate };
        let copy;
        if (ref.checked) {
            type = ref.value;
            copy = original;
            updateObj(original, copy);
            replaceHTML(original, copy, type);
            whatAmI(original, copy);
        } else if (shallow.checked) {
            type = shallow.value;
            copy = { ...original };
            updateObj(original, copy);
            replaceHTML(original, copy, type);
            whatAmI(original, copy);
        } else if (deep.checked) {
            type = deep.value;
            externalObj.rank = "Captain";
            console.log(original);
            copy = deepClone(original);
            updateObj(original, copy);
            replaceHTML(original, copy, type);
            whatAmI(original, copy);
        }
    }
}

inputs.forEach((input) => input.addEventListener("click", selectedToggle));
// inputs.forEach((input) => input.addEventListener("click", select));
resetBtn.addEventListener("click", resetOriginal);
updateCopyBtn.addEventListener("click", updateCopy);

document.getElementById(
    "original"
).innerHTML = `${pirate.name}, ${pirate.info.rank}`;
