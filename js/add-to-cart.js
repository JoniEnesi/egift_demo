$("#add-to-cart-btn").on("click", function(){
    let quantity = $("#product-quantity").val();
    let product_title = $(".product-title").val();
    let product_id = $(".product-id").val();
    let product_img = $("#bannerimage").attr("src");
    let product_email = $("#product-email").val();
    let product_datetime = $("#product_datatime").val();
    let pricePerItem = parseFloat($("#custom_price").text().replace("$", ""));
    let this_val = $(this);

    if (!pricePerItem) {
        Swal.fire({
          title: "Please select an amount!",
          icon: "info",
        });
        return;
    }
    if (!product_email) {
        Swal.fire({
          title: "Please fill email field!",
          icon: "info",
        });
        return;
    }
    if (!product_datetime) {
        Swal.fire({
          title: "Please fill date and time field!",
          icon: "info",
        });
        return;
    }

    let selectedDateTime = new Date(product_datetime);
    let currentTime = new Date();


    if (selectedDateTime < currentTime) {
        Swal.fire({
          title: "Please select a future date and time!",
          icon: "info",
        });
        return;
    }

    let totalPrice = quantity * pricePerItem;

    console.log("Quantity:", quantity);
    console.log("Title:", product_title);
    console.log("ID:", product_id);
    console.log("image:", product_img);
    console.log("email:", product_email);
    console.log("datatime:", product_datetime);
    console.log("Price per item:", pricePerItem);
    console.log("Total Price:", totalPrice);
    console.log("Current Element:", this_val);


    $.ajax({
        url: '/add-to-cart',
        data: {
            'id': product_id,
            'qty': quantity,
            'title': product_title,
            'image': product_img,
            'email': product_email,
            'datatime': product_datetime,
            'price': totalPrice,
        },
        dataType: 'json',
        beforeSend: function(){
            console.log("Adding card to cart...");
        },
        success: function(response){
            if (response.userLoggedIn) {
                this_val.html("Item added to cart");
                $('.cart-items-count').text(response.total_cart_items);
            } else {
                this_val.html("Item added to cart");
                $('.cart-items-count').text(response.totalcartitems);
            }
        }
    });
});


$(document).on("click", ".delete-product", function(){
    let product_id = $(this).attr("data-product");
    let this_val = $(this);

    console.log("Product ID:", product_id, "Gift Card");

    $.ajax({
        url: "/delete-item-from-cart/",
        data: {
            "id": product_id
        },
        dataType: "json",
        beforeSend: function (){
            this_val.hide();
        },
        success: function (response){
            this_val.show();
            $('.cart-items-count').text(response.totalcartitems);
            $('#cart-list').html(response.data);
        }
    });
});


document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-product')) {
        var productId = event.target.getAttribute('data-product');
        var userLoggedIn = document.getElementById('user-logged-in').value;

        if (userLoggedIn === "true") {
            window.location.reload();
        }
    }
});

