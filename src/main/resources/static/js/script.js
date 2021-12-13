/*Validacion de Datos para Usuarios*/
function userValidation(formName) {
    if (formName == "logInForm") {
        let email = $("#userEmail").val();
        let password = $("#userPassword").val();

        sessionStorage.setItem("email", email);
        sessionStorage.setItem("password", password);

        if ((email == "") || (password == "")) {
            alert("Debe diligenciar los campos");
        } else {
            if (!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))) {
                alert("La dirección de email es incorrecta.");
            } else {
                $.ajax({
                    //url: "http://localhost:8080/api/user/" + email + "/" + password + "",
                    url: "http://152.70.209.140:8080/api/user/" + email + "/" + password + "",
                    type: "GET",
                    datatype: "JSON",
                    success: function (item) {
                        console.log(item);
                     
                            userVerification(item);
                  
                    }
                });
                clearFields(formName);
            }
        }
    } 
}

///Validacion datos para administrador
function userValidationAdmin(formName) {
    if (formName == "logInForm") {
        let email = $("#userEmail").val();
        let password = $("#userPassword").val();
        console.log(password);
        if ((email == "") || (password == "")) {
            alert("Debe diligenciar los campos");
        } else {
            if (!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))) {
                alert("La dirección de email es incorrecta.");
            } else {
                $.ajax({
                    //url: "http://localhost:8080/api/user/" + email + "/" + password + "",
                    url: "http://152.70.209.140:8080/api/user/" + email + "/" + password + "",
                    type: "GET",
                    datatype: "JSON",
                    success: function (item) {
                        console.log(item);
                        if (item.type == "ADM") {
                            userVerification(item);
                            window.location.href = "admon.html";
                            sessionStorage.setItem("NombreUsuario", item.name);
                        } else {
                            alert("No eres un administrador")
                        }
                    }
                });
                clearFields(formName);
            }
        }
    }
}

function admVerification(user) {
    if (user.type != "ADM") {
        alert("Usted no es administrador de esta Aplicación Web");
    } else {
        alert("Bienvenido " + user.name);
        console.log(user.id);
        window.location.href = "admon.html";
    }
}

/**Determina si existe el usuario o no */
function userVerification(user) {
    if (user.type === "ASE") {
        alert("Bienvenid@ Asesor : " + user.name);
        console.log(user.id);
        window.location.href = "user.html";
    } else if (user.type === "COORD") {
        alert("Bienvenid@ Coordinador : " + user.name);
        console.log(user.id);
        window.location.href = "coordForm.html";
    } else if (user.type === "ADM") {
        alert("Bienvenid@ Administrador : " + user.name);
        console.log(user.id);
        window.location.href = "admon.html";
    } else{
        alert("No se encuentra Registrado")
    }
}

function userPage() {
    console.log("Estoy en userPage");
    let email = sessionStorage.getItem("email");
    let password = sessionStorage.getItem("password");
    console.log(password);
    $.ajax({
        //url: "http://localhost:8080/api/user/" + email + "/" + password + "",
        url: "http://152.70.209.140:8080/api/user/" + email + "/" + password + "",
        type: "GET",
        datatype: "JSON",
        success: function (item) {
            console.log(item);
            let userList = "<ul>";
            userList += "<li><b>Identificación:</b> " + item.identification + "</li>";
            userList += "<li><b>Nombre:</b> " + item.name + "</li>";
            userList += "<li><b>N° Celular:</b> " + item.cellPhone + "</li>";
            userList += "<li><b>Email:</b> " + item.email + "</li>";
            userList += "<li><b>Zona:</b> " + item.zone + "</li>";
            userList += "<li><b>Tipo:</b> " + item.type + "</li>";
            userList += "</ul>";
            $("#userData").append(userList);
            let salesman = item.name;
            let zone = item.zone;
            sessionStorage.setItem("salesman", salesman);
            sessionStorage.setItem("zone", zone);
            sessionStorage.setItem("user", JSON.stringify(item));
        }
    });
}


function coordPage() {
    console.log("Estoy en coordPage");
    let email = sessionStorage.getItem("email");
    let password = sessionStorage.getItem("password");
    $.ajax({
        //url: "http://localhost:8080/api/user/" + email + "/" + password + "",
        url: "http://152.70.209.140:8080/api/user/" + email + "/" + password + "",
        type: "GET",
        datatype: "JSON",
        success: function (item) {
            console.log(item);
            let userList = "<ul>";
            userList += "<li><b>Identificación:</b> " + item.identification + "</li>";
            userList += "<li><b>Nombre:</b> " + item.name + "</li>";
            userList += "<li><b>N° Celular:</b> " + item.cellPhone + "</li>";
            userList += "<li><b>Email:</b> " + item.email + "</li>";
            userList += "<li><b>Zona:</b> " + item.zone + "</li>";
            userList += "<li><b>Tipo:</b> " + item.type + "</li>";
            userList += "</ul>";
            $("#coordData").append(userList);
            let salesman = item.name;
            let zone = item.zone;
            sessionStorage.setItem("salesman", salesman);
            sessionStorage.setItem("zone", zone);
        }
    });
}

function orderList() {// order/zona/ZONA 1
    let zone = sessionStorage.getItem("zone");
    
    $.ajax({
        //url: "http://localhost:8080/api/order/zona/" + zone + "",
        url: "http://152.70.209.140:8080/api/order/zona/" + zone + "",
        type: "GET",
        
        datatype: "JSON",
        success: function (items) {
            console.log(items);
            let ordersTable = "<table class=\"table table-striped table-responsive\">";
            ordersTable += "<th>Id</th>";
            ordersTable += "<th>Fecha de Registro</th>";
            ordersTable += "<th>Asesor</th>";
            ordersTable += "<th>Estado</th>";
            

            for (i = 0; i < items.length; i++) {
                ordersTable += "<tr>";
                ordersTable += "<td><small>" + items[i].id + "</small></td>";
                ordersTable += "<td><small>" + items[i].registerDay + "</small></td>";
                ordersTable += "<td><small>" + items[i].salesMan.name + "</small></td>";
                ordersTable += "<td><small>" + items[i].status + "</small></td>";

                ordersTable += "<td> <button onclick='orderDetail("+items[i].id+")'>Ver detalle</button>";
                
                ordersTable += "</tr>";
            }
            ordersTable += "</table>";
            $("#ordersTable").append(ordersTable);
        }
    });
}

/**Limpia los campos de las cajas de los formularios */
function clearFields(formName) {
    if (formName == "logInForm") {
        $("#userEmail").val("");
        $("#userPassword").val("");
    } else if (formName == "registerUserForm") {
        $("#newIden").val("");
        $("#newName").val("");
        $("#newAddress").val("");
        $("#newCellPhone").val("");
        $("#newEmail").val("");
        $("#newPwd").val("");
        $("#newZone").val("");
        $("#newType").val("");
    } else if (formName == "updateUserForm") {
        $("#idUser").val("");
        $("#updateIden").val("");
        $("#updateName").val("");
        $("#updateAddress").val("");
        $("#updateCellPhone").val("");
        $("#updateEmail").val("");
        $("#updatePwd").val("");
        $("#updateZone").val("");
        $("#updateType").val("");
    } else if (formName == "registerProductForm") {
        $("#newRef").val("");
        $("#newCategory").val("");
        $("#newSize").val("");
        $("#newDes").val("");
        $("#newAva").val("");
        $("#newPrice").val("");
        $("#newQua").val("");
        $("#newPhoto").val("");
    } else if (formName == "updateProductForm") {
        $("#updateRef").val("");
        $("#updateCategory").val("");
        $("#updateSize").val("");
        $("#updateDes").val("");
        $("#updateAva").val("");
        $("#updateEmail").val("");
        $("#updatePrice").val("");
        $("#updateQua").val("");
        $("#updatePhoto").val("");
    } else if (formName == "admForm") {
        $("#admEmail").val("");
        $("#admPassword").val("");
    } else if (formName == "orderForm") {
        $("#newRDay").val("");
        $("#newStatus").val("");
        $("#newSalesman").val("");
    }
}

/**Llamado de paginas html */
function usersAdmon() {
    window.location.href = "usersAdmon.html";
}

function productsAdmon() {
    window.location.href = "productsAdmon.html";
}

function registerUserForm() {
    window.location.href = "registerUserForm.html";
}

function registerProductForm() {
    window.location.href = "registerProductForm.html";
}

/**Crear Nuevo Usuario */
function createUser() {
    let formName = "registerUserForm";
    let newIden = $("#newIden").val();
    let newName = $("#newName").val();
    let newAddress = $("#newAddress").val();
    let newCellPhone = $("#newCellPhone").val();
    let newEmail = $("#newEmail").val();
    let newPwd = $("#newPwd").val();
    let newZone = $("#newZone").val();
    let newType = $("#newype").val();

    if (newIden == "" || newName == "" || newAddress == "" || newCellPhone == "" || newEmail == "" || newPwd == "" || newZone == "" || newType == "") {
        alert("Se deben diligenciar todos los campos");
    } else {
        if ((!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(newEmail)))) {
            alert("La dirección de email es incorrecta.");
        } else {
            if (newPwd.length < 6) {
                alert("La contraseña debe tener mínimo 6 caractéres");
            } else {
                if (emailVerification(newEmail)) {
                    alert("El email ingresado ya existe");
                    clearFields(formName);
                } else {
                    $.ajax({
                        //url: "http://localhost:8080/api/user/all",
                        url: "http://152.70.209.140:8080/api/user/all",
                        async: false,
                        type: "GET",
                        datatype: "JSON",
                        success: function (answer) {
                            console.log(answer);
                            let lastUser = answer[answer.length - 1];
                            console.log(lastUser);
                            let idUser = lastUser.id + 1;//Hay que buscar el id del último usuario creado
                            console.log(idUser);
                            let myData = {
                                id: idUser,
                                identification: $("#newIden").val(),
                                name: $("#newName").val(),
                                address: $("#newAddress").val(),
                                cellPhone: $("#newCellPhone").val(),
                                email: $("#newEmail").val(),
                                password: $("#newPwd").val(),
                                zone: $("#newZone").val(),
                                type: $("#newType").val(),
                            };
                            let dataToSend = JSON.stringify(myData);
                            $.ajax({
                                //url: "http://localhost:8080/api/user/new",
                                url: "http://152.70.209.140:8080/api/user/new",
                                type: "POST",
                                data: dataToSend,
                                contentType: "application/json; charset=utf-8",
                                datatype: "JSON",
                                success: function (answer) {
                                    console.log(answer);
                                    alert("Usuario registrado con éxito");
                                    clearFields(formName);
                                }
                            });
                        }
                    });
                }
            }
        }
    }
}

/**Crear Nuevo Producto */
function createProduct() {
    let formName = "registerProductForm";
    let newRef = $("#newRef").val();
    let newCategory = $("#newCategory").val();
    let newSize = $("#newSize").val();
    let newDes = $("#newDes").val();
    let newAva = $("#newAva").val();
    let newPrice = $("#newPrice").val();
    let newQua = $("#newQua").val();
    let newPhoto = $("#newPhoto").val();

    if (newRef == "" || newCategory == "" || newSize == "" || newDes == "" || newAva == "" || newPrice == "" || newQua == "" || newPhoto == "") {
        alert("Se deben diligenciar todos los campos");
    } else {
        let myData = {
            reference: $("#newRef").val(),
            category: $("#newCategory").val(),
            size: $("#newSize").val(),
            description: $("#newDes").val(),
            availability: $("#newAva").val(),
            price: $("#newPrice").val(),
            quantity: $("#newQua").val(),
            photography: $("#newPhoto").val(),
        };
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            //url: "http://localhost:8080/api/clothe/new",
            url: "http://152.70.209.140:8080/api/clothe/new",
            type: "POST",
            data: dataToSend,
            contentType: "application/json; charset=utf-8",
            datatype: "JSON",
            success: function (answer) {
                console.log(answer);
                alert("Producto registrado con éxito");
                clearFields(formName);
            }
        });
    }
}


/**Verifica si existe el email en la base de datos */
function emailVerification(email) {
    let emailExits = false;
    $.ajax({
        //url: "http://localhost:8080/api/user/emailexist/" + email + "",
        url: "http://152.70.209.140:8080/api/user/emailexist/" + email + "",
        async: false,
        type: "GET",
        datatype: "JSON",
        success: function (answer) {
            console.log(answer);
            emailExits = answer;
        }
    });
    return emailExits;
}


//GET informacion de la Base Datos para los Usuarios y productos
function showData(formName) {
    if (formName == "usersAdmon") {
        $('#usersAdmonResult').empty();
        $.ajax({
            //url: "http://localhost:8080/api/user/all",
            url: "http://152.70.209.140:8080/api/user/all",
            async: false,
            type: "GET",
            datatype: "JSON",
            success: function (answer) {
                console.log(answer);
                paintAnswer(formName, answer);
            }
        });
    } else if (formName == "productsAdmon") {
        $('#productsAdmonResult').empty();
        $.ajax({
            //url: "http://localhost:8080/api/clothe/all",
            url: "http://152.70.209.140:8080/api/clothe/all",
            type: "GET",
            datatype: "JSON",
            success: function (answer) {
                console.log(answer);
                paintAnswer(formName, answer);
            }
        });
    }
}

/**Imprime la informacion en el Html de usuarios y productos */
function paintAnswer(formName, items) {
    let myTable = "<table class=\"table table-striped\">";
    if (formName == "usersAdmon") {
        myTable += "<th>Identificación</th>";
        myTable += "<th>Nombre</th>";
        myTable += "<th>Dirección</th>";
        myTable += "<th>Celular</th>";
        myTable += "<th>Email</th>";
        myTable += "<th>Contraseña</th>";
        myTable += "<th>Zona</th>";
        myTable += "<th>Tipo</th>";

        for (i = 0; i < items.length; i++) {
            myTable += "<tr>";
            myTable += "<td><small>" + items[i].identification + "</small></td>";
            myTable += "<td><small>" + items[i].name + "</small></td>";
            myTable += "<td><small>" + items[i].address + "</small></td>";
            myTable += "<td><small>" + items[i].cellPhone + "</small></td>";
            myTable += "<td><small>" + items[i].email + "</small></td>";
            myTable += "<td><small>" + items[i].password + "</small></td>";
            myTable += "<td><small>" + items[i].zone + "</small></td>";
            myTable += "<td><small>" + items[i].type + "</small></td>";

            myTable += "<td> <button onclick='bringData(\"usersAdmon\"," + items[i].id + ")'>Actualizar</button>";
            myTable += "<td> <button onclick='deleteData(\"usersAdmon\"," + items[i].id + ")'>Borrar</button>";
            myTable += "</tr>";
        }
        myTable += "</table>";
        $("#usersAdmonResult").append(myTable);
    } else if (formName == "productsAdmon") {

        myTable += "<th>Referencia</th>";
        myTable += "<th>Categoría</th>";
        myTable += "<th>Talla</th>";
        myTable += "<th>Descripción</th>";
        myTable += "<th>Disponibilidad</th>";
        myTable += "<th>Precio</th>";
        myTable += "<th>Cantidad</th>";
        myTable += "<th>Imagen</th>";

        for (i = 0; i < items.length; i++) {
            myTable += "<tr>";
            let reference = '"' + items[i].reference + '"';
            console.log(reference);
            myTable += "<td><small>" + items[i].reference + "</small></td>";
            myTable += "<td><small>" + items[i].category + "</small></td>";
            myTable += "<td><small>" + items[i].size + "</small></td>";
            myTable += "<td><small>" + items[i].description + "</small></td>";
            myTable += "<td><small>" + items[i].availability + "</small></td>";
            myTable += "<td><small>" + items[i].price + "</small></td>";
            myTable += "<td><small>" + items[i].quantity + "</small></td>";
            myTable += "<td><small>" + items[i].photography + "</small></td>";

            myTable += "<td> <button onclick='bringData(\"productsAdmon\"," + reference + ")'>Actualizar</button>";
            myTable += "<td> <button onclick='deleteData(\"productsAdmon\"," + reference + ")'>Borrar</button>";
            myTable += "</tr>";
        }
        myTable += "</table>";
        $("#productsAdmonResult").append(myTable);
    }
}

/**Llama los formularios Actualizar */
function bringData(formName, idElement) {
    if (formName == "usersAdmon") {
        console.log(idElement);
        $("#admonUsersBar").load("updateUserForm.html");
        dataCharge(formName, idElement)
    } else if (formName == "productsAdmon") {
        console.log(idElement);
        $("#admonProductsBar").load("updateProductForm.html");
        dataCharge(formName, idElement)
    }
}

/**Toma la inforacion y actualiza Usuarios y Productos */
function dataCharge(formName, idElement) {
    if (formName == "usersAdmon") {
        //console.log("llego al data charge");
        $.ajax({
            //url: "http://localhost:8080/api/user/" + idElement + "",
            url: "http://152.70.209.140:8080/api/user/" + idElement + "",
            type: "GET",
            datatype: "JSON",
            success: function (answer) {
                //console.log("recibí respuesta");
                let item = answer;
                $("#idUser").val(item.id);
                $("#updateIden").val(item.identification);
                $("#updateName").val(item.name);
                $("#updateAddress").val(item.address);
                $("#updateCellPhone").val(item.cellPhone);
                $("#updateEmail").val(item.email);
                $("#updatePwd").val(item.password);
                $("#updateZone").val(item.zone);
                $("#updateType").val(item.type);
            }
        });
    } else if (formName == "productsAdmon") {
        console.log("llego al data charge");
        $.ajax({
            url: "http://localhost:8080/api/clothe/" + idElement + "",
            //url: "http://152.70.209.140:8080/api/clothe/" + idElement + "",
            type: "GET",
            datatype: "JSON",
            success: function (answer) {
                console.log("recibí respuesta");
                console.log(answer)
                let item = answer;
                $("#updateRef").val(item.reference);
                $("#updateCategory").val(item.category);
                $("#updateSize").val(item.size);
                $("#updateDes").val(item.description);
                $("#updateAva").val(item.availability);
                $("#updatePrice").val(item.price);
                $("#updateQua").val(item.quantity);
                $("#updatePhoto").val(item.photo);
            }
        });
    }

}


/**Edita los elementos de las tablas usuarios y productos */
function editData(formName) {
    if (formName == "updateUserForm") {
        let myData = {
            id: $("#idUser").val(),
            identification: $("#updateIden").val(),
            name: $("#updateName").val(),
            address: $("#updateAddress").val(),
            cellPhone: $("#updateCellPhone").val(),
            email: $("#updateEmail").val(),
            password: $("#updatePwd").val(),
            zone: $("#updateZone").val(),
            type: $("#updateType").val(),
        };
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            //url: "http://localhost:8080/api/user/update",
            url: "http://152.70.209.140:8080/api/user/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/json; charset=utf-8",
            datatype: "JSON",
            success: function (answer) {
                alert("Se ha actualizado con éxito");
                clearFields(formName);
            }
        });
    } else if (formName == "updateProductForm") {
        let myData = {
            reference: $("#updateRef").val(),
            category: $("#updateCategory").val(),
            size: $("#updateSize").val(),
            description: $("#updateDes").val(),
            availability: $("#updateAva").val(),
            email: $("#updateEmail").val(),
            price: $("#updatePrice").val(),
            quantity: $("#updateQua").val(),
            photography: $("#updatePhoto").val(),
        };
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            //url: "http://localhost:8080/api/clothe/update",
            url: "http://152.70.209.140:8080/api/clothe/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/json; charset=utf-8",
            datatype: "JSON",
            success: function (answer) {
                alert("Se ha actualizado con éxito");
                clearFields(formName);
            }
        });
    }
}

/**Borra elementos de las tabla usuarios y productos */
function deleteData(formName, idElement) {
    if (formName == "usersAdmon") {
        let myData = {
            id: idElement
        };
        let id = idElement;
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            //url: "http://localhost:8080/api/user/" + id + "",
            url: "http://152.70.209.140:8080/api/user/" + id + "",
            type: "DELETE",
            data: dataToSend,
            contentType: "application/json; charset=utf-8",
            datatype: "JSON",
            success: function (answer) {
                showData(formName);
                alert("Se ha borrado con éxito");
            }
        });
    } else if (formName == "productsAdmon") {
        let myData = {
            reference: idElement
        };
        let reference = idElement;
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            //url: "http://localhost:8080/api/clothe/" + reference + "",
            url: "http://152.70.209.140:8080/api/clothe/" + reference + "",
            type: "DELETE",
            data: dataToSend,
            contentType: "application/json; charset=utf-8",
            datatype: "JSON",
            success: function (answer) {
                showData(formName);
                alert("Se ha borrado con éxito");
            }
        });
    }
}

function orderForm() {
    let zone = sessionStorage.getItem("zone");
    if (zone == "") {
        alert("Usted no tiene zona asignada, comuníquese con su Coordinador")
    } else {
        window.location.href = "orderForm.html";
    }
}

function fillOutFields() {
    let salesman = sessionStorage.getItem("salesman");
    $("#newSalesman").val(salesman);
}

function bringProducts() {
    $.ajax({
        //url: "http://localhost:8080/api/clothe/all",
        url: "http://152.70.209.140:8080/api/clothe/all",
        type: "GET",
        datatype: "JSON",
        success: function (items) {
            console.log(items);
            productsGalery(items);
        }
    });
}

function productsGalery(products) {

    let myProducts = '<div class="container"><div class="row">';
    for (i = 0; i < products.length; i++) {
        myProducts += `
             <div class="card m-2" style="width: 18rem;">
                
                 <div class="card-body">
                     <h5 class="card-title">Referencia: ${products[i].reference}</h5>
                     <h6 class="card-subtitle mb-2 text-muted">Categoría: ${products[i].category}</h6>
                     <h6 class="card-subtitle mb-2 text-muted">Talla: ${products[i].size}</h6>
                     <h6 class="card-subtitle mb-2 text-muted">Disponible: ${products[i].availability}</h6>
                     <h6 class="card-subtitle mb-2 text-muted">Precio: $ ${products[i].price}</h6>
                     <p class="card-text">${products[i].description}</p>
              
                     <button onclick='addProduct("${products[i].reference}")'>Agregar</button>
                 </div>
             </div>`
    }
    myProducts += "</div></div>";
    $("#products").append(myProducts);

   
}

function addProduct(id) {
    $.ajax({
        //url: "http://localhost:8080/api/clothe/" + id + "",
        url: "http://152.70.209.140:8080/api/clothe/" + id + "",
        type: "GET",
        datatype: "JSON",
        success: function (item) {
            let newRow = "<tr>";
            newRow += "<td><small>" + item.reference + "</small></td>";
            newRow += "<td><small>" + item.category + "</small></td>";
            newRow += "<td><small>" + item.size + "</small></td>";
            newRow += "<td><small>" + item.availability + "</small></td>";
            newRow += "<td><small>" + item.price + "</small></td>";
            newRow += "<td><small>" + item.description + "</small></td>";
            newRow += "<td><small><input type=\"number\" class=\"form-control\" id=\"quantities\"></small></td>";
            newRow += "<td><button onclick='$(this).closest(\"tr\").remove();'>Eliminar</button>";
            newRow += "</tr>"
            $("#orderTable").append(newRow);
        }
    });
}

function obteinClothesFromOrderTable() {
    let table = document.getElementById("orderTable");
    console.log(table);
    let reference;
    for (let i = 1; i < table.length; i++) {
        reference = table.rows[i].cells[0].innerText;
        console.log(reference);
        $.ajax({
            //url: "http://localhost:8080/api/clothe/" + reference + "",
            url: "http://152.70.209.140:8080/api/clothe/" + reference + "",
            type: "GET",
            datatype: "JSON",
            success: function (item) {
                console.log(item);
                JSON.stringify(sessionStorage.setItem("product", item));
            }
        });
    }
    return { reference: JSON.parse(sessionStorage.getItem("product")) };
}

function obteinQuantitiesFromOrderTable() {
    let table = $("#orderTable");
    let reference;
    let quantities;
    for (let i = 1; i < table.length; i++) {
        reference = table.rows[i].cells[0].innerText;
        quantities = table.rows[i].cells[6].innerText;
    }
    return { reference: quantities };
}

function sendOrder(formName) {
    let salesman = JSON.parse(sessionStorage.getItem("user"));
    console.log(salesman);
    console.log(obteinClothesFromOrderTable());
    let myData = {
        registerDay: $("#newRDay").val(),
        status: $("#newStatus").val(),
        salesMan: salesman,
        products: obteinClothesFromOrderTable(),
        quantities: obteinQuantitiesFromOrderTable(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        //url: "http://localhost:8080/api/order/new",
        url: "http://152.70.209.140:8080/api/order/new",
        type: "POST",
        data: dataToSend,
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        success: function (answer) {
            console.log(answer);
            alert("Su orden se ha enviado con exito" + "N° Orden: " + answer.id);
            clearFields(formName);
        }
    });
}