import axios from 'axios'

export class AuthServices {

    requestPost(body: any): Promise<any> {
        const headers = {
            'Content-Type': 'application/json'
        }
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:80/service/idelpan/crearCuenta`, body, {
                headers
            }).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        })
    }

}