console.log('a')
let signupForm = document.querySelector('#signup-form')
console.log(signupForm)
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    // prep

    let uploadData = {
        username: signupForm.username.value,
        password: signupForm.password.value,
        email:signupForm.email.value,
        type:signupForm.type.value
    }
    console.log(uploadData)
    // send 
    let res = await fetch('/register', {
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
    
    // if (!res.ok) {
    //     return
    // } else {
    //     window.location = res.url
    // }
})
