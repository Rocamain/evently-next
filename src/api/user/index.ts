import { API_URL } from '../../../constants/api';
interface UserData {
  email: string;
  password: string;
}

interface RegistrationData extends UserData {
  name: string;
  lastName: string;
}

export const registerUser = (data: RegistrationData) => {
  return fetch(`${API_URL}/join`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const loginUser = (data: UserData) => {
  return fetch(`${API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
