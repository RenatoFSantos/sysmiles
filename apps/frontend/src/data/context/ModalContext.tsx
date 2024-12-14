'use client';

import { createContext, useState } from 'react';

interface ModalContextProps {
    show: boolean;
    setShow?: (value: boolean) => void;
}

const ModalContext = createContext<ModalContextProps>({ show: false });

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [show, setShow] = useState<boolean>(false);

    return <ModalContext.Provider value={{ show, setShow }}>{children}</ModalContext.Provider>;
}

export default ModalContext;
