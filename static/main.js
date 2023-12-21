window.addEventListener('load', () => {
    // Obtener elementos del formulario mediante el id
    const form = document.getElementById('formulario')
    const usuario = document.getElementById('user')
    const email = document.getElementById('email')
    const number = document.getElementById('number')
    const address = document.getElementById('add')
    const pass = document.getElementById('pass')
    const passConfirma = document.getElementById('passConfirma')
    const btnCancelar = document.getElementById('b1')
    const eye1 = document.querySelector('#eye1')
    const eye2 = document.getElementById('eye2')

    //Objeto con datos a guardar del formulario
    const datos = {}

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        datos['User Name'] = usuario.value 
        datos['Email'] = email.value 
        datos['Contact Number'] = number.value 
        datos['Address'] = address.value 
        datos['Password'] = pass.value 
        datos['ConfirmPassword'] = passConfirma.value 

        console.log(datos)


        validaCampos()
    })

    // Función para ver contraseña
    eye1.addEventListener('click', function(){
        if(pass.type == "password"){
            pass.type = "text"
            eye1.style.opacity = 0.8
        }else{
            pass.type = "password"
            eye1.style.opacity = 0.2
        }
    })

    eye2.addEventListener('click', () =>{
        if(passConfirma.type == "password"){
            passConfirma.type = "text"
            eye2.style.opacity = 0.8
        }else{
            passConfirma.type = "password"
            eye2.style.opacity = 0.2
        }
    })

    // Función para hacer reset al formulario
    btnCancelar.addEventListener('click', (e) => {
        e.preventDefault();
        form.reset();
    })

    // Función para validacion de los campos del formulario
    const validaCampos = () => {
        //capturar los valores ingresados por el usuario
        const usuarioValor = usuario.value.trim()
        const emailValor = email.value.trim()
        const numberValor = number.value.trim()
        const addressValor = address.value.trim()
        const passValor = pass.value.trim()
        const passConfirmaValor = passConfirma.value.trim();

        //validando campo usuario
        // (!usuarioValor) ? console.log('CAMPO VACIO') : console.log(usuarioValor)
        if (usuarioValor === '') {
            // console.log('CAMPO VACIO')
            validaFalla(usuario, 'Campo vacio')
        } else {
            validaOk(usuario)
        }


        //validando campo email
        if (!emailValor) {
            validaFalla(email, 'Campo vacio')
        } else if (!validaEmail(emailValor)) {
            validaFalla(email, 'El email no es válido')
        } else {
            validaOk(email)
        }


        //validando campo numero
        if (!numberValor) {
            validaFalla(number, 'Campo vacio')
        }else if(isNaN(numberValor)){
            validaFalla(number, 'Debe ser un numero telefonico')
        } else if (numberValor.length < 10 || numberValor.length > 10) {
            validaFalla(number, 'Debe tener 10 digitos')
        } else {
            validaOk(number)
        }


        //validando campo address

        const dir = ("Calle|Carrera|Diagonal\\s\\d{2}\\s#\\d{2}-\\d{2}\\s.");

        if (!addressValor) {
            validaFalla(address, 'Campo vacio')
        } else if (addressValor.match(dir)) {
            validaFalla(pass, 'Debe contener una dirección valida');
        } else {
            validaOk(address)
        }


        //validando campo password
        const er = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/

        if (!passValor) {
            validaFalla(pass, 'Campo vacío');
            passValid = false;
        } else if (passValor.length < 8) {
            validaFalla(pass, 'Debe tener 8 caracteres como mínimo');
            passValid = false;
        } else if (!passValor.match(er)) {
            validaFalla(pass, 'Debe incluir al menos una mayúscula, minúscula y número.');
            passValid = false;
        } else {
            validaOk(pass);
            passValid = true;
        }

        // Validar confirmación solo si la contraseña principal es válida

        if (passValid === false) {
            if (!passConfirmaValor) {
                validaFalla(passConfirma, 'Campo vacio');
            } else if (passValor !== passConfirmaValor) {
                validaFalla(passConfirma, 'La contraseña no coincide')
            } else {
                validaOk(passConfirma);
            }
        }

        if (passValid) {
            if (!passConfirmaValor) {
                validaFalla(passConfirma, 'Campo vacio');
            } else if (passValor !== passConfirmaValor) {
                validaFalla(passConfirma, 'La contraseña no coincide')
            } else {
                validaOk(passConfirma);
            }
        }

    }

    // Función de fallo en la validacion
    const validaFalla = (input, msje) => {
        const formControl = input.parentElement
        const aviso = formControl.querySelector('p')
        aviso.innerText = msje
        formControl.className = 'input-falla'
    }

    // Función de fallo en la validacion
    const validaOk = (input) => {
        const formControl = input.parentElement
        formControl.className = 'input-ok'
    }

    // Expersiones regulares para la validación del email
    const validaEmail = (email) => {
        return /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }
    

})
