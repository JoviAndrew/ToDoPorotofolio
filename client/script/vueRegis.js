new Vue({
    el:'#appRegis',
    methods:{
        sendtoLogin(){
            window.location.href = 'index.html'
        },
        register(){
            let username = $('#username').val();
            let password = $('#password').val();
            let confirm = $('#confirmPassword').val();

            if(password != confirm){
                alert('Password and confirm password is not the same!')
            }else{
                axios.post('http://localhost:3000/user/register', {username: username, password: password})
                .then(function(response){
                    if(response.data.message != "success register a new user"){
                        alert(response.data.message);
                    }else{
                        alert(response.data.message);
                        window.location.href = 'index.html'
                    }
                })
            }
        
        }
    }
})