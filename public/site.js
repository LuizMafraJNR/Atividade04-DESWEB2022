(function(){
    $("#carros").on('click','.js-delete', function(){
        let botao = $(this);
        $('#btnsim').attr('data-id',botao.attr('data-id'));
        $("#myModal").modal('show');
    });
    $("#btncancelar").on('click', function(){
        $("#myModal").modal('hide');
    });
    $('#btnsim').on('click',function(){
        let botao = $(this);
        $.ajax({
            url: '/carros/delete/' + botao.attr('data-id'),
            method: 'GET',
            success: function(){
                window.location.href = '/carros';
            }
        });
    });
})();

