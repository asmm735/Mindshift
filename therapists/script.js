document.addEventListener('DOMContentLoaded', () => {
  const therapists = [
    {
      name: 'Dr. Jane Smith',
      specialty: 'Cognitive Behavioral Therapy',
      contact: 'jane.smith@example.com'
    },
    {
      name: 'Dr. John Doe',
      specialty: 'Mindfulness and Stress Reduction',
      contact: 'john.doe@example.com'
    },
    {
      name: 'Dr. Emily Johnson',
      specialty: 'Child and Adolescent Therapy',
      contact: 'emily.johnson@example.com'
    }
  ];

  const therapistsList = document.getElementById('therapists');

  therapists.forEach(therapist => {
    const li = document.createElement('li');
    const name = document.createElement('h3');
    name.textContent = therapist.name;
    const specialty = document.createElement('p');
    specialty.textContent = `Specialty: ${therapist.specialty}`;
    const contact = document.createElement('p');
    contact.textContent = `Contact: ${therapist.contact}`;

    li.appendChild(name);
    li.appendChild(specialty);
    li.appendChild(contact);

    therapistsList.appendChild(li);
  });
});
