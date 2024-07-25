import React from 'react'

export interface AuthProps {
    setRedirect: React.Dispatch<React.SetStateAction<string>>;
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TransaccionProps {
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DashBoardProps {
    setRedirect: React.Dispatch<React.SetStateAction<string>>;
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
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
    activo: boolean;
    product: Product;
}

export interface OrdenPedidoProduct {
    product: Product;
    tipoCompra: string;
    cantidad: string;    
}
