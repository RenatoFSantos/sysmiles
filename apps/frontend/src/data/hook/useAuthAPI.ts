import { useContext } from 'react';
import AuthContextAPI from '../context/AuthContextAPI';

const useAuthAPI = () => useContext(AuthContextAPI);

export default useAuthAPI;
