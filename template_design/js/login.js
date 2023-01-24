
let signinformElm = document.querySelector('#signin-form > form')
signinformElm.addEventListener('submit', async (e) => {
    e.preventDefault()

    // prep

    let uploadData = {
        username: signinformElm.username.value,
        password: signinformElm.password.value,
        email:signinformElm.email.value
    }
    console.log(uploadData)
    // send 
    let res = await fetch('/login', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(uploadData)
    })


    // post handling

    let data = await res.json()
    console.log(data);
    
    if (res.ok) {
        return
    }

    window.location = '/admin.html'


})



