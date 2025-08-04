const mentors = [
  "Shrouk Ghania", "Hager Hossam", "Sosana Emad", "Baraa Rabea", "Nesma Farid",
  "Rewan Ramadan", "Ahmed Samir", "Abdallah Ahmed", "Rehab Mohamed", "Noha Abdelrheem"
];

const sessionSlots = ["3:00", "4:30", "6:00", "7:30", "9:00"];

function createMentorCard(name, mentorIndex) {
  const card = document.createElement("div");
  card.className = "mentor-card";

  const title = document.createElement("div");
  title.className = "mentor-name";
  title.innerText = name;
  card.appendChild(title);

  sessionSlots.forEach((slot, slotIndex) => {
  const slotRow = document.createElement("div");
  slotRow.className = "slot";

  const label = document.createElement("div");
  label.className = "slot-label";
  label.innerText = slot;

  const button = document.createElement("button");
  button.className = "toggle-button";
  button.innerText = "Free";

  button.addEventListener("click", () => {
    const isNowOccupied = button.classList.toggle("occupied");
    const newStatus = isNowOccupied ? "Occupied" : "Free";
    button.innerText = newStatus;

    const mentorIndex = mentors.indexOf(name); // ⬅️ عرفنا الاندكس الصح
    fetch("/toggle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mentorIndex: mentorIndex,
        slotIndex: slotIndex
      })
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          console.error("Failed to update status");
        }
      });
  });

  slotRow.appendChild(label);
  slotRow.appendChild(button);
  card.appendChild(slotRow);
});


  return card;
}


document.addEventListener("DOMContentLoaded", () => {
  const mentorsContainer = document.getElementById("mentors");
  mentors.forEach((mentor) => {
    const card = createMentorCard(mentor);
    mentorsContainer.appendChild(card);
  });
});