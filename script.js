const colors = ['red', 'green', 'orange', 'yellow', 'pink', 'blue', 'purple', 'brown'];
let colorsArray = [];
let selected = [null, null];
let allTrue = [];
let timeStart = null;

const compareRandom = (a, b) => Math.random() - 0.5;

const getRandomColorsArray = () => ([...colors, ...colors]).sort(compareRandom);
const getColor = (i) => colorsArray[i];

const checkColor = (id) => {
    return () => {
        if (allTrue.indexOf(id) < 0)
            if (selected[0] === null) { // Если ничего не выбрано
                selected[0] = id;
                showCell(id);
                console.log("1", selected);
            } else if (selected[1] === null) { // если отмечаем второй

                selected[1] = id;
                showCell(id);
                // Если неправильно: дважды нажали на одну и ту же ячейку или
                if (selected[0] === selected[1] || getColor(selected[0]) !== getColor(selected [1])) {
                    setTimeout(() => {
                        hideCell(selected[0]);
                        hideCell(selected[1]);
                        selected = [null, null];
                    }, 100);

                } else {
                    allTrue.push(...selected);
                    selected = [null, null];
                    // console.log("allTrue", allTrue);
                    // console.log("arraysLength", allTrue.length, colorsArray.length)
                    if (allTrue.length === colorsArray.length) {
                        // console.log("finish");
                        finish();
                    }
                }
            }


    }

};

// Расчет и вывод времени на экран и  консоль
const finish = () => {
    const timeCurrent = new Date();
    let int = timeCurrent.getTime() - timeStart.getTime();
    let ms = int % 1000;
    int = (int - ms) / 1000;
    let s = int % 60;
    int = (int - s) / 60;
    let m = int % 60;

    const t = `Затраченное время: ${m}:${s}.${ms}`;
    console.log(t);
    alert(t) ;

}

const showCell = id => {
    const cell = document.getElementById(id);
    cell.style.backgroundColor = colorsArray[id];
}
const hideCell = id => {
    const cell = document.getElementById(id);
    cell.style.backgroundColor = null;
}


const pairsListener = () => {
    colorsArray = getRandomColorsArray();
    const table = document
        .getElementById('table');
    table.innerHTML = '';
    for (let i = 0; i < colorsArray.length; i++) {
        const el = document.createElement('div');
        el.id = i;
        // el.innerText = colorsArray[i];
        el.addEventListener("click", checkColor(i));

        table.appendChild(el);
    }
    allTrue = [];
    timeStart = new Date();

};

window.onload = () => {
    document
        .getElementById('start')
        .addEventListener("click", pairsListener, false);
}
