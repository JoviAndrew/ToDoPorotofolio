new Vue({
    el:'#appRegis',
    data: {
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        confirm: '',
    },
    methods:{
        sendtoLogin(){
            window.location.href = 'index.html'
        },
        register(){
            let firstname = this.firstname;
            let lastname = this.lastname;
            let username = this.username;
            let password = this.password;
            let confirm = this.confirm;

            if(firstname == '' || lastname == ''|| username == ''){
                alert('Fields needs to be filled');
            }
            else if(password != confirm){
                alert('Password and confirm password is not the same!')
            }else{
                axios.post('https://todo-fancy-hacktiv8.herokuapp.com/index/register', {firstname: firstname, lastname: lastname, username: username, password: password})
                .then(function(response){
                    alert(response.data.message);
                    axios.post('https://todo-fancy-hacktiv8.herokuapp.com/index/login', {username: username, password: password})
                        .then(function(response){
                            if(response.data.message != 'Success login'){
                                alert(response.data.message)
                            }else{
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
                })
                .catch(function(err){
                    alert('Error Input: Username has been taken!');
                })
            }
        
        }
    }
})