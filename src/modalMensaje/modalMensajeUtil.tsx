import { IconDefinition, faCheckDouble, faExclamationCircle, faUserTimes  } from '@fortawesome/free-solid-svg-icons'

export const ModalMensajeUtil = () => {

  const modalInfo: { [key: string]: { titulo: string; descripcion: string; icono: IconDefinition, claseIcono: string; } } = {
    'Auth-001': {
      titulo: 'Se ha creado tu cuenta satisfactoriamente',
      descripcion: 'Para completar el proceso de registro, por favor verifique su dirección de correo electrónico.',
      icono: faCheckDouble,
      claseIcono: 'modal-icono'
    },
    'Auth-002': {
      titulo: '¡Ups! Tenemos dificultades técnicas.',
      descripcion: 'No es posible consultar la información en este momento. Por favor, contacte al administrador.',
      icono: faExclamationCircle,
      claseIcono: 'modal-icono-error'
    },
    'Auth-002-lambda': {
      titulo: '¡Ups! Tenemos dificultades en la comunicación.',
      descripcion: 'No es posible consultar la información en este momento. Por favor, contacte al administrador.',
      icono: faExclamationCircle,
      claseIcono: 'modal-icono-error'
    },
    'Auth-003': {
      titulo: '¡Vaya! No es posible crear la cuenta.',
      descripcion: 'Parece que ya existe un usuario con la información que ha ingresado. Por favor, verifíquela y vuelva a intentarlo.',
      icono: faUserTimes,
      claseIcono: 'modal-icono-error'
    },
    'Auth-004': {
      titulo: 'Logueo fallido.',
      descripcion: 'Usuario y/o contraseña incorrecto. Por favor, verifíque la información y vuelva a intentarlo.',
      icono: faUserTimes,
      claseIcono: 'modal-icono-error'
    },
    'Auth-005': {
      titulo: 'Error en la información',
      descripcion: 'Las constraseñas no son iguales. Por favor, verifíque la información y vuelva a intentarlo.',
      icono: faExclamationCircle,
      claseIcono: 'modal-icono-error'
    },
    'Auth-006': {
      titulo: 'La cuenta ha sido activada exitosamente.',
      descripcion: '¡Maravilloso! Ya puedes acceder a todos los servicios que te ofrece Idelpan.',
      icono: faCheckDouble,
      claseIcono: 'modal-icono'
    },
    'Auth-007': {
      titulo: 'Se ha enviado el correo exitosamente',
      descripcion: 'Hemos enviado un código de seguridad al correo registrado',
      icono: faCheckDouble,
      claseIcono: 'modal-icono'
    },
    'Auth-008': {
      titulo: 'Error en la validación.',
      descripcion: 'Parece que la información que suministras no es correcta. Por favor, verifícala y vuelve a intentarlo',
      icono: faExclamationCircle,
      claseIcono: 'modal-icono-error'
    },
    'Auth-009': {
      titulo: 'La contraseña ha sido restablecida exitosamente.',
      descripcion: '¡Maravilloso! Ya puedes acceder a todos los servicios que te ofrece Idelpan.',
      icono: faCheckDouble,
      claseIcono: 'modal-icono'
    },
    'Auth-010': {
      titulo: 'Sesión finalizada.',
      descripcion: 'Parece que la sesión ha expirado. Por favor, ingrese de nuevo.',
      icono: faUserTimes,
      claseIcono: 'modal-icono-error'
    },
    'Auth-011': {
      titulo: 'Se ha creado la orden.',
      descripcion: '¡Maravilloso! Ya tenemos tu orden de pedido y estamos trabajando en ella.',
      icono: faCheckDouble,
      claseIcono: 'modal-icono'
    },
    'Auth-012': {
      titulo: '¡Ups! Tenemos errores de comunicación.',
      descripcion: 'No es posible consultar la información en este momento. Por favor, contacte al administrador.',
      icono: faExclamationCircle,
      claseIcono: 'modal-icono-error'
    },
    'Auth-013': {
      titulo: 'Cliente eliminado exitosamente.',
      descripcion: 'Hemos perdido un cliente y con él sus ordenes de pedido.',
      icono: faCheckDouble,
      claseIcono: 'modal-icono'
    },
    'Auth-014': {
      titulo: 'Orden de pedido eliminada exitosamente.',
      descripcion: 'Hemos eliminado la orden de pedido satisfactoriamente.',
      icono: faCheckDouble,
      claseIcono: 'modal-icono'
    },
    'Auth-015': {
      titulo: 'Orden de pedido entregado.',
      descripcion: 'Hemos cumplido con tus productos Idelpan. Estaremos muy atentos a tus nuevas ordenes de pedido',
      icono: faCheckDouble,
      claseIcono: 'modal-icono'
    },
    'Auth-016': {
      titulo: 'Producto cargado satisfactoriamente.',
      descripcion: 'Ha sido actualizada el inventario de productos en la base de información',
      icono: faCheckDouble,
      claseIcono: 'modal-icono'
    }

  }

  return {
    modalInfo
  }

}
