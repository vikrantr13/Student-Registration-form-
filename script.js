const registrationForm = document.getElementById('registrationForm');
    const storeTag = document.getElementById('storage');

    // Function to display stored data
    function displayStoredData() {
      const students = JSON.parse(localStorage.getItem('students')) || [];
      students.forEach(student => {
        createStudentInfoItem(student);
      });
    }

    // Handle form submission
    registrationForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent form submission

      // Get values from the form
      const studentName = document.getElementById('studentName').value;
      const studentID = document.getElementById('studentID').value;
      const email = document.getElementById('email').value;
      const contactNo = document.getElementById('contactNo').value;

      // Store student info in an object
      const student = { studentName, studentID, email, contactNo };

      // Save to localStorage
      const students = JSON.parse(localStorage.getItem('students')) || [];
      students.push(student);
      localStorage.setItem('students', JSON.stringify(students));

      // Display the newly added student info
      createStudentInfoItem(student);

      // Clear the form after submission
      registrationForm.reset();
    });

    // Function to create and display student info item
    function createStudentInfoItem(student) {
      const toDo = document.createElement('div');
      toDo.classList.add('todo-item');

      // Create the task text (student info)
      const item = document.createElement('p');
      item.textContent = `Student: ${student.studentName}, ID: ${student.studentID}, Email: ${student.email}, Contact No: ${student.contactNo}`;

      // Create the edit button
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.classList.add('edit-btn');

      // Create the delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('delete-btn');

      // Event listener for delete
      deleteBtn.addEventListener('click', function() {
        // Remove from localStorage
        let students = JSON.parse(localStorage.getItem('students'));
        students = students.filter(s => s.studentID !== student.studentID);
        localStorage.setItem('students', JSON.stringify(students));

        // Remove the student item from the page
        storeTag.removeChild(toDo);
      });

      // Event listener for edit
      editBtn.addEventListener('click', function() {
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = item.textContent;

        inputField.addEventListener('blur', function() {
          item.textContent = inputField.value;
          toDo.replaceChild(item, inputField);
        });

        inputField.focus();
        toDo.replaceChild(inputField, item);
      });

      // Append the text and buttons to the student info item
      const todoBtns = document.createElement('div');
      todoBtns.classList.add('todo-btns');
      todoBtns.appendChild(editBtn);
      todoBtns.appendChild(deleteBtn);

      toDo.appendChild(item);
      toDo.appendChild(todoBtns);

      // Append the registered student info item to the storage container
      storeTag.appendChild(toDo);
    }

    // Display stored data when the page loads
    displayStoredData();
 
