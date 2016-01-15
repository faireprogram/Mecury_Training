(function(){
    'use strict';

    $.get('/api/user', function(users) {
        console.log("users", users);
        var cnt = '<table class="table table-striped">';
        users.forEach(function(idx){
            cnt += '<tr><td>' + idx.firstName + ' </td><td> ' + idx.lastName + '</td></tr>';
        })

        cnt += '</table>';
        $('#cnt').html(cnt);
    })
})();
