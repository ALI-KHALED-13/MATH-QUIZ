let container = document.getElementById('container');

const levels = [
    {'1 + 1':'2', '4 - 5':'-1', '3 X 12':'36', '72 ÷ 3':'24'},
    {'1 + 1 X 3':'4', '0.5 X 0.5':'0.25', '9 ÷ 3<sup>2</sup>':'1', '10 ÷ 0.25':'40'},
    {
    'log100 + 16<sup>0.5</sup>':'6',
     '0.25 - 0.2 X 5<sup>0</sup>':'0.05',
     '5 ÷ 3<sup>log1</sup>':'5',
     '4 - 5<sup>2</sup>':'29'
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
        div.onmousedown =()=> false;
        div.addEventListener('click', select_deselect);
    });

    let selectedEls =  document.getElementsByClassName('selected');

    function select_deselect (event){
        event.currentTarget.classList.toggle('selected');
        if (selectedEls.length >= 2){
           setTimeout(grading, 350);  
        }
    }

    function grading(){
        let [a1, a2] = [selectedEls[selectedEls.length - 1], selectedEls[selectedEls.length - 2]];
        let yay = document.getElementById("correct");
        let woo = document.getElementById("wrong");
        woo.volume = 0.5;

        if(levels[num][a1.innerHTML] == a2.innerHTML
         || levels[num][a2.innerHTML] == a1.innerHTML) {
            yay.load();
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
            woo.load();
            woo.play();
            let wrongAns =  document.getElementsByClassName('wrong');
            setTimeout(()=> {
                while(wrongAns.length) wrongAns[0].classList.remove('wrong');
            },550)
        }
    }
}
function next () {
    let correct = document.getElementsByClassName('correct');
    if (correct.length == 8){
        num++;
        document.getElementsByTagName('aside')[0].onclick=()=> null;
        document.getElementsByTagName('aside')[0].addEventListener('click', update);
    }
    
    function update(){
        if (levels[num]){
        document.getElementsByTagName('main')[0].innerText = 
            `choose the correct pair || Level ${num+1}`;
        } else {document.getElementsByTagName('main')[0].innerText = 'You Have Done It!!!!';}
        document.getElementsByTagName('aside')[0].removeEventListener('click', update);
        document.getElementsByTagName('aside')[0].onclick =()=> alert('you have to solve every Question before jumbing to next level');
        insert();
    }
}

function final(){
    const hidden = document.getElementById('hidden');
    const end = document.getElementById("end");
    hidden.style.display = 'block';
    end.play();
    container.replaceWith(hidden);
    document.getElementsByTagName('aside')[0].onclick =()=>alert('You have passed all Levels');
}

function receive(){
    let p = document.createElement('p');
    p.innerHTML = '<b>Thanks!!  got that <b>'
    document.forms[0].replaceWith(p);
}
