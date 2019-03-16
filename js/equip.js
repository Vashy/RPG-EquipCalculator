'use strict';

class EquipCalculator {
  constructor(recordRegEx, sectionRegEx) {
    this._recordRegEx = new RegExp(recordRegEx);
    this._sectionRegEx = new RegExp(sectionRegEx);
  }

  get recordRegEx() {
    return this._recordRegEx;
  }

  get sectionRegEx() {
    return this._sectionRegEx;
  }

  testRecord(text) {
    return this._recordRegEx.test(text);
  }

  testSection(text) {
    return this.sectionRegEx.test(text)
  }

  parse(textAreaId) {
    let element = document.getElementById(textAreaId);
    let key = "";
    let tot = 0.0;
    let tots = {};

    let removeTrailingX = (str) => {

      if (str.slice(-1) == "x")
        return str.slice(0, -1);
      return str;
    };

    let parseStrings = (str1, str2) => {
      let parsedStr1 = parseInt(str1);
      let parsedStr2 = parseInt(str2);

      if (!isNaN(parsedStr2)) 
        return parsedStr1 * parsedStr2;
      return parsedStr1;
    };
    
    element.value.split('\n').forEach(line => {
      // console.log(line, '\n');

      if (this.testRecord(line)) {
        console.log(`Matched record: ${line}`);

        line = line.split(/\s+/);
        line[1] = removeTrailingX(line[1]);
        let sumValue = parseStrings(line[0], line[1]);
        tot += sumValue;
        if (key != "")
          tots[key] += sumValue;

        console.log(`tot: ${tot}\ttots[${key}]: ${tots[key]}`);

      } else if (this.testSection(line)) {
        console.log(`Matched section: ${line}`);
        // line = "<strong>" + line + "</strong>";
        key = line;
        tots[key] = 0.0;
      }
    });
    return {
      "tot": tot,
      tots,
    }
  }
}

const calculator = new EquipCalculator(
  /^\d*[\.,]?\d+\s+\d*x?[ \t]*\w.*$/,
  /[\w \t\d]+/,
);

// let equipValue = calculator.parse("equip-content");

