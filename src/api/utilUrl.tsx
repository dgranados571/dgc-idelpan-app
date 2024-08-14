
const urlEntornoLambda = 'https://cgmoazbtxd.execute-api.us-east-1.amazonaws.com/Stage/unadmin';
const urlEntornoLocal = 'http://localhost:8080';
const urlDominioServidor = 'http://44.223.150.80:8080';

export const UtilUrl = () => {

  const url: { [key: number]: { urlEntornoLambda: string; urlEntornoLocal: string; urlDominioServidor: string; pathLambda: string; } } = {
    1: {
      urlEntornoLambda,
      urlEntornoLocal,
      urlDominioServidor,
      pathLambda: '/service/idelpan/crearCuenta'
    },
    2: {
      urlEntornoLambda,
      urlEntornoLocal,
      urlDominioServidor,
      pathLambda: '/service/idelpan/logueo'
    },
    3: {
      urlEntornoLambda,
      urlEntornoLocal,
      urlDominioServidor,
      pathLambda: '/service/idelpan/actualizaPass'
    },
    4: {
      urlEntornoLambda,
      urlEntornoLocal,
      urlDominioServidor,
      pathLambda: '/service/idelpan/restablecePass'
    },
    5: {
      urlEntornoLambda,
      urlEntornoLocal,
      urlDominioServidor,
      pathLambda: '/service/idelpan/registraOp'
    },
    6: {
      urlEntornoLambda,
      urlEntornoLocal,
      urlDominioServidor,
      pathLambda: '/service/idelpan/consultaOp'
    },
    7: {
      urlEntornoLambda,
      urlEntornoLocal,
      urlDominioServidor,
      pathLambda: '/service/idelpan/consultaUsuarios'
    },
    8: {
      urlEntornoLambda,
      urlEntornoLocal,
      urlDominioServidor,
      pathLambda: '/service/idelpan/eliminaCliente'
    },
    9: {
      urlEntornoLambda,
      urlEntornoLocal,
      urlDominioServidor,
      pathLambda: '/service/idelpan/crearUsuariosApp'
    }
  };

  return {
    apiLambda: true,
    url
  }

}

