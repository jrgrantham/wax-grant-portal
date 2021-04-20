export function currentCombinedLengthOfBars(schedule) {
  let length = 0;
  for (let i = 0; i < schedule.length; i++) {
    if (schedule[i].barNumber > 0) length++
  }
  return length
}