document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("studentForm");
    let counter = 1;
    let hobbyInputs = document.querySelectorAll('#hobbies input[type="checkbox"]');

    hobbyInputs.forEach(function (input) {
        input.addEventListener('change', updateCheckboxValue);
    });

    function updateCheckboxValue() {
        let atLeastOneChecked = false;
        hobbyInputs.forEach(function (input) {
            if (input.checked) {
                atLeastOneChecked = true;
            }
        });

        if (atLeastOneChecked) {
            hobbyInputs.forEach(function (input) {
                input.removeAttribute('required');
            });
            document.getElementById('hobbies-error').style.display = 'none';
        } else {
            hobbyInputs.forEach(function (input) {
                input.setAttribute('required', true);
            });
            document.getElementById('hobbies-error').style.display = 'block';
        }
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        updateCheckboxValue(); 

        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

    
        let studentUid = document.getElementById('Students_Uid').value;
        let studentFirstName = document.getElementById('Students_FirstName').value;
        let studentLastName = document.getElementById('Students_LastName').value;
        let studentName = studentFirstName + ' ' + studentLastName;
        let studentEmail = document.getElementById('studentsEmail').value;
        let gender = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
        let dobDay = document.getElementById('Date').value;
        let dobMonth = document.getElementById('Month').value;
        let dobYear = document.getElementById('Year').value;
        let dob = `${dobDay}-${dobMonth}-${dobYear}`;
        let studentContactNo = document.getElementById('studentsContact').value;
        let hobbies = "";
        let checkedHobbies = document.querySelectorAll('input[type="checkbox"]:checked');
            checkedHobbies.forEach(function (checkbox) {
                hobbies += checkbox.value + ", ";
            });
            hobbies = hobbies.slice(0, -2);

        let newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${counter}</td>
                            <td>${studentUid}</td>
                            <td>${studentName}</td>
                            <td>${studentEmail}</td>
                            <td>${gender}</td>
                            <td>${dob}</td>
                            <td>${studentContactNo}</td>
                            <td>${hobbies}</td>`;
        document.getElementById("studentTableBody").appendChild(newRow);

        let studentData = {
            uid: studentUid,
            firstName: studentFirstName,
            lastName: studentLastName,
            email: studentEmail,
            gender: gender,
            dob: dob,
            contactNo: studentContactNo,
            hobbies: hobbies,
        };

        let storedData = JSON.parse(localStorage.getItem('studentData')) || [];
        storedData.push(studentData);
        localStorage.setItem('studentData', JSON.stringify(storedData));

        counter++;
        form.reset();
        form.classList.remove('was-validated');
    });
    let storedData = JSON.parse(localStorage.getItem('studentData')) || [];
    storedData.forEach(function (studentData) {
        let newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${counter}</td>
                            <td>${studentData.uid}</td>
                            <td>${studentData.firstName + ' ' + studentData.lastName}</td>
                            <td>${studentData.email}</td>
                            <td>${studentData.gender}</td>
                            <td>${studentData.dob}</td>
                            <td>${studentData.contactNo}</td>
                            <td>${studentData.hobbies}</td>`;
        document.getElementById("studentTableBody").appendChild(newRow);
        counter++;
    });
});


