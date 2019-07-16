$(function(){
    const name=$('#name')
    const manuf=$('#manuf')
    const price=$('#price')
    const submit=$('#submit')
    submit.click(function(){
        $.post(
            '/addprod/data',
            {
                name:name.val(),
                manuf:manuf.val(),
                price:price.val(),
            },
            function(result){
                window.alert(result)
            }
        )
    })
})