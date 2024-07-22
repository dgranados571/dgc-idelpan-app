
const urlEntornoLambda = 'https://cgmoazbtxd.execute-api.us-east-1.amazonaws.com/Stage/unadmin';
const urlEntornoLocal = 'http://localhost:8080';
const urlDominioServidor = 'http://54.210.214.166:8080';

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
    }
  };

  return {
    apiLambda: false,
    url
  }

}

