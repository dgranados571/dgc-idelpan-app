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
