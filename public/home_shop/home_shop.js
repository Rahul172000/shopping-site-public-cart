function getallprod(print){
    $.get('/allprod',function(data){
        print(data);
    })
}
$(function(){
    const div=$('#main')
    getallprod(function(products_data){
        div.empty();
        for(let i of products_data){
            div.append(`
            <div class='col-4'>
             <div class="card">
                <h3 class="text-center border">${i.product_name}</h3>
                <h4 class="text-center">${i.product_manufacturer}</h4>
                <h4 class="text-center">RS.${i.product_price}</h4>
                <button class="btn-primary add_to_cart" value='${i.id}'>ADD TO CART</button>
             </div>
            </div>
            `)
        }
        $('.add_to_cart').each(function(){     //here and not outside the getallprod function coz otherwise the new elements were not registered
            $(this).click(function(){
                console.log('clicked')
                let id=$(this).val();
                $.get(
                    '/findprod',
                    {id:id},
                    function(product){
                        $.post(
                            '/addtocart',
                            {
                                id:product.id,
                                name:product.product_name,
                                manuf:product.product_manufacturer,
                                price:product.product_price
                            },
                            function(result){
                                window.alert(result);
                            }
                        )
                    }
                )
            })
        })
    })
})
