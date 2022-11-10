import axios from 'axios';
import { useAuth } from '../authentication/AuthProvider';

function ApiInterceptor({ children }) {
    const { userDetails } = useAuth()
    axios.interceptors.request.use(
        config => {
            const token = userDetails?.token
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token
            }
            return config
        },
        error => {
            Promise.reject(error)
        }
    )
    return children
}
export default ApiInterceptor