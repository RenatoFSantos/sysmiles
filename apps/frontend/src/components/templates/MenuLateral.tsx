'use client';
import MenuItem from './MenuItem';
import { iconBell, iconExit, iconHome, iconSettings } from '../icons';
import { useEffect, useState } from 'react';
import useModalLogout from '@/data/hook/useModalLogout';

export default function MenuLateral() {
    const [showMenu, setShowMenu] = useState(true);
    const { setShow } = useModalLogout();

    const toglleMenu = async () => {
        console.log('showMenu=', showMenu);
        await setShowMenu((prevState) => !prevState);
    };

    return (
        <div className="flex items-center bg-gray-300">
            <aside
                className={`flex flex-col h-full min-w-[40px] max-w-[200px] bg-drteeth-primary text-white`}>
                <ul className={`flex-grow`}>
                    <MenuItem url="/" texto={showMenu ? 'Início' : ''} icone={iconHome} />
                    <MenuItem
                        url="/clinic"
                        texto={showMenu ? 'Clínica' : ''}
                        icone={iconSettings}
                    />
                    <MenuItem url="/profile" texto={showMenu ? 'Perfil' : ''} icone={iconBell} />
                </ul>
                <ul>
                    <MenuItem
                        url="/"
                        texto={showMenu ? 'Saída' : ''}
                        icone={iconExit}
                        onClick={() => setShow(true)}
                    />
                </ul>
            </aside>
            <button
                type="button"
                onClick={toglleMenu}
                className="flex self-start py-2 pr-1 rounded-r-xl border-2 bg-drteeth-800 cursor-pointer border-drteeth-800 text-white hover:bg-cyan-800 hover:text-cyan-100">
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    );
}
