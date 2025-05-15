const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const descriptionInput = document.getElementById('description');
const saveBtn = document.getElementById('save');
const list = document.getElementById('list');

async function loadEntries() {
  const entries = await window.api.getPasswords();
  list.innerHTML = ''; // Limpa a tabela antes de adicionar novas linhas

  entries.forEach(({ email, password, description }) => {
    const tr = document.createElement('tr');  // Cria uma nova linha da tabela

    // Cria células para cada campo e adiciona à linha
    const tdEmail = document.createElement('td');
    tdEmail.textContent = email;
    tr.appendChild(tdEmail);

    const tdPassword = document.createElement('td');
    tdPassword.textContent = password;
    tr.appendChild(tdPassword);

    const tdDescription = document.createElement('td');
    tdDescription.textContent = description;
    tr.appendChild(tdDescription);

    list.appendChild(tr);  // Adiciona a linha à tabela
  });
}

saveBtn.addEventListener('click', async () => {
  const data = {
    email: emailInput.value,
    password: passwordInput.value,
    description: descriptionInput.value,
  };

  await window.api.addPassword(data);
  await loadEntries();

  // Limpa os campos de entrada
  emailInput.value = '';
  passwordInput.value = '';
  descriptionInput.value = '';
});

window.addEventListener('DOMContentLoaded', loadEntries);
