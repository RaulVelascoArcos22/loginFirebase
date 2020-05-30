// Registro de usuarios
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;
    auth
        .createUserWithEmailAndPassword(email,password)
        .then(userCredential =>{
            //limpia el formulario
            signupForm.reset();
            //Cerrar el modal
            $('#signupModal').modal('hide')
            console.log("Registrado");
        });
});
//Validad el correo 
const loginForm = document.querySelector('#login-form');
loginForm-addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;
    auth
    .signInWithEmailAndPassword(email,password)
    .then(userCredential =>{
        //limpia el formulario
        signupForm.reset();
        //Cerrar el modal
        $('#signupModalI').modal('hide')
        console.log("Bienvenido");
    });
});
// Cerrar sesion
const cerrar = document.querySelector('#cerrarSesion');
cerrar.addEventListener('click',e =>{
    e.preventDefault();
    auth.signOut().then(()=>{
        console.log("Fin");
    });
});
// Mostrar datos 
const postList = document.querySelector('.posts');
const setupPosts = data=>{
    if(data.length){
        let html = '';
        data.forEach(doc =>{
            const post = doc.data();
            console.log(post);
            const li = `
                <li class="list-group-item list-group-item-action">
                    <h3>${post.title}</h3>
                    <p>${post.description}</p>
                </li>
            `;
            html += li;
        });
        postList.innerHTML = html;
    }else{
        postList.innerHTML = '<p class="text-center">Ingresa para ver las publicaciones </p>';
    }
}
// Eventos
auth.onAuthStateChanged(user =>{
    if(user){
        // Consulta a firebase
        fs.collection('posts')
            .get()
            .then((snapshot) =>{
                setupPosts(snapshot.docs);
            });
    }else{
        setupPosts([]);
    }
});