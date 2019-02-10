import { url } from './api.config';

export const getAllStudentData = (id) => {
    let finalFamilyMembers = [];

    const student = fetch(`${url}/api/students/${id}`)
            .then(response => response.json())
            .then(({firstName, lastName, dateOfBirth}) => {
                return {firstName, lastName, dateOfBirth};
            })
            .catch(error => console.log(error));

    const studentNationality = fetch(`${url}/api/Students/${id}/Nationality`)
            .then(response => response.json())
            .then(({ nationality }) => {
                return {nationality};
            })
            .catch(error => console.log(error));

    const familyMembers = fetch(`${url}/api/Students/${id}/FamilyMembers`)
            .then(response => response.json())
            .then(familyMembers => {
                finalFamilyMembers = familyMembers;

                const multipleRequests = familyMembers.map(
                    ({ ID }) => 
                    fetch(`${url}/api/FamilyMembers/${ID}/Nationality/`));
                
                return Promise.all(multipleRequests);
            })
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(familyNationalities => {
                const familyMembers = finalFamilyMembers.slice();
                familyNationalities.forEach((nationality, index) => {
                    familyMembers[index].nationalityID = nationality.ID;
                });

                return { familyMembers };
            })
            .catch(error => console.log(error));

    return Promise.all([student, studentNationality, familyMembers])
        .then(completeData => {
            const {firstName, lastName, dateOfBirth} = completeData[0];
            const {nationality} = completeData[1];
            const {familyMembers} = completeData[2];

            return {firstName, lastName, dateOfBirth, nationality, familyMembers }
        })
        .catch(error => console.log(error));
}