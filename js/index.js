var productName = document.getElementById("productName") 
var productPrice = document.getElementById("productPrice") 
var productCategory = document.getElementById("productCategory") 
var productDesc = document.getElementById("productDesc")  
var addBtn = document.getElementById("addBtn")  
var searchInput = document.getElementById("searchInput")

var mainIndex = 0;

if(localStorage.getItem("productsList") !=null){
    var productsList =JSON.parse(localStorage.getItem("productsList")) 
    displayProducts();
}else{
    var productsList =[] ;
}


addBtn.addEventListener("click", function(){
    var product = {
        name : productName.value,
        price : productPrice.value,
        category : productCategory.value,
        desc : productDesc.value,
    }

    if(addBtn.innerHTML == "Add Product"){
        productsList.push(product);
    }else{
        productsList.splice(mainIndex, 1 ,product)
    }
    

    localStorage.setItem("productsList",JSON.stringify(productsList))
    displayProducts();


})

function displayProducts(){
    var trs=""
    for(var i = 0 ; i < productsList.length ; i++){
        trs += `<tr>
                    <td>${i}</td>
                    
                    <td>${productsList[i].name}</td>
                    <td>${productsList[i].price}</td>
                    <td>${productsList[i].category}</td>
                    <td>${productsList[i].desc}</td>
                    <td><button  onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>
                    <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
                </tr>`
    }

    document.getElementById("tableBody").innerHTML =trs
}


function deleteProduct(index){
    productsList.splice(index,1);
    localStorage.setItem("productsList",JSON.stringify(productsList))
    displayProducts()
}

searchInput.addEventListener("keyup",function(){
    var trs = ""
    
    for(var i = 0 ; i < productsList.length ; i++){
        if(productsList[i].name.toLowerCase().includes(searchInput.value.toLowerCase()) ){
            trs += `<tr>
                    <td>${i}</td>
                    <td>${productsList[i].name}</td>
                    <td>${productsList[i].price}</td>
                    <td>${productsList[i].category}</td>
                    <td>${productsList[i].desc}</td>
                    <td><button onclick="updateProduct(${i})" class="btn btn-danger">Update</button></td>
                    <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
                </tr>`
        }
    }
    document.getElementById("tableBody").innerHTML =trs
     
})



function updateProduct(index){
    productName.value = productsList[index].name
    productPrice.value = productsList[index].price
    productCategory.value = productsList[index].category
    productDesc.value = productsList[index].desc

    mainIndex = index
    addBtn.innerHTML = "Update product"
}
