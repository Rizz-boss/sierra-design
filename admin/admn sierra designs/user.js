// user.js

$(document).ready(function () {
    $("#userForm").on("submit", function (event) {
        event.preventDefault();

        var name = $("#name").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var phone = $("#phone").val();

        if (name === "" || email === "" || password === "" || phone ==="") {
            alert("Please fill in all fields");
            return;
        }

        var user = {
            name: name,
            email: email,
            password: password,
            phone: phone,
        };

        $.ajax({
            url: "http://159.65.21.42:9000/register",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(user),
            success: function (response) {
                console.log("User created successfully:", response);
                alert("User created successfully!");
            },
            error: function (error) {
                console.error("Error creating user:", error);
                alert("An error occurred while creating the user.");
            }
        });

        
        $("#userForm")[0].reset();
    });

    
    $.ajax({
        url: "http://159.65.21.42:9000/users",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var parentElement = $(".user-body");
            
            parentElement.find(".table").empty();

            
            var tableHead = `
                <div class="table-row table-head">
                    <div class="table-cells">
                        <p>Full Name</p>
                    </div>
                    <div class="table-cells">
                        <p>Email Address</p>
                    </div>
                    <div class="table-cells">
                        <p>Phone Number</p>
                    </div>
                    <div class="table-cells">
                        <p>Password</p>
                    </div>
                    <div class="table-cells">
                        <p>Delete</p>
                    </div>
                </div>
            `;
            parentElement.find(".table").append(tableHead);

            // Iterate through each user and append a row to the table
            data.forEach(function (user) {
                var tableRow = `
                    <div class="table-row" id="${user._id}">
                        <div class="table-cells">
                            <p>${user.name}</p>
                        </div>
                        <div class="table-cells">
                            <p>${user.email}</p>
                        </div>
                        <div class="table-cells">
                            <p>${user.phone}</p>
                        </div>
                        <div class="table-cells">
                            <p>${user.password}</p>
                        </div>
                        <div class="table-cells">
                            <button class="delete-user" data-id="${user._id}"><img src="img/delete.jpg" alt=""></button>
                        </div>
                    </div>
                `;

                
                parentElement.find(".table").append(tableRow);
            });

            
            attachDeleteEvent();
        },
        error: function (error) {
            console.error("Error fetching user data:", error);
            alert("An error occurred while fetching user data.");
        }
    });



    function attachDeleteEvent() {
        $(".delete-user").click(function () {
            // The user ID to delete
            var userId = $(this).data('id');
    
            $.ajax({
                url: 'http://159.65.21.42:9000/users/' + userId,
                type: 'DELETE',
                success: function (data) {
                    alert('User deleted:', data);
                    location.reload();
                },
                error: function (error) {
                    alert('Error:', error);
                }
            });
        });
    }
        
});    
        
