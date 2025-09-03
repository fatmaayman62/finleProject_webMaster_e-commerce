document.addEventListener("DOMContentLoaded", function () {
  loadMessages();

  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    saveMessage();
  });
});

function saveMessage() {
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email_").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  if (!fullName || !email || !message) {
    alert("Please fill in all required fields");
    return;
  }

  const messageObj = {
    fullName,
    email,
    phone,
    message,
    date: new Date().toLocaleString(),
  };

  let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
  messages.push(messageObj);
  localStorage.setItem("contactMessages", JSON.stringify(messages));

  document.getElementById("contactForm").reset();
  loadMessages();
  alert("Your message has been sent successfully!");
}

function loadMessages() {
  const messageList = document.getElementById("messageList");
  const savedMessages = document.getElementById("savedMessages");

  const messages = JSON.parse(localStorage.getItem("contactMessages")) || [];

  if (messages.length > 0) {
    savedMessages.classList.remove("d-none");
    messageList.innerHTML = "";

    messages.slice().reverse().forEach((msg, index) => {
      const messageElement = document.createElement("div");
      messageElement.className = "bg-white p-3 mb-3 border-start border-4 border-primary";
      messageElement.innerHTML = `
        <div class="d-flex justify-content-between border-bottom pb-2 mb-2">
          <span class="fw-bold">${msg.fullName}</span>
          <span class="text-muted small">${msg.date}</span>
        </div>
        <div>
          <p class="mb-1"><strong>Email:</strong> ${msg.email}</p>
          ${msg.phone ? `<p class="mb-1"><strong>Phone:</strong> ${msg.phone}</p>` : ""}
          <p class="mb-0"><strong>Message:</strong> ${msg.message}</p>
        </div>
        <button class="btn btn-danger btn-sm mt-2" onclick="deleteMessage(${messages.length - 1 - index})">Delete</button>
      `;
      messageList.appendChild(messageElement);
    });
  } else {
    savedMessages.classList.add("d-none");
  }
}

function deleteMessage(index) {
  let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
  messages.splice(index, 1);
  localStorage.setItem("contactMessages", JSON.stringify(messages));
  loadMessages();
}