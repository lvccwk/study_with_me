const isloggedin = false
let signinformElm = document.querySelector('#signin-form > form')
signinformElm.addEventListener('submit', async (e) => {
    e.preventDefault()

    // prep
    if (isloggedin === false ){
    let uploadData = {
        email:signinformElm.email.value,
        password: signinformElm.password.value
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

    console.log(res);
    // post handling

    // let data = await res.json()
    // console.log(data);
    
    if (!res.ok) {
        return
    } else {
        window.location = res.url
        // window.location = '/account.html'
    }
    isloggedin === true
    let logoutformElm = document.querySelector('#login-btn')
    logoutformElm.innerHTML = `<a
    class="nav-link custom-btn btn d-none d-lg-block"
    href="/logout"
    >登出</a
>`
}
})



