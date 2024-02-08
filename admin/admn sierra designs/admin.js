// $(document).ready(function () {
//     $('form').on('submit', function(event) {
//         event.preventDefault();

//         var productData = new FormData();
//         productData.append('productName', $('#name').val());
//         productData.append('productPrice', $('#price').val());
//         productData.append('productQuantity', $('#quantity').val());
//         productData.append('productDescription', $('#description').val());
//         productData.append('productImage', $('#image')[0].files[0]);

//         $.ajax({
//             url: 'http://159.65.21.42:9000/create/product',
//             type: 'POST',
//             data: productData,
//             processData: false,
//             contentType: false,
//             success: function(response) {
//                 // Display success message
//                 showMessage('success', 'Product created successfully!');
//             },
//             error: function(err) {
//                 // Display error message
//                 showMessage('error', 'An error occurred!');
//             }
//         });

//         // Reset the form after submission
//         $("form")[0].reset();
//     });

//     function showMessage(type, message) {
//         var messageContainer = $('#message-container');
        
//         // Clear previous messages
//         messageContainer.empty();

//         // Create and append a new message element
//         var messageElement = $('<div>').addClass(type).text(message);
//         messageContainer.append(messageElement);
//     }
// });


$(document).ready(function () {
    $('form').on('submit', function(event) {
        event.preventDefault();
      
        var productData = new FormData();
        productData.append('category', $('#category').val());
        productData.append('description', $('#description').val());
        productData.append('image', $('#image')[0].files[0]);
        productData.append('name', $('#name').val());
        productData.append('price', $('#price').val());
        productData.append('quantity', $('#quantity').val());

        $.ajax({
          url: 'http://159.65.21.42:9000/create/product',
          type: 'POST',
          data: productData,
          processData: false,
          contentType: false,
          success: function(response) {
            console.log(response);
            alert('Your Product has been created successfully!');
          },
          error: function(error) {
            console.log(error);
            alert('An error occurred!');
          }
        });
        $("form")[0].reset();
    });

 // Fetch products with category "sierraDesigns"
$.ajax({
    url: "http://159.65.21.42:9000/products",
    type: "GET",
    success: function (data) {
        // Clear existing content before appending new items
        $(".product-body").empty();

        $.each(data, function (i, product) {
            if (product.category === "sierraDesigns") {
                var Productitem = `
                    <div class="product" id="${product._id}">
                        <img class="product-image" src="http://159.65.21.42:9000${product.image}" alt="">
                        <h3>${product.name}</h3>
                        <p>$${product.price}</p>
                        <button class="edit" data-id="${product._id}">Edit</button>
                        <button class="delete" data-id="${product._id}">Delete</button>
                    </div>
                `;

                $(".product-body").append(Productitem);
            }
        });

        // Attach click event to delete buttons after fetching products
        attachDeleteEvent();
    },
    error: function (error) {
        console.error(error);
    }
});

// Function to attach delete event to delete buttons
function attachDeleteEvent() {
    $(".delete").off("click").on("click", function (e) {
        e.preventDefault();

        var productId = $(this).data("id");

        $.ajax({
            method: 'DELETE',
            url: "http://159.65.21.42:9000/product/" + productId,
            success: function (data) {
                console.log(data);
                // Update the UI after successful deletion
                $(`#${productId}`).remove();
            },
            error: function (err) {
                console.error(err);
            }
        });
    });
}


});  
