import { url } from './api.config';

export const studentSubmitAPI = (basicInfo, nationalityID, familyMembers) => {
    let studentToPost;
    return fetch(`${url}/api/students`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(basicInfo)
        })
            .then(response => response.json())
            .then(student => { 
                studentToPost = student;

                return fetch(`${url}/api/Students/${student.ID}/Nationality/${nationalityID}`, {
                    method: 'PUT'
                })
            })
            .then(response => response.json())
            .then(student => {
                const multipleRequests = familyMembers.map(
                    ({ firstName, lastName, dateOfBirth, relationship }) => 
                    fetch(`${url}/api/Students/${student.ID}/FamilyMembers/`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ firstName, lastName, dateOfBirth, relationship })
                    }));
                
                return Promise.all(multipleRequests)
                })
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(addedFamilyMembers => {
                const multipleRequests = addedFamilyMembers.map(
                    ({ ID }, index) => 
                    fetch(`${url}/api/FamilyMembers/${ID}/Nationality/${familyMembers[index].nationalityID}`, {
                        method: 'PUT'
                    }));
                
                return Promise.all(multipleRequests)
            })
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(() => studentToPost);
}