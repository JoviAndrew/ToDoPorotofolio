new Vue({
    el:'#appIndex',
    methods:{
        sendtoRegis(){
            window.location.href = 'register.html'
        },
        login(){
            let username = $('#username').val();
            let password = $('#password').val();
        
            axios.post('http://localhost:3000/user/login', {username: username, password: password})
            .then(function(response){
                if(response.data.message != 'Success login'){
                    alert(response.data.message)
                }else{
                    alert(response.data.message);
                    localStorage.setItem('token', response.data.token);
                    window.location.href = 'home.html'
                }
            })
            .catch(function(error){
                alert(error)
            })
        },
    }
})