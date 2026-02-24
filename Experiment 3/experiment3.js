document.getElementById('jobForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const jobTitle = document.getElementById('jobTitle').value;
    const location = document.getElementById('location').value;
    const salary = document.getElementById('salary').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;

    
    document.getElementById('profileName').textContent = name;
    document.getElementById('profileEmail').textContent = email;
    document.getElementById('profilePhone').textContent = phone;
    document.getElementById('profileJobTitle').textContent = jobTitle;
    document.getElementById('profileLocation').textContent = location;
    document.getElementById('profileSalary').textContent = salary;
    document.getElementById('profileExperience').textContent = experience;
    document.getElementById('profileSkills').textContent = skills;

    document.getElementById('userProfile').style.display = 'block';
});
