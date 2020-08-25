let container = document.getElementById('container');

const levels = [
    {'1 + 1':'2', '4 - 5':'-1', '3 X 12':'36', '72 ÷ 3':'24'},
    {'1 + 1 X 3':'4', '4 - 5<sup>2</sup>':'-21', '9 ÷ 3<sup>2</sup>':'1', '10 ÷ 0.25':'40'},
    {
    'log100 + 16<sup>0.5</sup>':'6',
     '0.25 - 0.2 X 5<sup>0</sup>':'0.05',
     '5 ÷ 3<sup>log1</sup>':'5',
     '0.5 X 0.5':'0.25'
    },
]
let num = 0; 

insert();
function insert() {
    container.innerHTML = '';
    
    if (num == levels.length) return final();

    let values = Object.values(levels[num]);
    let keys = Object.keys(levels[num]);
    let contents = [...keys, ...values].sort((a,b)=> 0.5 - Math.random());

    for (let content of contents){
        let div = document.createElement('div');
        div.className = 'op';
        div.innerHTML = content;
        container.append(div);
    }
    evaluate();
}

function evaluate() {
    let divs = document.getElementsByClassName('op');
    Array.from(divs).forEach(div=> {
        div.addEventListener('click', select_deselect);
        div.onmousedown =()=> false;
        /*If(div.firstElementChild) div.firstElementChild.onmousedown =()=> false;*/
    });

    let selectedEls =  document.getElementsByClassName('selected');

    function select_deselect (event){
        event.target.classList.toggle('selected');
        if (selectedEls.length >= 2){
           setTimeout(grading, 400);  
        }
    }

    function grading(){
        let [a1, a2] = [selectedEls[selectedEls.length - 1], selectedEls[selectedEls.length - 2]];
        let yay = document.querySelector("[src='correct.mp3']");
        let woo = document.querySelector("[src='wrong.mp3']");
        woo.volume = 0.5;

        if(levels[num][a1.innerHTML] == a2.innerHTML
         || levels[num][a2.innerHTML] == a1.innerHTML) {

            yay.play();
            for (let i = 0; i < selectedEls.length; i++) {
                selectedEls[i].classList.add('correct');
                selectedEls[i].classList.remove('selected');
                i = -1;
            }
            next();

        } else {
            for (let i = 0; i < selectedEls.length; i++) {
                selectedEls[i].classList.add('wrong');
                selectedEls[i].classList.remove('selected');
                i = -1;
            }
            woo.play()
            let wrongAns =  document.getElementsByClassName('wrong');
            setTimeout(()=> {
                while(wrongAns.length) wrongAns[0].classList.remove('wrong');
            },700)
        }
    }
}
function next () {
    let correct = document.getElementsByClassName('correct');
    if (correct.length == 8){
        num++;
        document.getElementsByTagName('aside')[0].addEventListener('click', update);
    }
    function update(){
        insert();
        if (levels[num]){
        document.getElementsByTagName('main')[0].innerText = 
            `choose the correct pair || Level ${num+1}`;
        } else {document.getElementsByTagName('main')[0].innerText = 'You Have Done It!!!!';}
        document.getElementsByTagName('aside')[0].removeEventListener('click', update);
    }
}

function final(){
    const hidden = document.getElementById('hidden');
    const end = document.querySelector("[src='end.mp3']");
    hidden.style.display = 'block';
    end.play();
    container.replaceWith(hidden);
}

function receive(){
    let p = document.createElement('p');
    p.innerHTML = '<b>Thanks!!  got that <b>'
    document.forms[0].replaceWith(p);
}
