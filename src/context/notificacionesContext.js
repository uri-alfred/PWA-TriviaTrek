import React, { createContext, useContext } from 'react';
import { notification } from 'antd';

const notificaciones = createContext();

export const useNotifi = () => {
    const context = useContext(notificaciones);
    if (!context) throw new Error("Error: No hay proveedor de notificaciones");
    return context;
}

export default function NotifiProvider({children}) {
    const [api, contextHolder] = notification.useNotification({
        stack: 3
    });
    const openNotification = () => {
        api.open({
            message: `¡Notificación! - ${new Date().toUTCString()}`,
            description: `El Jisus es el nuevo genio
            de las preguntas - 8 Aciertos`,
            duration: null,
            placement: 'bottomRight',
            style: {
                backgroundColor: '#FF9110',
                borderRadius: 15,
            }
        });
    };
    
    return (
        <notificaciones.Provider value={{openNotification}}>
            {contextHolder}
            {children}
        </notificaciones.Provider>
    );
};
