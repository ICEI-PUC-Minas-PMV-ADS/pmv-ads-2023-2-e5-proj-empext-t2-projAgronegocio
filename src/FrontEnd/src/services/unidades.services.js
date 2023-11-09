import API from './webapi.services';
import { URL_NEGOCIACAO } from './urls';

export const getUnidades = async () => {
  try {
    return await API.get(`${URL_NEGOCIACAO}/unidades`).then(
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

export const getUnidadesId = async (param) => {
  try {
    return await API.get(`${URL_NEGOCIACAO}/unidades/${param}`).then(
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

