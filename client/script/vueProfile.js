new Vue({
    el:'#appProfile',
    data:{
        username: '',
        oldPassword: '',
        newPassword: '',
        confirm: '',
        disabled: 1,
    },
    mounted: function(){
        this.username = localStorage.getItem('username');

        if(localStorage.getItem('fb') == 1){
            window.location.href = "home.html"
        }
    },
    methods:{
        updateUser: function(){
            let username = this.username;
            let old_password = this.oldPassword;
            let new_password = this.newPassword;
            let confirm = this.confirm;
            let token = localStorage.getItem('token');

            //Change username only
            if(new_password == '' && confirm == ''){
                axios.put('https://git.heroku.com/todo-fancy-hacktiv8.git/user/update-user', {username: username, new_password: new_password, old_password: old_password}, {headers: {token:token}})
                    .then(function(response){
                        alert(response.data.message);
                        window.location.href = 'home.html'
                    })
                    .catch(function(err){
                        alert(err);
                    })
            }
            //Change username + password 
            else{
                if(new_password != confirm){
                    alert('Password and confirm password is not the same!')
                }else{
                    axios.put('https://git.heroku.com/todo-fancy-hacktiv8.git/user/update-user', {username: username, new_password: new_password, old_password: old_password}, {headers: {token:token}})
                    .then(function(response){
                        alert(response.data.message);
                        window.location.href = 'home.html'
                    })
                    .catch(function(err){
                        alert(err);
                    })
                }
            }           
        },
        goToProfile(){
            window.location.href = "profile.html"
        }
    }
})