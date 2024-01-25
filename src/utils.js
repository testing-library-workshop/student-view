export const checkIfStringDateIsBeforeToday = (dateString) => {
  if (dateString === "") return false;
  
  if (typeof dateString !== "string" || !isValidDate(dateString))
    throw new Error("dateString must be a string with a valid date format");

  let today = new Date(Date.now());
  today.setDate(today.getDate() - 1);
  return new Date(dateString) <= today;
};

function isValidDate(dateString) {
  const dateObj = new Date(dateString);
  return dateObj instanceof Date && !isNaN(dateObj);
}
