/* eslint-disable max-len */
import React, {createContext, useState, useContext} from 'react';
import PropTypes from 'prop-types';

/**
 * Contexto de usuário para gerenciar informações de usuário.
 * @type {React.Context}
 */
export const UserContext = createContext();

/**
 * Provedor de contexto para informações do usuário.
 * @param {object} props - Propriedades do componente.
 * @param {React.ReactNode} props.children - Componentes filhos.
 * @return {JSX.Element} Componente de provedor de usuário.
 */
export default function UserProvider({children}) {
  // Estado do usuário
  const [signed, setSigned] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  return (
    <UserContext.Provider
      value={{
        signed,
        setSigned,
        name,
        setName,
        id,
        setId,
      }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Hook personalizado para consumir o contexto de usuário.
 * @return {object} Objeto contendo informações do usuário e funções relacionadas.
 */
export function useUser() {
  const context = useContext(UserContext);
  const {signed, setSigned, name, setName, id, setId} = context;
  return {signed, setSigned, name, setName, id, setId};
}
