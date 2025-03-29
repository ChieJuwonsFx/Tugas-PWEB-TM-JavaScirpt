document.getElementById("adminForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const email = document.getElementById("email").value;
  const no_hp = document.getElementById("no_hp").value;
  const role = document.getElementById("role").value;

  if (!nama || !email || !no_hp || !role) {
    alert("Harap lengkapi semua data!");
    return;
  }

  const tableBody = document.querySelector(".data-table tbody");
  const newRow = document.createElement("tr");

  let roleClass = "role-";
  if (role.includes("Instagram")) roleClass += "instagram";
  else if (role.includes("YouTube")) roleClass += "youtube";
  else if (role.includes("Facebook")) roleClass += "facebook";
  else if (role.includes("TikTok")) roleClass += "tiktok";
  else if (role.includes("Owner")) roleClass += "owner";

  newRow.innerHTML = `
        <td>${nama}</td>
        <td>${email}</td>
        <td>${no_hp}</td>
        <td><span class="role-tag ${roleClass}">${role}</span></td>
        <td>
            <button class="action-button" title="Edit"><i class="fas fa-edit"></i></button>
            <button class="action-button" title="Hapus"><i class="fas fa-trash"></i></button>
        </td>
        `;

  tableBody.appendChild(newRow);

  this.reset();

  addRowEventListeners(newRow);

  alert("Admin baru berhasil ditambahkan!");
});

function addRowEventListeners(row) {
  row
    .querySelector(".fa-edit")
    .closest("button")
    .addEventListener("click", function () {
      editRow(row);
    });

  row
    .querySelector(".fa-trash")
    .closest("button")
    .addEventListener("click", function () {
      if (confirm("Apakah Anda yakin ingin menghapus admin ini?")) {
        row.remove();
        alert("Admin berhasil dihapus!");
      }
    });
}

function editRow(row) {
  const cells = row.querySelectorAll("td");
  const roleTag = row.querySelector(".role-tag");

  document.getElementById("nama").value = cells[0].textContent;
  document.getElementById("email").value = cells[1].textContent;
  document.getElementById("no_hp").value = cells[2].textContent;
  document.getElementById("role").value = roleTag.textContent;

  row.remove();

  document.querySelector(".card").scrollIntoView({ behavior: "smooth" });
}

document.querySelectorAll(".data-table tbody tr").forEach((row) => {
  addRowEventListeners(row);
});

document
  .querySelector(".search-box input")
  .addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const rows = document.querySelectorAll(".data-table tbody tr");

    rows.forEach((row) => {
      const nama = row
        .querySelector("td:nth-child(1)")
        .textContent.toLowerCase();
      const email = row
        .querySelector("td:nth-child(2)")
        .textContent.toLowerCase();
      const noHp = row
        .querySelector("td:nth-child(3)")
        .textContent.toLowerCase();

      if (
        nama.includes(searchTerm) ||
        email.includes(searchTerm) ||
        noHp.includes(searchTerm)
      ) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });
