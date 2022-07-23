// https://SpryImportantMolecule.j0nrey.repl.co
//base de datos
//https://console.firebase.google.com/u/0/project/ajaxclass-1ca34-91895/database/ajaxclass-1ca34-91895-default-rtdb/data/~2F11g

// Sacar u obtener los datos del formulario

const getProductsData = () => {
    
    let productsObject = {}
    
    let fields = document.querySelectorAll("form input[type='text']")

    fields.forEach( field => {

    productsObject[field.name] = field.value
    
    console.log("productsObject -> ", productsObject)
})

    let category = document.getElementById("category").value
    console.log("category -> ", category)

    productsObject = {...productsObject, category}
    
    saveProduct(productsObject)

    fields.forEach( field => {
        field.value = ""
    })
}

document.getElementById("save-button").addEventListener("click", getProductsData )


//Editable
const activateEdition = event => {

    let productKey = event.target.dataset.productKey
    document.getElementById("save-changes").dataset.productKey = productKey
    console.log(productKey)
    $("#edition-modal").modal("show")

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let product = JSON.parse(xhttp.responseText)
            console.log(product)

            //llenamos los inputs
            Object.keys(product).forEach( key => {

                document.querySelector(`#edition-modal input[name=${key}]`).value = product[key]

            })
      }      
    }
xhttp.open("GET", `https://ajaxclass-1ca34-91895-default-rtdb.firebaseio.com/11g/Prueba/productos/${productKey}/.json`, true);
      
xhttp.send();

}

//Guardar los cambios editados

const saveChanges = event => {
    let productKey = event.target.dataset.productKey
    let editeObject = {}
    document.querySelectorAll("#edition-modal input").forEach( input => {
        editeObject[input.name] = input.value
    })
    console.log( editeObject )

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(xhttp.responseText)
            console.log(response)
            printCard(getProductsCollection())//  *********
            $("#edition-modal").modal("hide")
      }      
    }
xhttp.open("PUT", `https://ajaxclass-1ca34-91895-default-rtdb.firebaseio.com/11g/Prueba/productos/${productKey}/.json`, true);
      
xhttp.send(JSON.stringify(editeObject));


}



document.getElementById("save-changes").addEventListener( "click", saveChanges )







// Guardar los datos a la base

const saveProduct = product => {

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        //console.log("Objeto[llave] -> ",xhttp.response)

        $('#save-succesful').modal('show')

        printCard(getProductsCollection())/**/

      }      
    }
xhttp.open("POST", "https://ajaxclass-1ca34-91895-default-rtdb.firebaseio.com/11g/Prueba/productos.json", true);
      
xhttp.send( JSON.stringify(product));
}

// Pedir y traer los datos de la base

const getProductsCollection = () => {

    let productCollection;

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        //console.log("Objeto[llave] -> ",xhttp.response)
        productCollection = JSON.parse(xhttp.response)
      }      
    }
    xhttp.open("GET", "https://ajaxclass-1ca34-91895-default-rtdb.firebaseio.com/11g/Prueba/productos.json", false);
        
    xhttp.send();
    
    return productCollection
}

// Eliminar la Card


const deleteCard = event => {
    
    let productKey = event.target.dataset.productKey
    console.log("productKey", productKey)

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.response)
            
            $('#delete-succesful').modal('show')
           
          printCard(getProductsCollection()) /**/
      }      
    }
    
    xhttp.open("DELETE", `https://ajaxclass-1ca34-91895-default-rtdb.firebaseio.com/11g/Prueba/productos/${productKey}/.json`, false);
        
    xhttp.send();

}

// imprimir los datos

let printCard = dataToPrint => {
    
    let cardsContainer = document.getElementById("container")

    while (cardsContainer.lastElementChild) {
        cardsContainer.removeChild(cardsContainer.lastElementChild);
      }

    //Actualizamos las Cars

    for(key in dataToPrint){

        //donde tomamos los datos para la CARD ?
        let { name, url, description, price, category } = dataToPrint[key];
        
        // Crear el DIV
    let colDiv = document.createElement("div");
    colDiv.classList = "col-12 col-md-6";

    let divCard = document.createElement("div");
    divCard.classList = "card p-0 m-1 bg-dark";

    let imgCard = document.createElement("img");
    imgCard.classList = "card-img-top";
    imgCard.src = url;

    let divCardBody = document.createElement("div");
    divCardBody.classList = "card-body text-white flex-column aling-content-center";

    let h1CardName = document.createElement("h1");
    h1CardName.classList = "card-title text-white text-center"

    let h3CardPrice = document.createElement("h3");

    let pCardDescription = document.createElement("p");
    pCardDescription.classList = "card-text text-white"

    let pCardCategory = document.createElement("p");
    pCardCategory.classList = "card-text text-white-50";

    let button = document.createElement("button");  // Button
    button.classList = "btn btn-primary m-3 btn-delete";
    button.classList.add("btn-outline-primary");
    button.classList.remove("btn-primary");

        button.dataset.productKey = key;

    let editButton = document.createElement("button"); // Edit Button
    editButton.classList = "btn btn-warning m-3 edit-button";
    editButton.classList.add("btn-outline-warning");
    editButton.classList.remove("btn-warning");
    
        editButton.dataset.productKey = key;

    
    let detailButton = document.createElement("button");  // detailButton
    detailButton.classList = "btn btn-success m-3";
    detailButton.classList.add("btn-outline-success");
    detailButton.classList.remove("btn-success");

    let buttonAnchor = document.createElement("a"); //anchor
    buttonAnchor.href=`view/productsDetail.html?productKey=${key}`

    let h1CardNameTx = document.createTextNode(name);
    let h3CardPriceTx = document.createTextNode(price);
    let pCardDescriptionTx = document.createTextNode(description);
    let pCardCategoryTx = document.createTextNode(category);
    let buttonTx = document.createTextNode("Borrar");  // Button
    let editTx = document.createTextNode("Editar");  // Edit Button
    let anchorTx = document.createTextNode("Ver detalle");  // detail Button
    buttonAnchor.target = "_blank"

    

    h1CardName.appendChild(h1CardNameTx);
    h3CardPrice.appendChild(h3CardPriceTx);
    pCardDescription.appendChild(pCardDescriptionTx);
    pCardCategory.appendChild(pCardCategoryTx);
    button.appendChild(buttonTx);  // Button
    editButton.appendChild(editTx); // Edit-Button
    buttonAnchor.appendChild(anchorTx); // anchorButton 
    detailButton.appendChild(buttonAnchor);// detail-Button



    divCardBody.appendChild(h1CardName);
    divCardBody.appendChild(h3CardPrice);
    divCardBody.appendChild(pCardDescription);
    divCardBody.appendChild(pCardCategory);
    divCardBody.appendChild(button);  // Button
    divCardBody.appendChild(editButton); // Edit-Button
    divCardBody.appendChild(detailButton); // Edit-Button


    divCard.appendChild(imgCard);
    divCard.appendChild(divCardBody);

    colDiv.appendChild(divCard);

    cardsContainer.appendChild(colDiv);
    }
     
    // mandar a llamar deleteCard al click del boton

    let buttons = document.querySelectorAll(".btn-delete")

    document.querySelectorAll(".edit-button").forEach( button => {
        button.addEventListener("click", activateEdition)
    })


    buttons.forEach( button => {
        button.addEventListener("click", deleteCard );
    }) 
}

printCard(getProductsCollection()) /**/

// Filtrar por categoria

const filterByCategory = event => {
    let arr = getProductsCollection();

    let select = document.getElementById("filter-category")
    let category = select.options[select.selectedIndex].value

    let newObject = {};

    if(event.target.value ==="todo"){
        printCard(arr);
    }else{
        for(key in arr){
            if(arr[key].category == category){
                newObject[key] = arr[key];
            }
        }
        printCard(newObject);
    }
}

    document.getElementById("filter-category").addEventListener("change", filterByCategory)

/*getProducts */