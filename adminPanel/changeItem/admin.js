const darkMode = document.querySelector('.dark-mode');
darkMode.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode-variables');
  darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
  darkMode.querySelector('span:nth-child(2)').classList.toggle('active');
})

function getProductById(id, callback) {
    $.getJSON('../../productDatas.json', function(data) {
        var product = null;
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                product = data[i];
                break;
            }
        }
        callback(product);
    });
}

function addProduct() {
    var productId = $("#productId").val();

    if (!productId) {
        alert("ID alanını doldurun!");
        return;
    }

    getProductById(productId, function(product) {
        if (product) {
            displayProduct(product);
        } else {
            alert("Belirtilen ID'ye sahip ürün bulunamadı.");
        }
    });
}

function displayProduct(product) {
    $("#productInfo").html(`
        <h2>Product Information</h2>
        <span style="color:red">Id:</span><input type="text" id="productId" name="productId" value="${product.id}" style="color:red" readonly/>
        <span style="color:red">Created At:</span><input type="text" id="created_at" name="created_at" value="${product.created_at}" style="color:red" readonly/>
        <span>Brand:</span><input type="text" id="brand" name="brand" value="${product.brand}"/>
        <span>Name:</span><input type="text" id="productName" name="productName" value="${product.productName}"/>
        <span>Category:</span><input type="text" id="category" name="category" value="${product.category}"/>
        <span>Price:</span><input type="number" id="price" name="price" value="${product.price}"/>
        <span>Description:</span><input type="text" id="description" name="description" value="${product.description}"/>
        <span>Stocked:</span><input type="checkbox" id="stocked" name="stocked" ${product.stocked ? 'checked' : ''}/><br/><br/>
    `);
}


function changeProduct(product) {
    var productId = $("#productId").val();
    var created_at = $("#created_at").val();
    var currentDate = new Date();
    var updatedProduct = {
        "id": Number(productId),
        "brand": $("#brand").val(),
        "productName": $("#productName").val(),
        "category": $("#category").val(),
        "price": $("#price").val(),
        "description": $("#description").val(),
        "stocked": $("#stocked").is(":checked"),
        "created_at": created_at,
        "updated_at": formatDate(currentDate)
    };

    if (!productId) {
        alert("ID alanını doldurun!");
        return;
    }

    // Mevcut ürünü güncellemek için bir AJAX isteği gönderin
    $.ajax({
        type: "PUT", // PUT metodu kullanarak güncelleme yapın
        url: "http://localhost:3000/updateData/" + productId, // productId ile güncellenecek ürünün ID'sini belirtin
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ updatedProduct }), // JSON olarak güncellenecek veriyi gönderin
        success: function(response) {
            alert(response);
        },
        error: function(error) {
            alert("Bir hata oluştu: " + error.responseText);
        }
    });
}

function formatDate(date) {
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');

    return year + '/' + month + '/' + day;
}