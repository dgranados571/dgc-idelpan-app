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

export interface GestionOrdenPedidoProps {
    setRedirect: React.Dispatch<React.SetStateAction<string>>;
    setCargando: React.Dispatch<React.SetStateAction<boolean>>;
    selecionaMenu: Function,
    menuLateral: MenuLateral[],
    setOrdenPedido: React.Dispatch<React.SetStateAction<OrdenPedidoProduct[]>>;
    ordenPedido: OrdenPedidoProduct[]
}

export interface MenuLateralProps {
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
    selecionaMenu: Function,
    menuLateral: MenuLateral[],
    openMenu: boolean,
    infoMenuUsuario: UsuarioSession
}

export interface ProductosProps {
    setOrdenPedido: React.Dispatch<React.SetStateAction<OrdenPedidoProduct[]>>;
    ordenPedido: OrdenPedidoProduct[]
}

export interface UsuarioSession {
    usuario: string;
    nombre_completo: string;
    id_procesamiento: string
}

export interface ModalProps {
    indiceMensaje: string;
    funcionSi: Function;
    funcionControl: Function;
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
    valorCanasta: number,
    productoPorCanasta?: number,
}

export interface IInventario {
    idProduct: string;
    product: Product;
    unidadDisponible: number
}

export interface DetalleProductState {
    idProduct: string;
    product: Product;
    activo: boolean;
}

export interface OrdenPedidoProduct {
    idProduct: string;
    product: Product;
    cantidadPaquetes: string;
    cantidadCanastas: string;
}

export interface GestionOrdenesDePedido {
    idOp: number,
    usuario: string;
    fechaOrdenPedido: string;
    idProcesamiento: string;
    productosLista: OrdenPedidoProduct[];
    estadoOP:string
}

export interface MenuLateral {
    nombreItem: string;
    className: string;
    iconMenu: IconDefinition
    controlVista: string
}

export interface IUsuarios {
    usuario: string;
    contrasenia: string;
    nombres: string;
    apellidos: string;
    tipo_identificacion: string;
    identificacion: string;
    correo: string;
    role: string;
    fecha_registro: string;
    fechaRegistroStr: string;
    usuario_activo: string;
    id_procesamiento: string;
    iniciales_nombre: string;
}

export interface IinfoDetalleOp {
    vistaActiva: boolean;
    idDetalleOp: string;
    idOp: number;
    estadoOp: string;
}


