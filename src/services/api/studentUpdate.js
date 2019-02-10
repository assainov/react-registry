import { url } from './api.config';

export const studentUpdateAPI = (id, basicInfo, nationalityID, UIFamilyMembers, DBFamilyMembers) => {
    let studentToUpdate;
    return fetch(`${url}/api/Students/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(basicInfo)
        })
        .then(response => response.json())
        .then(student => {
            studentToUpdate = student;

            return fetch(`${url}/api/Students/${student.ID}/Nationality/${nationalityID}`, {
                method: 'PUT'
            })
        })
        .then(response => response.json())
        .then(() => {
            const multipleRequests = DBFamilyMembers.map(({ID}) => 
                fetch(`${url}/api/FamilyMembers/${ID}`, {
                    method: 'DELETE'
                })
            );

            return Promise.all(multipleRequests);
        })
        .then(() => {
            const multipleRequests = UIFamilyMembers.map(
                ({ firstName, lastName, dateOfBirth, relationship }) => 
                fetch(`${url}/api/Students/${id}/FamilyMembers/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ firstName, lastName, dateOfBirth, relationship })
                }));
            
            return Promise.all(multipleRequests);
            })
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(addedFamilyMembers => {
            const multipleRequests = addedFamilyMembers.map(
                ({ ID }, index) => 
                fetch(`${url}/api/FamilyMembers/${ID}/Nationality/${UIFamilyMembers[index].nationalityID}`, {
                    method: 'PUT'
                }));
            
            return Promise.all(multipleRequests);
        })
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(() => studentToUpdate);
}