import { useContext } from 'react';
import AuthContextFirebase from '../context/AuthContextFirebase';

const useAuthFirebase = () => useContext(AuthContextFirebase);

export default useAuthFirebase;
