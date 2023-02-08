export const getRedirectTo = (type, avatar) => {
  let path = '';
  if (type === 'employer') {
    if (avatar) path = '/home/laoban';
    else path = '/laobaninfo';
  } else {
    if (avatar) path = '/home/dashen';
    else path = '/dasheninfo';
  }
  return path;
};