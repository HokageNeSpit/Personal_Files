var personnel_department_system = '';
var file_of_the_media_library = '';
var products = '';
var personnel_department_system_id_list = `<form action="/add_register_of_entries_in_the_workbook">
                                          <label for="number">Номер трудової книжки</label>
                                          <input type="text" name="number" id="number">
                                          <label for="date">Дата створення</label>
                                          <input type="text" name="date" id="date">
                                          <label for="work_place">Місце роботи</label>
                                          <input type="text" name="work_place" id="work_place">
                                          <select name="personnel_department_system_id" id="personnel_department_system_id">`;

async function getData(url = '') {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer'
    });
    return await response.json();
  }
  
  getData('/get_personnel_department_system')
  .then((data) => {
    var i = 1;
    data.forEach(el => {
      show_book(i, el.id, el.personal_affairs, el.personal_affairs, el.photo);
      i++;
    });
  });

  getData('/get_personnel_department_system')
  .then((data) => {
    data.forEach(el => {
      personnel_department_system_id_list += `<option>${el.id}</option>`;
    });
    document.getElementById('personnel_department_system_list').innerHTML = `${personnel_department_system_id_list}</select>
                                                                              <input type="submit" value="Add">
                                                                              </form>`;
  });
  
function search_personnel_department_system() {
  getData('/get_personnel_department_system')
  .then((data) => {
    data.forEach(el => {
      if (el.personal_affairs === document.getElementById('search_personnel_department_system').value){
        show_searched_information( el.id, el.personal_affairs, el.personal_affairs, el.photo); 
      }
    });
  });
}

async function show_book(i, id, personal_affairs, personal_affairs, photo) {
  await getData(`/get_register_of_entries_in_the_workbook?id=${id}`)
  .then((data) => {
    data.forEach(el => {
      personnel_department_system += `${i}) <br /> Id: ${id} <br />Особова справа: ${personal_affairs}<br /> Фото:<br /><img src="${photo}" alt="Фото не найдено" width="50px" height="70px"><br />Номер трудової книжки: ${el.number} <br /> Дата створення: ${el.date} <br /> Місце роботи: ${el.work_place}<br /><a href="http://localhost:3000/delete_personnel_department_system?id=${id}" class="button">Delete</a> <br /> <hr />`;
    });
  });
  document.getElementById('personnel_department_system').innerHTML = personnel_department_system;
}

async function show_searched_information(id, personal_affairs, personal_affairs, photo) {
  await getData(`/get_register_of_entries_in_the_workbook?id=${id}`)
  .then((data) => {
    data.forEach(el => {
      var personnel_department_system_searched = `Id: ${id} <br />Особова справа: ${personal_affairs}<br /> Фото:<br /><img src="${photo}" alt="Фото не найдено" width="50px" height="70px"><br />Номер трудової книжки: ${el.number} <br /> Дата створення: ${el.date} <br /> Місце роботи: ${el.work_place}<br /><a href="http://localhost:3000/delete_personnel_department_system?id=${id}" class="button">Delete</a> <br /> <hr />`;
      document.getElementById('searched_personnel_department_system').innerHTML = personnel_department_system_searched;
     });
  });
}


