export  const truncateText = (text, n = 200) => {
  return text.length > n ? text.slice(0, n) + '...' : text;
}

export const formatBudget = (number) => {
  let divisorCount = 0;

  while (number > 999) {
    number = Math.floor(number / 1000);
    divisorCount ++;
  }

  let suffix = '';

  switch (divisorCount) {
    case 2 : 
      suffix = 'million'
      break;
    case 3 : 
      suffix = 'milliard'
      break;
    default: suffix = 'thousand';
  }

  return `$${number} ${suffix}`;
};

export const formatRuntime = (timeInMinutes) => {
  const hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;

  return `${hours}h ${minutes > 0 ? minutes + 'm' : ''}`;
}
