import { url } from './api.config';

export const getNationalities = () => {
        return fetch(`${url}/api/nationalities`)
                .then(response => response.json())
                .then(response => {
                return response;
                });
}