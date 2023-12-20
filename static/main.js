window.addEventListener('load', () => {
    const form = document.getElementById('formulario')
    const usuario = document.getElementById('user')
    const email = document.getElementById('email')
    const number = document.getElementById('number')
    const address = document.getElementById('add')
    const pass = document.getElementById('pass')
    const passConfirma = document.getElementById('passConfirma')
    const btnCancelar = document.getElementById('b1')

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        validaCampos()
    })


    btnCancelar.addEventListener('click', () => {
        clearErrorMessages()
        usuario.value = ''
        email.value = ''
        number.value = ''
        address.value = ''
        pass.value = ''
        passConfirma.value = ''
    })

    btnCancelar.addEventListener("click", function () {
        // Limpiar solo los mensajes de error
        const inputs = document.querySelectorAll(".input-tools input");
        for (const input of inputs) {
            input.classList.remove("input-falla");
        }
    });


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

    const validaFalla = (input, msje) => {
        const formControl = input.parentElement
        const aviso = formControl.querySelector('p')
        aviso.innerText = msje
        formControl.className = 'input-falla'
    }

    const validaOk = (input) => {
        const formControl = input.parentElement
        formControl.className = 'input-ok'
    }

    const validaEmail = (email) => {
        return /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    document.querySelector("#b1").addEventListener("click", function () {
        // Limpia los mensajes de error
        for (const input of document.querySelectorAll(".input-tools input")) {
            input.classList.remove("input-falla");
        }
    });

})