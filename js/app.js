
// varables y constantes
const listaTweet = document.querySelector('#lista-tweets');
const formulario = document.querySelector('#formulario');
let tweets = []

// eventos listener

document.addEventListener('DOMContentLoaded', ()=>{
    formulario.addEventListener('submit', agregarTweet)
    tweets = JSON.parse( localStorage.getItem('tweet')) || [];
    crearTweets();

});

// funciones
function agregarTweet(event) {
   event.preventDefault();

   const tweet = document.querySelector('#tweet').value

   if(tweet===''){
    monstrarError('vacio');

    return;
   }

   const tweetObj={
    id: Date.now(),
    tweet
   }

   tweets = [...tweets, tweetObj]
   crearTweets();

   formulario.reset();
}

function monstrarError(mensaje){
    const fallo = document.createElement("P");
    fallo.textContent = mensaje
    fallo.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(fallo)

    setTimeout(()=>{
        fallo.remove();
    }, 1000)
}


function crearTweets(){
    linpiarHtml()

    if(tweets.length > 0){
        tweets.forEach(tweet =>{

            const eliminar = document.createElement('a');
            eliminar.classList.add('borrar-tweet');
            eliminar.innerText = "X"
    
            eliminar.onclick = ()=>{
                eliminarTweet(tweet.id);
            }

            const lista = document.createElement('li')
            lista.textContent = tweet.tweet;

            lista.appendChild(eliminar);

            listaTweet.appendChild(lista)
        })
    
    }

    sincronizarStorege();

}


function eliminarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id );


    crearTweets();
}

function sincronizarStorege(){
     localStorage.setItem('tweet', JSON.stringify(tweets))
}

function linpiarHtml(){
    while(listaTweet.firstChild){
        listaTweet.removeChild(listaTweet.firstChild)
    }
}

