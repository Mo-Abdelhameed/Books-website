let p = document.createElement('p');
let submit = document.querySelector('#simple_click');
submit.addEventListener('click', function(){
    p.textContent('OKKKK');
    document.appendChild(p);
    console.log('Hello');
});