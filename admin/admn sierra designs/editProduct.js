$(document).on('click', '.edit-product', function(){
    var id = $(this).data('id');

    localStorage.setItem('productId', id);

    window.location.href = 'editProduct.html';

});
    $("#form-one").on("submit", function (event) {
        event.preventDefault();

        
        var productId = $(this).data("product-id");

        var updatedProduct = {
            category: $("#category").val(),
            description: $("#description").val(),
            image: $("image").val(),
            name: $("#name").val(),
            price: $("#price").val(),
            quantity: $("#quantity").val(),
        };

        $.ajax({
            url: "http://159.65.21.42:9000/products/" + productId,
            method: "PUT", 
            contentType: "application/json",
            data: JSON.stringify(updatedProduct), 
            success: function (response) {
                console.log("Product updated successfully:", response);
                
            },
            error: function (error) {
                console.error("Error updating product:", error);
            }
        });
    });

