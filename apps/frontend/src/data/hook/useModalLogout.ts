import { useContext } from 'react';
import ModalContext from '../context/ModalContext';

const useModalLogout = () => useContext(ModalContext);

export default useModalLogout;
