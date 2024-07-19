import { HASH_ALGORITHM, SECRET_KEY } from '../env';

const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  return hashedPassword;
};

const getAccessToken = () => {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === "accessToken") {
        return cookie[1];
      }
    }
    return null;
  }

  export { hashPassword, getAccessToken };