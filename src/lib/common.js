import storage from './storage';

export const timeSince = date => {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} 년`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} 월`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} 일`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} 시간`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} 분`;
  }
  return `${Math.floor(seconds)} 초`;
};

export const getUserId = () => {
  if(storage.get('loggedInfo')){
    return storage.get('loggedInfo').userId;
  }
  return null;
}