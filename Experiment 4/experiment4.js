document.getElementById("jobForm").addEventListener("submit", function(event) {
  event.preventDefault();

  
  const title = document.getElementById("title").value;
  const company = document.getElementById("company").value;
  const location = document.getElementById("location").value;
  const description = document.getElementById("description").value;

  
  const jobCard = document.createElement("div");
  jobCard.classList.add("job-card");

  jobCard.innerHTML = `
    <h3>${title}</h3>
    <p><strong>Company:</strong> ${company}</p>
    <p><strong>Location:</strong> ${location}</p>
    <p>${description}</p>
  `;

  
  document.getElementById("jobCards").appendChild(jobCard);

  
  document.getElementById("jobForm").reset();
});
