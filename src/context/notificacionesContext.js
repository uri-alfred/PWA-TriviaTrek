import React, { createContext, useContext, useEffect } from 'react';
import { notification } from 'antd';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../firebase';
import imgDefecto from '../img/logo.jpg';

const notificaciones = createContext();

export const useNotifi = () => {
    const context = useContext(notificaciones);
    if (!context) throw new Error("Error: No hay proveedor de notificaciones");
    return context;
}

export default function NotifiProvider({ children }) {
    const [api, contextHolder] = notification.useNotification({
        stack: 3
    });

    const getTokenNotificacion = async () => {
        const token = await getToken(messaging, {
            vapidKey: 'BNfvXutiTWZziOfQ1tIUj07XgZzJNvHglL2LZUBTX3gCZviVdDEU7Ligmz84T35a5o4c9Sol_9m0exxYYjv7EQg'
        }).catch((error) => console.log('No se pudo obtener el token', error));

        if (token) {
            console.log(token);
        } else {
            console.log('No se pudo obtener el token');
            console.log('Permiso:', Notification.permission);
        }
    };

    const notificarme = () => {
        if (!window.Notification) {
            console.log('Este navegador no soporta notificaciones');
            return;
        }
        if (Notification.permission === 'granted') {
            getTokenNotificacion();
        } else if (Notification.permission !== 'denied' || Notification.permission === 'default') {
            console.log('Solicitando permiso', Notification.permission);
            Notification.requestPermission((permission) => {
                if (permission === 'granted') {
                    getTokenNotificacion();
                }
            });
        }
    };
    notificarme();

    const openNotification = (messaging) => {
        // console.log('Notificación recibida', messaging);
        api.open({
            message: `${messaging.notification?.title ?? 'Título por defecto'} - ${new Date().toUTCString()}`,
            description: `${messaging.notification?.body ?? 'Descripción por defecto'}`,
            icon: <img src={messaging.notification?.image ?? imgDefecto} alt="Notificación" style={{ width: '30px', height: '30px' }} />,
            duration: 5,
            placement: 'bottomRight',
            style: {
                backgroundColor: '#FF9110',
                borderRadius: 15,
            }
        });
    };

    useEffect(() => {
        getTokenNotificacion();
        onMessage(messaging, message => {
            openNotification(message);
        });
    });

    return (
        <notificaciones.Provider value={{ openNotification }}>
            {contextHolder}
            {children}
        </notificaciones.Provider>
    );
};
