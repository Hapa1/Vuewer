import Axios from 'axios';
import config from '../../config/dev'

const FileService = {

    async getFile (path) {
        return Axios.get('file/fileName', {
            params: {
                path
            },
            baseURL: config.apiEndpoint,
            responseType: 'blob'
        })
    },
    async index () {
        const res = await Axios.get('file', 
            {
                baseURL: config.apiEndpoint,
            }   
        )
        return res.data
    }


}

export default FileService