// Returns the number of days between two dates
export const numberOfDaysInInterval = (smallerDate, LargerDate) => {
  // Time difference between in the dates interval
  const differenceInTime = LargerDate.getTime() - smallerDate.getTime();

  // Converting the difference in time to days
  const DifferenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  console.warn(
    "The difference between " +
      LargerDate +
      " and " +
      smallerDate +
      " in days is " +
      DifferenceInDays
  );

  // Returning the difference in days
  return DifferenceInDays;
};
