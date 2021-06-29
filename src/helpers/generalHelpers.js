export function isNumberKey(e) {
  const charCode = e.which ? e.which : e.keyCode;
  // if (charCode > 31 && (charCode < 48 || charCode > 57)) e.preventDefault();
  if (
    (charCode < 48 &&
      !(charCode === 37 || charCode === 39 || charCode === 8)) ||
    charCode > 57
  )
    e.preventDefault();
}

export function leadingZero(number) {
  let zeroNumber = number.toString();
  zeroNumber = number < 10 ? 0 + zeroNumber : zeroNumber;
  return zeroNumber;
}

export function nextIndexOfGroup(group, array) {
  const lastEntry = group.slice(-1)[0];
  const lastEntryIndex = array.indexOf(lastEntry);
  const position = lastEntryIndex + 1;
  return position;
}

export function roundTo(number, decimalPlaces) {
  const roundBy = Math.pow(10, decimalPlaces);
  const result = Math.round(number * roundBy) / roundBy;
  return result;
}

export function numberToCurrency(number) {
  if (number) {
    const rounded = Math.round(number);
    let formattedCost = rounded.toString();
    let result = "";
    let counter = 0;
    for (let i = formattedCost.length - 1; i >= 0; i--) {
      const character = formattedCost.charAt(i);
      if (counter > 0 && counter % 3 === 0) {
        result = "," + result;
      }
      result = character + result;
      counter++;
    }
    result = "£" + result;
    return result;
  } else return 0;
}

export function generateArray(start = 1, end = 1, increment = 1) {
  const length = [];
  for (let i = start; i <= end; i = i + increment) {
    length.push(i);
  }
  return length;
}

function debounce(callback, wait) {
  let timerId;
  return(...args) => {
    
  }
}