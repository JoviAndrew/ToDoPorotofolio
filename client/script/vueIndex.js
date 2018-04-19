new Vue({
    el:'#appIndex',
    data:{
        username: '',
        password: '',
    },
    methods:{
        sendtoRegis(){
            window.location.href = 'register.html'
        },
        login(){

            let username = this.username;
            let password = this.password;

            if(username == "" || password == ""){
                alert('Username or password is empty!')
            }
            
            axios.post('https://todo-fancy-hacktiv8.herokuapp.com/index/login', {username: username, password: password})
            .then(function(response){
                console.log(response.data)
                if(response.data.message != 'Success login'){
                    console.log(response.data)
                    alert(response.data.message)
                }else{
                    alert(response.data.message);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('firstname', response.data.firstname);
                    localStorage.setItem('lastname', response.data.lastname);
                    localStorage.setItem('username', response.data.username);
                    localStorage.setItem('fb', 0);
                    window.location.href = 'home.html'
                }
            })
            .catch(function(error){
                alert(error)
            })
        },
        checkLoginState() {
            FB.getLoginStatus(function(response) {
              statusChangeCallback(response);
            });
        }

    }
})
