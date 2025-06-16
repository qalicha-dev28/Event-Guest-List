// Select DOM elements
const guestForm = document.getElementById("guest-form");
const guestNameInput = document.getElementById("guest-name");
const guestCategorySelect = document.getElementById("guest-category");
const guestList = document.getElementById("guest-list");

let guestCount = 0;
const maxGuests = 10;

// Handle form submit
guestForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = guestNameInput.value.trim();
  const category = guestCategorySelect.value;

  if (name === "") {
    alert("Please enter a guest's name.");
    return;
  }

  if (guestCount >= maxGuests) {
    alert("Guest limit reached. You can only add up to 10 guests.");
    return;
  }

  addGuest(name, category);
  guestNameInput.value = "";
  guestCategorySelect.value = "Friend";
});

function addGuest(name, category) {
  const li = document.createElement("li");
  li.classList.add("guest-item", category.toLowerCase());

  const timeAdded = new Date().toLocaleTimeString();

  const nameSpan = document.createElement("span");
  nameSpan.className = "guest-name";
  nameSpan.textContent = name;

  const info = document.createElement("span");
  info.className = "guest-info";
  info.innerHTML = ` (${category}) at ${timeAdded} `;

  const rsvpBtn = document.createElement("button");
  rsvpBtn.textContent = "RSVP: Not Attending";
  rsvpBtn.addEventListener("click", function () {
    rsvpBtn.textContent = rsvpBtn.textContent.includes("Not")
      ? "RSVP: Attending"
      : "RSVP: Not Attending";
  });

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", function () {
    const newName = prompt("Update the guest name:", nameSpan.textContent);
    if (newName && newName.trim() !== "") {
      nameSpan.textContent = newName.trim();
    }
  });

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", function () {
    guestList.removeChild(li);
    guestCount--;
  });

  li.appendChild(nameSpan);
  li.appendChild(info);
  li.appendChild(rsvpBtn);
  li.appendChild(editBtn);
  li.appendChild(removeBtn);
  guestList.appendChild(li);

  guestCount++;
}