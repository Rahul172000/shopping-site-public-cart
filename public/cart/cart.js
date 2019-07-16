function allcartprod(display){
    $.get(
        '/allcartprod',
        function(products){
            display(products)
        }
    )
}
$(function(){
    let main=$("#main")
    allcartprod(function(products){
        main.empty()
        if(products.length===0){
            main.append(`
            <h3><div class='col-4 alert alert-primary text-center' style="margin-top:30px;margin-left:450px;">CART EMPTY</div></h3>
            `)
        }
        for(let i of products){
            main.append(`
            <div class='col-4'>
             <div class="card">
                <h3 class="alert alert-primary text-center border">${i.product_name}</h3>
                <h4 class="text-center">${i.product_manufacturer}</h4>
                <h4 class="text-center">RS.${i.product_price}</h4>
                <a href=''><button class="btn-primary remove_from_cart" value='${i.id}'>REMOVE FROM CART</button></a>
            `)
        }
        $(".remove_from_cart").each(function(){
            $(this).click(function(){
                let id=$(this).val();
                console.log("clicked")
                $.get(
                    '/findprod',
                    {id:id},
                    function(product){
                        $.post(
                            '/removefromcart',
                            {
                                id:product.id,
                            },
                            function(result){
                            }
                        )
                    }
                )
            })
        })
    })
})