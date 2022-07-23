console.log("vista detalle")

let urlParams = new URLSearchParams(window.location.search)

let productKey = urlParams.get("productKey")

console.log(productKey)

const getProductsData = productKey => {

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(xhttp.responseText);
            console.log(response)
            printAlbumData(response)

        }
    }


    xhttp.open("GET", `https://ajaxclass-1ca34-91895-default-rtdb.firebaseio.com/11g/Prueba/productos/${productKey}/.json`, true);

    xhttp.send();


}

const printAlbumData = data => {
    let {name, url, description, price, category } = data
    document.querySelector(".card-img-top").innerText = url
    document.querySelector(".card-name").innerText = name
    document.querySelector(".card-price").innerText = price
    document.querySelector(".card-description").innerText = description
    document.querySelector(".card-category").innerText = category
}


getProductsData(productKey)