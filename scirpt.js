// Room Data UNDER
const rooms = {
  girlRmDataA: ["5011", "5012", "5013", "5014", "5015"],
  girlRmDataB: ["5021", "5022", "5023", "5024", "5025"],
  girlRmDataC: ["5031", "5032", "5033", "5034", "5035", "5036"],
  girlRmDataD: ["5041", "5042", "5043", "5044"],
  girlRmDataE: ["5051", "5052", "5053", "5054"],
  girlRmDataF: ["5061", "5062", "5063", "5064"],
  girlRmDataG: ["5071", "5072"],
  girlRmDataH: ["5081", "5082"],
  girlRmDataI: ["5091", "5092", "5093", "5094", "5095", "5096", "5097", "5098"],
  girlRmDataJ: ["5101", "5102", "5103", "5104", "5105", "5106", "5107", "5108"],
  mixRmDataA: ["6011", "6012", "6013", "6014", "6015", "6016", "6017", "6018"],
  mixRmDataB: ["6021", "6022", "6023", "6024"],
  mixRmDataC: ["6031", "6032", "6033", "6034"],
  mixRmDataD: ["6041", "6042", "6043", "6044"],
  mixRmDataE: ["6051", "6052", "6053", "6054"],
  mixRmDataF: ["6061", "6062", "6063", "6064"],
  mixRmDataG: ["6071", "6072", "6073", "6074", "6075", "6076", "6077", "6078"],
  mixRmDataH: ["6081", "6082", "6083", "6084"],
  mixRmDataI: ["6091", "6092", "6093", "6094"],
  mixRmDataJ: ["6101", "6102"],
  mixRmDataK: ["6111", "6112", "6113", "6114", "6115", "6116"],
  privateRmData: ["6A1", "6A2", "6A3", "6A4", "6A5", "6A6"]
};

const girlRmDataAll = rooms["girlRmDataA"].concat(
  rooms["girlRmDataB"],
  rooms["girlRmDataC"],
  rooms["girlRmDataD"],
  rooms["girlRmDataE"],
  rooms["girlRmDataF"],
  rooms["girlRmDataG"],
  rooms["girlRmDataH"],
  rooms["girlRmDataI"],
  rooms["girlRmDataJ"]
);
const mixRmDataAll = rooms["mixRmDataA"].concat(
  rooms["mixRmDataB"],
  rooms["mixRmDataC"],
  rooms["mixRmDataD"],
  rooms["mixRmDataE"],
  rooms["mixRmDataF"],
  rooms["mixRmDataG"],
  rooms["mixRmDataH"],
  rooms["mixRmDataI"],
  rooms["mixRmDataJ"],
  rooms["mixRmDataK"]
);

rooms["girlRmData"] = girlRmDataAll;
rooms["mixRmData"] = mixRmDataAll;
// Room Data ABOVE

// Buttons and Data input settings
const buttons = document.querySelector(".buttons");
const leftSection = document.querySelector(".left-section");
const rightSection = document.querySelector(".right-section");
const roomBtn = document.querySelectorAll(".room-btn");
const delBtn = document.querySelector(".del-btn");
let deleteStatus = false;
let test = [];

const allBtn = document.querySelector(".all-btn");

const main = document.querySelector("main");
const statusSection = document.querySelector(".status-section")
const statusCountOut = document.querySelector(".status-count .out");
const statusCountStay = document.querySelector(".status-count .stay");
const statusCountNew = document.querySelector(".status-count .new");
const statusCountPriOut = document.querySelector(".status-count .pri-out");
const statusCountPriStay = document.querySelector(".status-count .pri-stay");
const statusCountPriNew = document.querySelector(".status-count .pri-new");

const btnSave = document.querySelector("#btn-save")
const btnGet = document.querySelector("#btn-get")


function disabledBtn(event) {
  if (!event.target.hasAttribute("disabled", "") && event.target.matches(".room-btn")) {
    event.target.setAttribute("disabled", "")
  } else {
    event.target.removeAttribute("disabled", "")
  }
}

function rmStatFormat(room, color, event) {
  let rmStat = `
      <tr class="rm${event.target.innerText} ${color}">
        <td>${room}</td>
        <td data-out="no"></td>
        <td data-stay="no"></td>
        <td data-new="no"></td>
        <td></td>
      </tr>
      `;
  return rmStat;
}

function insertRmData(roomData, color, event) {
  let checking = event.target.classList;

  if (
    checking.contains("girl") ||
    checking.contains("pri") ||
    roomData === rooms["girlRmData"] ||
    roomData === rooms["privateRmData"]
  ) {
    roomData.forEach((room) => {
      leftSection.innerHTML += rmStatFormat(room, color, event);
    });
  } else {
    roomData.forEach((room) => {
      rightSection.innerHTML += rmStatFormat(room, color, event);
    });
  }
}

function deleteRm(event) {
  document.querySelectorAll(`.rm${event.target.innerText}`).forEach((a) => {
    a.remove();
  });
}

function deleteMode() {
  buttons.classList.toggle("delete-mode");
  allBtn.removeAttribute("disabled");
  deleteStatus = !deleteStatus;
}

function priCount(priCheck) {
  let check = 0;
  for (let i = 1; i < priCheck.length; i += 5) {
    if (priCheck[i].innerText === "V") {
      check++;
      statusCountPriOut.innerText = `含套${check}`;
    }
  }
  check = 0;
  for (let f = 2; f < priCheck.length; f += 5) {
    if (priCheck[f].innerText === "V") {
      check++;
      statusCountPriStay.innerText = `含套${check}`;
    }
  }
  check = 0;
  for (let k = 3; k < priCheck.length; k += 5) {
    if (priCheck[k].innerText === "V") {
      check++;
      statusCountPriNew.innerText = `含套${check}`;
    }
  }
}

buttons.addEventListener("click", function (event) {
  let target = event.target;

  disabledBtn(event)

  console.log(target)


  if (target === delBtn && test.includes("ALL (test)")) {
    deleteMode();
    roomBtn.forEach((a) => {
      a.setAttribute("disabled", "");
    });
  } else if (target === delBtn && test.includes("ALL (test)")) {
    deleteMode();
    roomBtn.forEach((a) => {
      a.removeAttribute("disabled", "");
    });
  } else if (target === delBtn) {
    deleteMode();
    roomBtn.forEach((a) => {
      if (a.hasAttribute("disabled", "")) {
        a.removeAttribute("disabled", "");
      } else {
        a.setAttribute("disabled", "")
      }
    });

  }

  if (!test.includes(`${target.innerText}`)) {
    //     我忘記這行要幹嘛惹，先放著
  }

  if (
    target.classList.contains("room-btn") &&
    !deleteStatus &&
    !test.includes(`${target.innerText}`)
  ) {
    insertRmData(rooms[target.dataset.key], target.dataset.color, event);
    test.push(`${target.innerText}`);
    allBtn.setAttribute("disabled", "");
  } else if (
    target === allBtn &&
    !deleteStatus &&
    !test.includes(`${target.innerText}`)
  ) {
    roomBtn.forEach((a) => {
      a.setAttribute("disabled", "");
    });
    insertRmData(rooms["girlRmData"], target.dataset.color, event);
    insertRmData(rooms["mixRmData"], target.dataset.color, event);
    insertRmData(rooms["privateRmData"], target.dataset.color, event);
    test.push(`${target.innerText}`);
    test.push(
      "501",
      "502",
      "503",
      "504",
      "505",
      "506",
      "507",
      "508",
      "509",
      "510",
      "601",
      "602",
      "603",
      "604",
      "605",
      "606",
      "607",
      "608",
      "609",
      "610",
      "611",
      "套房"
    );
  } else if (target.classList.contains("room-btn") && deleteStatus) {
    deleteRm(event);
    test.splice(test.indexOf(`${target.innerText}`), 1);
  } else if (target === allBtn && deleteStatus) {
    test = [];
    leftSection.innerHTML = "";
    rightSection.innerHTML = "";

    roomBtn.forEach((a) => {
      a.setAttribute("disabled", "");
    });

    // test
  }
});
// Buttons and Data input settings

// Edit Table
main.addEventListener("click", function (event) {
  let target = event.target;
  let targetData = event.target.dataset;

  if (targetData.out === "no") {
    targetData.out = "yes";
    target.innerText = "V";
  } else if (targetData.out === "yes") {
    targetData.out = "no";
    target.innerText = "";
  }

  if (targetData.stay === "no") {
    targetData.stay = "yes";
    target.innerText = "V";
  } else if (targetData.stay === "yes") {
    targetData.stay = "no";
    target.innerText = "";
  }

  if (targetData.new === "no") {
    targetData.new = "yes";
    target.innerText = "V";
  } else if (targetData.new === "yes") {
    targetData.new = "no";
    target.innerText = "";
  }

  const out = document.querySelectorAll("[data-out = yes]");
  const stay = document.querySelectorAll("[data-stay = yes]");
  const newIn = document.querySelectorAll("[data-new = yes]");

  statusCountOut.innerText = out.length;
  statusCountStay.innerText = stay.length;
  statusCountNew.innerText = newIn.length;

  const priCheck = document.querySelectorAll(".rm套房 td");

  priCount(priCheck);
});

btnSave.addEventListener('click', function () {
  let task = document.querySelector('textarea').value
  localStorage.setItem("task", JSON.stringify(task))

  localStorage.setItem("leftTables", JSON.stringify(leftSection.innerHTML))
  localStorage.setItem("rightTables", JSON.stringify(rightSection.innerHTML))
  localStorage.setItem("status", JSON.stringify(statusSection.innerHTML))


})

btnGet.addEventListener('click', function () {
  document.querySelector('textarea').value = JSON.parse(localStorage.getItem("task"))

  leftSection.innerHTML = JSON.parse(localStorage.getItem("leftTables")).trim()
  rightSection.innerHTML = JSON.parse(localStorage.getItem("rightTables")).trim()
  statusSection.innerHTML = JSON.parse(localStorage.getItem("status")).trim()
  // localStorage.removeItem("tables")
})

// Edit Table

// Title Date
const today = document.querySelector(".today");
let now = new Date();
let nowMonth = now.getUTCMonth() + 1;
let nowDay = now.getUTCDate() + 1;
today.innerText = `${nowMonth}/${nowDay}  `;
// Title Date

// sort
function sortTable() {
  let table = document.querySelectorAll("tbody");
  let switching;
  let shouldSwitch;
  let i;
  let rows = table[0].rows;
  let rowsTwo = table[1].rows;

  switching = true;
  switchIndex(switching, rows, shouldSwitch, i);

  switching = true;
  switchIndex(switching, rowsTwo, shouldSwitch, i);
}

function switchIndex(switching, row, shouldSwitch, i) {
  while (switching) {
    switching = false;
    for (i = 0; i < row.length - 1; i++) {
      if (row[i].innerText > row[i + 1].innerText) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      row[i].parentNode.insertBefore(row[i + 1], row[i]);
      switching = true;
      shouldSwitch = false;
    }
  }
}
// sort
