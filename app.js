async function increase() {
    loader.classList.remove('hide')
    await callApi('increase')
}

async function callApi(x = '') {
    try {
        result = await (await fetch('https://like-api.herokuapp.com/' + x)).json()
        if (x == 'increase' || x=='') {
            Likes = result
            like.innerText = Likes;
        }
        loader.classList.add('hide')
        Likes = result;
        like.innerText = Likes;
    } catch (err) {
        result=''
        if(err.constructor.name == 'TypeError')
        {
            result='Network Error'
            like.innerText = result;
            loader.classList.remove('hide')
        }
    }
    return result
}

var Likes;
callApi().then(()=>reload())

async function reload() {
    let result = await callApi(Date.now());
    if(result!='Network Error')
    {
    console.log('Attempting change...')
    reload()
    }
}