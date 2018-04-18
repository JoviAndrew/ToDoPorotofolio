var tableContent = Vue.component('table-todo-content',{
    name: 'table-todo-content',
    template: `
    <tbody>
        <tr v-for="(task, index) in tasks">
            <td>{{index+1}}</td>
            <td>{{task.todo}}</td>
            <td><button class="btn btn-outline-info" v-on:click="showUpdate(task)">Update</button> <button class="btn btn-outline-warning" v-on:click="deleteTodo(task._id)">Delete</button></td>
        </tr>
    </tbody>
    `,
    props: ['tasks'],
    methods:{
        deleteTodo(id){
            let token = localStorage.getItem('token')

            axios.delete(`https://todo-fancy-hacktiv8.herokuapp.com/home/delete/${id}`, {headers: {token: token}})
            .then(function(response){
                console.log(response.data)
                vm.getAllList();
            })
        },
        showUpdate(list){
            $('.update').show();
            $('#todoUpdate').val(list.todo);
            vm.update = list._id
        },
        
    }
})

let vm = new Vue({
    el: '#appHome',
    data:{
        userIn: false,
        tasks: [],
        update: '',
        firstname: '',
        disabled: 0,
    },
    mounted: function(){
        this.checkOnline()
    },
    created: function(){
        let firstname =  localStorage.getItem('firstname');
        this.firstname = firstname;
        let fb = localStorage.getItem('fb');
        this.disabled = fb;
    },
    components:{
        tableContent:tableContent
    },
    methods:{
        logout(){
            localStorage.removeItem('token');
            window.location.href = "index.html"
            this.userIn = false;
        },
        checkOnline(){
            let token = localStorage.getItem('token');
            if(token == null){
                window.location.href="index.html"
            }else{
                this.userIn = true
            }
        },
        getAllList(){
        
            this.tasks = [];
            let token = localStorage.getItem('token');

            axios.get("https://todo-fancy-hacktiv8.herokuapp.com/home/show", {headers: {token:token}})
            .then(response =>{
                let lists = response.data.list
                lists.forEach(list =>{
                    this.tasks.push(list)
                })
                
            })
            .catch(err => {
                console.log(err)
            })
        },
        addTodo(){
            let task = $('#newTodo').val();
            let token = localStorage.getItem('token');

            axios.post('https://todo-fancy-hacktiv8.herokuapp.com/home/add', {todo: task} ,{headers: {token:token}})
            .then((response) => {
                console.log(response.data)
                $('#alert-message').html(response.data.message);
                $('.alert2').show();
                $('#newTodo').val('');

                this.tasks.push(task);
                this.getAllList();
            })
        },
        updateTodo(){
            let token = localStorage.getItem('token')

            let newUpdate = $('#newUpdate').val();
            let id = this.update;

            axios.put(`https://todo-fancy-hacktiv8.herokuapp.com/home/update/${id}`, {todo: newUpdate}, {headers:{token:token}})
            .then(function(response){
                console.log(response.data)
                this.getAllList();
            })
            .catch(function(err){
                console.log(err);
            })
        },
        goToProfile(){
            window.location.href = "profile.html"
        }
    }
})