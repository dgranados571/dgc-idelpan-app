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
      titulo: 'La cuenta ha sido activada satisfactoriamente.',
      descripcion: '¡Maravilloso! Ya puedes acceder a todos los servicios que te ofrece Idelpan.',
      icono: faCheckDouble,
      claseIcono: 'modal-icono'
    }
  }

  return {
    modalInfo
  }

}
