import Axios from 'axios';

const FileService = {

    async getFile (path) {
        console.log(path)
        return Axios.get('file/fileName', {
            params: {
                path
            },
            baseURL: `http://localhost:3000`,
            responseType: 'blob'
        })
    },
    async index () {
        const res = await Axios.get('file', 
            {
                baseURL: `http://localhost:3000`,
            }   
        )
        return res.data
    }


}

export default FileService