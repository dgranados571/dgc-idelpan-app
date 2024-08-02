import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import React from 'react'

export interface AuthProps {
    setRedirect: React.Dispatch<React.SetStateAction<string>>;
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TransaccionProps {
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DashBoardProps {
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MenuLateralProps {
    setRedirect: React.Dispatch<React.SetStateAction<string>>;
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
    openMenu: boolean,
    infoMenuUsuario: UsuarioSession
}

export interface UsuarioSession {
    usuario: string;
    nombre_completo: string;
    id_procesamiento: string
}

export interface ModalProps {
    funcionSi: Function;
    indiceMensaje: string;
}

export interface UserSession {
    usuario: string;
    nombres: string;
    apellidos: string;
    id_procesamiento: string;
}

export interface Product {
    nombre: string;
    PxC: number;
    valorPaquete: number,
    valorCanasta: number
}

export interface DetalleProductState {
    idProduct: string;
    product: Product;
    activo: boolean;
}

export interface OrdenPedidoProduct {
    idProduct: string;
    product: Product;
    tipoCompra: string;
    cantidad: string;
}

export interface GestionOrdenesDePedido {
    usuario: string;
    fechaOrdenPedido: string;
    idProcesamiento: string;
    productosLista: OrdenPedidoProduct[]
}

export interface MenuLateral {
    nombreItem: string;
    className: string;
    iconMenu: IconDefinition
    controlVista: string
}
