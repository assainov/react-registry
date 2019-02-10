import { url } from './api.config';

export const getStudentList = () => {
    return fetch(`${url}/api/students`)
            .then((response) => {
                return response.json();
            })
            .then((students) => {
                return students;
            });
}