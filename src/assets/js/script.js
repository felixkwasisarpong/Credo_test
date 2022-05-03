$(document).ready(function() {

    $('#password').on('focus',function() {
        $('#pswd_info').show();
  
    }).on('blur',function() {
        $('#pswd_info').hide();
    });

});