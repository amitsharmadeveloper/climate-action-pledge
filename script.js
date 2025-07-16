// Optional: Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });

// Sample mock pledge data
const mockPledges = [
    { name: "Akhil", type: "Student" },
    { name: "Amit s", type: "Working Professional" },
    { name: "Riya", type: "Working Professional" },
    { name: "Rohit", type: "Student" },
    { name: "Priya", type: "Workshop" },
    { name: "Karan", type: "Working Professional" },
    { name: "Deepa", type: "Student" },
  ];
  
  // Count function
  function updateKPIStats(data) {
    document.getElementById("achievedPledges").textContent = data.length;
  
    let students = data.filter(p => p.type === "Student").length;
    let professionals = data.filter(p => p.type === "Working Professional").length;
    let workshops = data.filter(p => p.type === "Workshop").length;
  
    document.getElementById("studentCount").textContent = students;
    document.getElementById("professionalCount").textContent = professionals;
    document.getElementById("workshopCount").textContent = workshops;
  }
  
  updateKPIStats(mockPledges);
  
  // certificatecode
  document.getElementById("pledgeForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    // Get values from form
    const name = document.getElementById("name").value.trim();
    const state = document.getElementById("state").value.trim() || "Not provided";
    const profile = document.querySelector('input[name="profile"]:checked')?.value || "Not selected";
    const checkboxes = document.querySelectorAll('input[name="commitments"]:checked');
    const commitmentCount = checkboxes.length;
  
    // Generate star rating (1 star for every 3 actions, max 3)
    let starCount = Math.min(Math.ceil(commitmentCount / 3), 3); // 0–3
    let starRating = "★".repeat(starCount);
    if (starCount === 0) starRating = "—";
  
    // Build certificate HTML
    const certificateHTML = `
      <p><strong>${name}</strong></p>
      <p>Cool Enough to Care!</p>
      <p class="rating">${starRating}</p>
    `;
  
    // Show certificate
    const certificateDiv = document.getElementById("certificate");
    certificateDiv.innerHTML = certificateHTML;
    certificateDiv.style.display = "block";
    certificateDiv.scrollIntoView({ behavior: "smooth" });
  
    // Create random pledge ID
    const randomId = Math.floor(100000 + Math.random() * 900000);
    const pledgeId = `#P${randomId}`;
  
    // Format today's date
    const today = new Date();
    const date = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
  
    // Add row to pledge table
    const tableBody = document.getElementById("pledgeTable").querySelector("tbody");
    const newRow = document.createElement("tr");
  
    newRow.innerHTML = `
      <td>${pledgeId}</td>
      <td>${name}</td>
      <td>${date}</td>
      <td>${state}</td>
      <td>${profile}</td>
      <td>${starRating}</td>
    `;
  
    tableBody.appendChild(newRow);
  });
  
  