const logetlink = document.querySelectorAll('.loggod-out');
const logetlinkIn = document.querySelectorAll('.loggod-in');
const loginCheck = user =>{
    if(user){
        logetlinkIn.forEach(link => link.style.display = 'block');
        logetlink.forEach(link => link.style.display = 'none');
    }else{
        logetlinkIn.forEach(link => link.style.display = 'none');
        logetlink.forEach(link => link.style.display = 'block');
    }
}
// Registro de usuarios
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;
    auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log("Bien");
            //limpia el formulario
            signupForm.reset();
            //Cerrar el modal
            $('#signupModal').modal('hide')
        });
});
//Validad el correo 
const loginForm = document.querySelector('#login-form');
loginForm - addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;
    auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            //limpia el formulario
            signupForm.reset();
            //Cerrar el modal
            $('#signupModalI').modal('hide');
        })
});
// Cerrar sesion
const cerrar = document.querySelector('#cerrarSesion');
cerrar.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut().then(() => {
    });
});
// Google login
const googleButton = document.querySelector('#googleLogin');
googleButton.addEventListener('click', (e) => {
    e.preventDefault();
    //  signInForm.reset();
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            //limpia el formulario
            signupForm.reset();
            //Cerrar el modal
            $('#signupModalI').modal('hide');
        })
        .catch(err => {
            console.log(err);
        })
});
// Facebook login
const facebookButton = document.querySelector('#facebookLogin');
facebookButton.addEventListener('click', (e) => {
    e.preventDefault();
    //  signInForm.reset();
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            //limpia el formulario
            signupForm.reset();
            //Cerrar el modal
            $('#signupModalI').modal('hide');
        })
        .catch(err => {
            console.log(err);
        })
});
// Mostrar datos 
const postList = document.querySelector('.posts');
const setupPosts = data => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
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
    } else {
        postList.innerHTML = '<p class="text-center">Ingresa para ver las publicaciones </p>';
    }
}
// Eventos
auth.onAuthStateChanged(user => {
    if (user) {
        // Consulta a firebase
        fs.collection('posts')
            .get()
            .then((snapshot) => {
                setupPosts(snapshot.docs);
                loginCheck(user);
            });
    } else {
        setupPosts([]);
        loginCheck(user);
    }
});