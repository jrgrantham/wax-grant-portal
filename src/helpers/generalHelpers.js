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

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// `wait` milliseconds.
export const debounce = (func, wait) => {
  let timeout;

  // This is the function that is returned and will be executed many times
  // We spread (...args) to capture any number of parameters we want to pass
  return function executedFunction(...args) {
    // The callback function to be executed after
    // the debounce time has elapsed
    const later = () => {
      // null timeout to indicate the debounce ended
      timeout = null;

      // Execute the callback
      func(...args);
    };
    // This will reset the waiting every function execution.
    // This is the step that prevents the function from
    // being executed because it will never reach the
    // inside of the previous setTimeout
    clearTimeout(timeout);

    // Restart the debounce waiting period.
    // setTimeout returns a truthy value (it differs in web vs Node)
    timeout = setTimeout(later, wait);
  };
};
