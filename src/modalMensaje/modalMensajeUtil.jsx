import { faCheckDouble, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

export const ModalMensajeUtil = () => {
  
    const modalInfo = {
      1: {
        titulo: 'Se ha creado tu cuenta satisfatoriamente',
        descripcion: 'Para completar el proceso de registro, por favor verifica tu dirección de correo electrónico',
        icono: faCheckDouble,
        claseIcono: 'modal-icono'
      },
      2: {
        titulo: 'Upps¡¡ Tenemos dificultades técnicas',
        descripcion: 'No es posible consultar la información en éste momento, por favor contacte al administrador',
        icono: faExclamationCircle,
        claseIcono: 'modal-icono-error'
      }
    }
  
    return {
        modalInfo
    }
  
  }
  