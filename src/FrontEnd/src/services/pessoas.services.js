import API from './webapi.services';
import { URL } from './urls';

export const getPessoas = async () => {
  try {
    return await API.get(`${URL}/pessoas`).then(
      (response) => {
        return response.data;
      },
      (error) => {
        console.log(error);
        return null;
      }
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getPessoasUsuarioId = async (param) => {
  try {
    return await API.get(`${URL}/pessoas/${param}`).then(
      (response) => {
        return response.data;
      },
      (error) => {
        console.log(error);
        return null;
      }
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};
