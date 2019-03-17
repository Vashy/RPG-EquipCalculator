'use strict';

function removeChilds(id) {
  let node = document.getElementById(id);
  while(node.firstChild)
    node.removeChild(node.firstChild);
}

function displayTable() {
  let equipValue = calculator.parse("equip-content");

  // let element = document.getElementById("show-equip");
  // removeChilds("show-equip");

  // table and tHead
  let table = document.createElement("table");
  let trHead = document.createElement("tr");

  let th1 = document.createElement("th");
  let th2 = document.createElement("th");
  let th1Text = document.createTextNode("Category");
  let th2Text = document.createTextNode("Worth");

  th1.appendChild(th1Text);
  th2.appendChild(th2Text);
  trHead.appendChild(th1);
  trHead.appendChild(th2);
  table.appendChild(trHead);

  // sorts, ascending order by value, forEach ...
  Object.keys(equipValue.tots).sort((a, b) =>{
      return equipValue.tots[a] - equipValue.tots[b];
  }).forEach(key => {
      // appends a table row containing key-value 
      if (equipValue.tots[key] != 0) { // Skipping 0 values
        let tr = document.createElement("tr");
        let tdCategory = document.createElement("td");
        let tdWorth = document.createElement("td");
        let catText = document.createTextNode(key);
        let worthText = document.createTextNode(equipValue.tots[key]);
        tdCategory.appendChild(catText);
        tdWorth.appendChild(worthText);
        tr.appendChild(tdCategory);
        tr.appendChild(tdWorth);
        table.appendChild(tr);
      }
  });

  // table footer
  let trFooter = document.createElement("tr");
  trFooter.className = "table-footer";
  let tf1 = document.createElement("td");
  let tf2 = document.createElement("td");
  let tf1Text = document.createTextNode("Total");
  let tf2Text = document.createTextNode(equipValue.tot);
  tf1.appendChild(tf1Text);
  tf2.appendChild(tf2Text);
  trFooter.appendChild(tf1);
  trFooter.appendChild(tf2);
  table.appendChild(trFooter);

  return table;
}

function displayText() {
  let equipValue = calculator.parse("equip-content");
  let result = document.createElement("p");

  Object.keys(equipValue.tots)
    .sort((a, b) => equipValue.tots[b] - equipValue.tots[a])
    .forEach(key => {
      if (equipValue.tots[key] > 0) {
        result.appendChild(document.createTextNode(key + ": " + equipValue.tots[key]));
        result.appendChild(document.createElement("br"));
      }
  });

  let lastRow = "Total: " + equipValue.tot;
  result.appendChild(document.createTextNode("-".repeat(lastRow.length)));
  result.appendChild(document.createElement("br"));
  result.appendChild(document.createTextNode(lastRow));

  return result;
}

function displayResult() {
  let element = document.getElementById("show-equip");
  removeChilds("show-equip");
  let node;
  if (preferenceCookie.isTable)
    node = displayTable();
  else // preferenceCookie.isText
    node = displayText();

  element.appendChild(node);
  document.getElementById("switcher").style = "display: inline-block;";
  document.getElementById("switcher").innerHTML = "Switch to " + preferenceCookie.alternative;
}

function switchOutputFormat() {
  let text = preferenceCookie.swap();
  document.getElementById("switcher").innerHTML = "Switch to " + text;
  displayResult();
}

function dropHandler(ev) {
  console.log('File dropped');

  ev.preventDefault();

  if (ev.dataTransfer.files) {
    let element = document.getElementById('equip-content');
    let reader = new FileReader();
    reader.onload = e => { element.value = e.target.result; displayResult();};
    reader.readAsText(ev.dataTransfer.files[0]);
    // while (reader.readyState != 2) { }

  }
  let element = document.getElementById('equip-content').style -= "border: 4px solid blue; background-color: lightgray;";
}

function dragOverHandler(ev) {
  console.log('File in drop zone');

  ev.preventDefault();

  let element = document.getElementById('equip-content').style += "border: 4px solid blue; background-color: lightgray;";
}

function loadResult() {
  if (document.getElementById("equip-content").value != "") {
    displayResult();
  }
}

document.getElementById("equip-content").onpaste = e => {
  // e.preventDefault();
  // alert("porcoddue");
  displayResult();
};