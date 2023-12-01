import API from './webapi.services';
import {URL} from './urls';

export const getNegociacoes = async () => {
  try {
    return await API.get(`${URL}/negociacao`).then(
        (response) => {
          return response.data;
        },
        (error) => {
          console.log(error);
          return null;
        },
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getNegociacoesRecentes = async () => {
  try {
    return await API.get(`${URL}/negociacaorecente`).then(
        (response) => {
          return response.data;
        },
        (error) => {
          console.log(error);
          return null;
        },
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getNegociacoesUsuarioId = async (param) => {
  try {
    return await API.get(`${URL}/negociacao/${param}`).then(
        (response) => {
          return response.data;
        },
        (error) => {
          console.log(error);
          return null;
        },
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateNegociacao = async (param) => {
  console.log(param);
  try {
    return await API.put(`${URL}/negociacao/${param.id}`, param).then(
        (response) => {
          return response.data;
        },
        (error) => {
          console.log(error);
          return null;
        },
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const insertNegociacao = async (param) => {
  try {
    return await API.post(`${URL}/negociacao`, param).then(
        (response) => {
          return response.data;
        },
        (error) => {
          console.log(error);
          return null;
        },
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteNegociacao = async (id) => {
  try {
    return await API.delete(`${URL}/negociacao/${id}`).then(
        (response) => {
          return response.data;
        },
        (error) => {
          console.log(error);
          return null;
        },
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};
