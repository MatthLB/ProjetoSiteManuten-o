const debounce = function(func, wait, immediate) {
    let timeout;
    return function(...args) {
      const context = this;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };



const target = document.querySelectorAll('[data-anime]');
const animationClass = 'animate';

function animeScroll(){
    const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4);
    target.forEach(function(element){
        if((windowTop) > element.offsetTop){
            element.classList.add(animationClass);
        }else{
            element.classList.remove(animationClass);
        }
    })
}

animeScroll();

if(target.length){

window.addEventListener('scroll', debounce(function(){
    animeScroll();
    console.log('adada')
}, 100));

}







var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

var pecas = JSON.parse(localStorage.getItem('list_pecas')) || [];

function renderPecas(){
    listElement.innerHTML = '';

    for(peca of pecas) {
        var pecaElement = document.createElement('li');
        var pecaText = document.createTextNode(peca);

        var linkElement = document.createElement('a');
         
        linkElement.setAttribute('href', '#');

        var pos = pecas.indexOf(peca);
        linkElement.setAttribute('onclick', 'deletePeca(' + pos + ')');

        var linkText = document.createTextNode('Excluir');

          linkElement.appendChild(linkText);

          pecaElement.appendChild(pecaText);
          pecaElement.appendChild(linkElement);
          listElement.appendChild(pecaElement);
    }
}

renderPecas();

function addPecas(){
    var pecaText = inputElement.value;

    pecas.push(pecaText);
    inputElement.value = '';
    renderPecas();
    savePeStorage();
}

buttonElement.onclick = addPecas;

function deletePeca(pos){
  pecas.splice(pos, 1);
  renderPecas();
  savePeStorage();
}

function savePeStorage(){
  localStorage.setItem('list_pecas', JSON.stringify(pecas));
}



