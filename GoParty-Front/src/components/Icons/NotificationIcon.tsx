import React from 'react';
import { Icons } from './Icons';
import { TipoNotificacao } from '../../types/NotificationType';

interface NotificationIconProps {
    tipoNotificacao: TipoNotificacao;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ tipoNotificacao }) => {
    const Icon = Icons[tipoNotificacao];
    return Icon ? Icon : null;
};

export default NotificationIcon;