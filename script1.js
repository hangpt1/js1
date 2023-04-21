// load html => load js => thuc thi

class User {
  constructor(id, name, price, detail, color) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.detail= detail;
    this.color= color;
  }
}
class App {
  renderUser(users) {
    let userTableTbody = document.querySelector('#tbody');
    let userTableBodyHtml = '';
    for (let user of users) {
      userTableBodyHtml += `<tr id="row${user.id}">
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.price}</td>
          <td>${user.detail}</td>
          <td>${user.color}</td>
          <td>
            <button class="btn btn-edit" data-id="${user.id}">Edit</button>
            <button class="btn btn-delete" data-id="${user.id}" >Delete</button>
          </td>
        </tr>`;
    }
    userTableTbody.innerHTML = userTableBodyHtml;
    initsDeleteHandle();
    initseditHandle();
  }
}

let users = [];
let app = new App();
let userCreate = new User(0, 'hang', '12', 'beautiful', 'blue');
users.push(userCreate);
app.renderUser(users);

let submitBtn = document.querySelector('#submit');
let editBtns = document.querySelectorAll('.btn-edit');

let nameEl = document.querySelector('#name');
let priceEl = document.querySelector('#price');
let detailEl = document.querySelector('#detail');
let colorEl = document.querySelector('#color');
// 0, '', null, undifined ,
// abc (string) => Boolean('abc') => true
let editId = '';

class ValidateInput {
  constructor(formData) {
    this.formData = formData;
    this.errors = [];
  }

  require(mess = 'khong duoc de trong') {
    for (const [key, value] of this.formData.entries()) {
      console.log(key, value);
      if (!Boolean(value)) {
        // true
        let errorMess = `${key} ${mess}`;
        this.errors.push([key, errorMess]);
      }
    }
    return this.errors;
  }
}

// [['name',['khong de trong', 'gia tri lon hon 10']] ,['name','khong de trong']  ]

submitBtn.addEventListener('click', function () {
  if (editId) {
    let userEditIndex = users.findIndex((item) => item.id == editId);
    let userEdit = users[userEditIndex];
    userEdit.name = nameEl.value;
    userEdit.price = priceEl.value;
    userEdit.detail = detailEl.value;
    userEdit.color = colorEl.value;
    app.renderUser(users);
    resetForm();
    // clear
  } else {
    let id = parseInt(Math.random() * 100);

    let formData = new FormData(document.querySelector('#form-data'));

    let errors = new ValidateInput(formData).require('đâu!!!!!');
    resetError();
    if (errors.length > 0) {
      for (let [key, mess] of errors) {
        document.querySelector(`.${key}-error`).innerHTML  = mess;
      }
      return;
    }

    let userCreate = new User(id, nameEl.value, priceEl.value, detailEl.value, colorEl.value)
    users.push(userCreate);
    app.renderUser(users);
    resetForm();
  }
});
function resetError() {
  document.querySelectorAll('.error').forEach((item) => (item.innerHTML = ''));
}
function resetForm() {
  nameEl.value = '';
  priceEl.value = '';
  detailEl.value = '';
  colorEl.value = '';
  editId = '';
}


function initseditHandle(){
  let editBtns = document.querySelectorAll('.btn-edit');
  editBtns.forEach((item) => {
    item.addEventListener('click', function () {
      editId = this.getAttribute('data-id');
      let userEditIndex = users.findIndex((item) => item.id == editId);
      let userEdit = users[userEditIndex];
      nameEl.value = userEdit.name;
      priceEl.value = userEdit.price;
      detailEl.value = userEdit.detail;
      colorEl.value = userEdit.color;
    });
  });
}


function initsDeleteHandle() {
  let deleteBtns = document.querySelectorAll('.btn-delete');
  deleteBtns.forEach((item) => {
    item.addEventListener('click', function () {
      let isDelete = confirm('Muốn thì xoá không muốn thì xoá');
      if (isDelete) {
        let id = item.getAttribute('data-id'); // lay id
        let userIndex = users.findIndex((item) => item.id == id); // lay vi tri
        console.log(users);
        users.splice(userIndex, 1); // xoa 1 phan tu trong mang bat dau tu vi tri
        console.log(users);
        // document.querySelector(`#row${id}`).remove();
        app.renderUser(users); // hien thi lai danh sach
      }
    });
  });
}
