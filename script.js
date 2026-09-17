const API_URL = "http://127.0.0.1:8000/api/students/";
let students = [];

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const search = document.getElementById("search");
const message = document.getElementById("message");
const cancelBtn = document.getElementById("cancelBtn");

function showMessage(text, ok = true) {
  message.textContent = text;
  message.style.color = ok ? "green" : "crimson";
  setTimeout(() => message.textContent = "", 3000);
}

async function loadStudents() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Could not load records");
    students = await response.json();
    renderStudents();
  } catch (error) {
    showMessage("Backend is not running. Start Django first.", false);
  }
}

function renderStudents() {
  const q = search.value.toLowerCase().trim();
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.register_number.toLowerCase().includes(q) ||
    s.department.toLowerCase().includes(q)
  );

  table.innerHTML = "";
  document.getElementById("empty").style.display = filtered.length ? "none" : "block";

  filtered.forEach(s => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${escapeHtml(s.name)}</td>
      <td>${escapeHtml(s.register_number)}</td>
      <td>${escapeHtml(s.department)}</td>
      <td>${escapeHtml(s.email)}</td>
      <td>${escapeHtml(s.phone)}</td>
      <td>
        <div class="action-group">
          <button class="edit" onclick="editStudent(${s.id})">Edit</button>
          <button class="delete" onclick="deleteStudent(${s.id})">Delete</button>
        </div>
      </td>`;
    table.appendChild(row);
  });
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("studentId").value;
  const data = {
    name: document.getElementById("name").value.trim(),
    register_number: document.getElementById("register_number").value.trim(),
    department: document.getElementById("department").value,
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim()
  };

  if (!/^[0-9]{10}$/.test(data.phone)) {
    showMessage("Phone must contain exactly 10 digits.", false);
    return;
  }

  try {
    const response = await fetch(id ? API_URL + id + "/" : API_URL, {
      method: id ? "PUT" : "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(Object.values(result).flat().join(" "));
    }

    showMessage(id ? "Student updated successfully." : "Student added successfully.");
    resetForm();
    await loadStudents();
  } catch (error) {
    showMessage(error.message || "Operation failed.", false);
  }
});

window.editStudent = function(id) {
  const s = students.find(x => x.id === id);
  if (!s) return;

  document.getElementById("studentId").value = s.id;
  document.getElementById("name").value = s.name;
  document.getElementById("register_number").value = s.register_number;
  document.getElementById("department").value = s.department;
  document.getElementById("email").value = s.email;
  document.getElementById("phone").value = s.phone;
  document.getElementById("formTitle").textContent = "Edit Student";
  cancelBtn.classList.remove("hidden");
  window.scrollTo({top:0, behavior:"smooth"});
};

window.deleteStudent = async function(id) {
  if (!confirm("Are you sure you want to delete this student?")) return;

  try {
    const response = await fetch(API_URL + id + "/", {method:"DELETE"});
    if (!response.ok) throw new Error("Delete failed");
    showMessage("Student deleted successfully.");
    await loadStudents();
  } catch (error) {
    showMessage(error.message, false);
  }
};

function resetForm() {
  form.reset();
  document.getElementById("studentId").value = "";
  document.getElementById("formTitle").textContent = "Add Student";
  cancelBtn.classList.add("hidden");
}

cancelBtn.addEventListener("click", resetForm);
search.addEventListener("input", renderStudents);
loadStudents();
