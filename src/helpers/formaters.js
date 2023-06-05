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


export const formatAuthError = (error) => {
  const defaultError = "An error occurred during authentication. Please try again.";
  if (!error.message) return defaultError;

  const errorCode = error.message.slice(error.message.indexOf('(') + 1, error.message.indexOf(')'));
  
  switch (errorCode) {
    case "auth/user-not-found":
      return "The provided email is not registered.";
    case "auth/wrong-password":
      return "The provided password is incorrect.";
    case "auth/weak-password":
      return "Password should be at least 6 characters";
    case "auth/email-already-in-use":
      return "This login is already signed up";
    default:
      return defaultError;
  }
};
