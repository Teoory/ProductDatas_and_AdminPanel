const darkMode = document.querySelector('.dark-mode');
darkMode.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode-variables');
  darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
  darkMode.querySelector('span:nth-child(2)').classList.toggle('active');
})

function addProduct() {
    $.getJSON('../../productDatas.json', function(data) {
        var lastId = data[data.length - 1].id; // son id oku
        var newId = lastId + 1; // yeni id
        
    var currentDate = new Date();

    if (!brand || !productName || !category || !price || !description) {
        alert("Tüm alanları doldurun!");
        return;
    }

    var product = {
        "id": newId,
        "qr": newQR,
        "brand": $("#brand").val(),
        "productName": $("#productName").val(),
        "category": $("#category").val(),
        "price": $("#price").val(),
        "description": $("#description").val(),
        "stocked": $("#stocked").is(":checked"),
        "created_at": formatDate(currentDate),
        "updated_at": formatDate(currentDate)
    };

    $.ajax({
        type: "POST",
        url: "http://localhost:3000/addProduct",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ product }), // json çevirme
        success: function(response) {
            alert(response);
        },
        error: function(error) {
            alert("Bir hata oluştu: " + error.responseText);
        }
    });
});
}


function formatDate(date) {
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');

    return year + '/' + month + '/' + day;
}