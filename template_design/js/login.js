
let signinformElm = document.querySelector('#signin-form > form')



signinformElm.addEventListener('submit', async (e) => {
    e.preventDefault()

    // prep

    let uploadData = {
        username: signinformElm.username.value,
        password: signinformElm.password.value,
        email:signinformElm.email.value
    }

    // send 
    let res = await fetch('/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(uploadData)
    })


    // post handling
    if (!res.ok) {
        return
    }

    let data = res.json()
    console.log(data);
    window.location = '/admin.html'


})



