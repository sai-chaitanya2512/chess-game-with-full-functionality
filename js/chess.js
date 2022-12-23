var blocks = document.getElementById("board")

x = 1, y = 1
for (i = 1; i < 65; i++) {

    var div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center"

    const img = document.createElement("img");

    img.setAttribute("alt", "")
    img.style.width = "50px"
    div.appendChild(img);
    div.setAttribute("class", "box")
    blocks.appendChild(div);

    div.setAttribute("data-xIndex", x);
    div.setAttribute("data-yIndex", y);
    div.setAttribute("data-cards", `(${x},${y})`)
    //    div.innerText = "(" + x + "," + y + ")"

    if ((x + y) % 2 == 0) {

        div.style.backgroundColor = "white";
    }


    else {
        div.style.backgroundColor = "black";

    }
    x++;
    if (x > 8) {
        x = 1;
        y++
    }
}

const showmove = (piece) => {
    const move = piece.move
    move.forEach(m => {
        for (const box of boxess) {
            if (m.x == box.dataset.xindex && m.y == box.dataset.yindex) {
                if (box.dataset.color == piece.color) {
                    box.classList.add("cantkill")
                }
                else {
                    box.classList.add("cankill")

                }
                if (box.dataset.color == "" || box.dataset.name == null || box.dataset.name == undefined) {


                    box.classList.remove("cankill")
                    box.classList.add("possiblemove")
                }

            }
        }


    })


}
const restpossiblemoves = (piece) => {

    const move = piece.move
    move.forEach(n => {
        for (const box of boxess) {
            if (n.x == box.dataset.xindex && n.y == box.dataset.yindex)
                box.classList.remove("possiblemove")
            box.classList.remove("cankill")
            box.classList.remove("cantkill")
        }


    })


}


class Piece {

    constructor(color, name, initialx, initialy, img) {

        this.color = color;
        this.name = name;
        this.initialpos = {
            x: initialx,
            y: initialy

        };
        this.finalpos = {
            x: initialx,
            y: initialy

        };
        this.img = img
        this.move = [];
    }

}

class Pawn extends Piece {

    constructor(color, name, initialx, initialy, img) {
        super(color, name, initialx, initialy, img);
        this.initialMove = true;
    }
    getpossiblemoves = () => {

        if(this.move.length) {
            showmove(this);
            return;
        }
        if (this.color == "black") {
            if(this.initialMove){
            this.move.push({
                x: this.finalpos.x,
                y: this.finalpos.y + 2
            })
        }
        this.move.push({
            x: this.finalpos.x,
            y: this.finalpos.y+1
        })

        const box1 = document.querySelector(`div[data-cards="(${this.finalpos.x+1},${this.finalpos.y+1})"]`)
        const box2 = document.querySelector(`div[data-cards="(${this.finalpos.x-1},${this.finalpos.y+1})"]`)
        if(box1 && box1.dataset.color && box1.dataset.color != this.color){
            this.move.push({
                x: this.finalpos.x+1,
                y: this.finalpos.y+1
            })
        }
        if(box2 && box2.dataset.color && box2.dataset.color != this.color){
            this.move.push({
                x: this.finalpos.x-1,
                y: this.finalpos.y+1
            })
        }
    }
    else{
        if(this.initialMove){
            this.move.push({
                x: this.finalpos.x,
                y: this.finalpos.y-2
            })
        }
this.move.push({
    x: this.finalpos.x,
    y: this.finalpos.y -1
})

const box1 = document.querySelector(`div[data-cards="(${this.finalpos.x+1},${this.finalpos.y-1})"]`)
        const box2 = document.querySelector(`div[data-cards="(${this.finalpos.x-1},${this.finalpos.y-1})"]`)
        if(box1 && box1.dataset.color && box1.dataset.color != this.color){
            this.move.push({
                x: this.finalpos.x+1,
                y: this.finalpos.y-1
            })
        }
        if(box2 && box2.dataset.color && box2.dataset.color != this.color){
            this.move.push({
                x: this.finalpos.x-1,
                y: this.finalpos.y-1
            })
        }
    }   
        showmove(this)


    }

}


class rook extends Piece {

    constructor(color, name, initialx, initialy, img) {
        super(color, name, initialx, initialy, img);
    }
    getpossiblemoves = () => {

        if (this.move.length) {
            validaterookmoves(this);
            showmove(this);
            return;

        }
        let x = 7, y = 7;
        while (x > 0) {
            let newx = this.finalpos.x + x
            if (newx > 8) {

                newx -= 8

            }
            this.move.push({
                x: newx,
                y: this.finalpos.y


            })
            x--;
        }

        while (y > 0) {
            let newy = this.finalpos.y + y;
            if (newy > 8) {

                newy -= 8

            }

            this.move.push({
                x: this.finalpos.x,
                y: newy

            });
            y--;
        }
        let validatemoves = validaterookmoves(this);
        this.move = validatemoves;
        showmove(this);

    }

}

class knite extends Piece {

    constructor(color, name, initialx, initialy, img) {
        super(color, name, initialx, initialy, img);
    }
    getpossiblemoves = () => {

        let newx, newy;
        newx = this.finalpos.x + 2;
        newy = this.finalpos.y - 1;
        if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })
        newx = this.finalpos.x + 2;
        newy = this.finalpos.y + 1;
        if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })
        newx = this.finalpos.x - 2;
        newy = this.finalpos.y - 1;
        if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })
        newx = this.finalpos.x - 2;
        newy = this.finalpos.y + 1;
        if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })
        newx = this.finalpos.x + 1;
        newy = this.finalpos.y + 2;
        if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })
        newx = this.finalpos.x - 1;
        newy = this.finalpos.y + 2;
        if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })
        newx = this.finalpos.x + 1;
        newy = this.finalpos.y - 2;
        if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })
        newx = this.finalpos.x - 1;
        newy = this.finalpos.y - 2;
        if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })

        showmove(this)

    }
}

class bishop extends Piece {

    constructor(color, name, initialx, initialy, img) {
        super(color, name, initialx, initialy, img);
    }
    getpossiblemoves = () => {

        let x = 7, y = 1;
        while (x > 0) {
            let newx = this.finalpos.x + x
            let newy = this.finalpos.y + x
            if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })
            x--;
        }


        while (y < 7) {
            let newx = this.finalpos.x - y
            let newy = this.finalpos.y - y
            if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })
            y++;
        }

        x = 7, y = 1
        while (x > 0) {
            let newx = this.finalpos.x - x
            let newy = this.finalpos.y + x
            if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })
            x--;
        }
        while (y < 7) {
            let newx = this.finalpos.x + y
            let newy = this.finalpos.y - y
            if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })
            y++;
        }
        let validatemoves1 = validatebishopmoves(this);
        this.move = validatemoves1;

        showmove(this)



    }
}
class queen extends Piece {

    constructor(color, name, initialx, initialy, img) {
        super(color, name, initialx, initialy, img);
    }
    getpossiblemoves = () => {
        let x = 7, y = 1;
        while (x > 0) {
            let newx = this.finalpos.x + x
            let newy = this.finalpos.y + x
            if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })
            x--;
        }


        while (y < 7) {
            let newx = this.finalpos.x - y
            let newy = this.finalpos.y - y
            if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })
            y++;
        }

        x = 7, y = 1
        while (x > 0) {
            let newx = this.finalpos.x - x
            let newy = this.finalpos.y + x
            if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })
            x--;
        }
        while (y < 7) {
            let newx = this.finalpos.x + y
            let newy = this.finalpos.y - y
            if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })
            y++;
        }

        {
            let x = 7, y = 7;
            while (x > 0) {
                let newx = this.finalpos.x + x
                if (newx > 8) {

                    newx -= 8

                }
                this.move.push({
                    x: newx,
                    y: this.finalpos.y


                })
                x--;
            }

            while (y > 0) {
                let newy = this.finalpos.y + y;
                if (newy > 8) {

                    newy -= 8

                }

                this.move.push({
                    x: this.finalpos.x,
                    y: newy

                });
                y--;
            }
        }
        var q1 = validatebishopmoves(this)
        var q2 = validaterookmoves(this)
        this.move = q1
        this.move = q2
        showmove(this)

    }
}
class king extends Piece {

    constructor(color, name, initialx, initialy, img) {
        super(color, name, initialx, initialy, img);
    }
    getpossiblemoves = () => {

        let newx, newy;
        newx = this.finalpos.x + 1;
        newy = this.finalpos.y + 1;
        if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })
        newx = this.finalpos.x;
        newy = this.finalpos.y + 1;
        if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })
        newx = this.finalpos.x - 1;
        newy = this.finalpos.y;
        if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })
        newx = this.finalpos.x - 1;
        newy = this.finalpos.y - 1;
        if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })
        newx = this.finalpos.x;
        newy = this.finalpos.y - 1;
        if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })
        newx = this.finalpos.x + 1;
        newy = this.finalpos.y - 1;
        if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })
        newx = this.finalpos.x - 1;
        newy = this.finalpos.y + 1;
        if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })
        newx = this.finalpos.x + 1;
        newy = this.finalpos.y;
        if (newx > 0 && newx < 9 && newy > 0 && newy < 9) this.move.push({ x: newx, y: newy })

        showmove(this)



    }
}

const pb1 = new Pawn("black", "black pawn", 1, 2, "../media/b_pawn.svg")
const pb2 = new Pawn("black", "black pawn", 2, 2, "../media/b_pawn.svg")
const pb3 = new Pawn("black", "black pawn", 3, 2, "../media/b_pawn.svg")
const pb4 = new Pawn("black", "black pawn", 4, 2, "../media/b_pawn.svg")
const pb5 = new Pawn("black", "black pawn", 5, 2, "../media/b_pawn.svg")
const pb6 = new Pawn("black", "black pawn", 6, 2, "../media/b_pawn.svg")
const pb7 = new Pawn("black", "black pawn", 7, 2, "../media/b_pawn.svg")
const pb8 = new Pawn("black", "black pawn", 8, 2, "../media/b_pawn.svg")
const kb = new king("black", "black king", 5, 1, "../media/b_king.svg")
const qb = new queen("black", "black queen", 4, 1, "../media/b_queen.svg")
const rd1 = new rook("black", "black king", 1, 1, "../media/b_rook.svg")
const rd2 = new rook("black", "black rook", 8, 1, "../media/b_rook.svg")
const knd1 = new knite("black", "black knite", 2, 1, "../media/b_knight.svg")
const knd2 = new knite("black", "black knite", 7, 1, "../media/b_knight.svg")
const bb1 = new bishop("black", "black bishop", 3, 1, "../media/b_bishop.svg")
const bb2 = new bishop("black", "black bishop", 6, 1, "../media/b_bishop.svg")

const pw1 = new Pawn("white", "white pawn", 1, 7, "../media/w_pawn.svg")
const pw2 = new Pawn("white", "white pawn", 2, 7, "../media/w_pawn.svg")
const pw3 = new Pawn("white", "white pawn", 3, 7, "../media/w_pawn.svg")
const pw4 = new Pawn("white", "white pawn", 4, 7, "../media/w_pawn.svg")
const pw5 = new Pawn("white", "white pawn", 5, 7, "../media/w_pawn.svg")
const pw6 = new Pawn("white", "white pawn", 6, 7, "../media/w_pawn.svg")
const pw7 = new Pawn("white", "white pawn", 7, 7, "../media/w_pawn.svg")
const pw8 = new Pawn("white", "white pawn", 8, 7, "../media/w_pawn.svg")
const kw = new king("white", "white king", 5, 8, "../media/w_king.svg")
const qw = new queen("white", "white queen", 4, 8, "../media/w_queen.svg")
const rw1 = new rook("white", "white king", 1, 8, "../media/w_rook.svg")
const rw2 = new rook("white", "white rook", 8, 8, "../media/w_rook.svg")
const knw1 = new knite("white", "white knite", 2, 8, "../media/w_knight.svg")
const knw2 = new knite("white", "white knite", 7, 8, "../media/w_knight.svg")
const bw1 = new bishop("white", "white bishop", 3, 8, "../media/w_bishop.svg")
const bw2 = new bishop("white", "white bishop", 6, 8, "../media/w_bishop.svg")

const pices = [pb1, pb2, pb3, pb4, pb5, pb6, pb7, pb8, pw1, pw2, pw3, pw4, pw5, pw6, pw7, pw8, kb, kw, qb, qw, rd1, rd2, rw1, rw2, knd1, knd2, knw1, knw2, bw1, bw2, bb1, bb2]
const boxess = document.getElementsByClassName("box")

pices.forEach(p => {
    
    for (const box of boxess) {

        if (p.initialpos.x == box.dataset.xindex && p.initialpos.y == box.dataset.yindex) {
            box.firstChild.setAttribute("src", p.img);
            box.setAttribute("data-name", p.name);
            box.setAttribute("data-color", p.color);
            box.addEventListener("mouseenter", p.getpossiblemoves)
            box.addEventListener("mouseleave", () => restpossiblemoves(p))
        }
    }


})


for (const box of boxess) {

    if (box.dataset.name == "" || box.dataset.name == null || box.dataset.name == undefined) {

        box.firstElementChild.classList.add("hideimg")
    }


}


const finddistance = (a, b) => {

    return Math.sqrt((Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2)));


}

const validaterookmoves = (piece) => {

    let current = piece.finalpos;
    let move = piece.move;
    move = move.sort((a, b) => finddistance(a, current) - finddistance(b, current));
    console.log(move)
    let direction = {
        up: [],
        down: [],
        left: [],
        right: []

    }

    move.forEach(m => {

        if (m.y > current.y && m.x == current.x) {
            direction.down = [...direction.down, m]
        }
        if (m.y < current.y && m.x == current.x) {
            direction.up = [...direction.up, m]
        }
        if (m.y == current.y && m.x > current.x) {
            direction.right = [...direction.right, m]
        }
        if (m.y == current.y && m.x < current.x) {
            direction.left = [...direction.left, m]
        }

    })
    console.log(direction)
    let newmoves = []
    for (const dir in direction) {
        for (const d of direction[dir]) {
            const box = document.querySelector(`div[data-cards="(${d.x},${d.y})"]`)
            const color = box.dataset.color;
            if (color != "" || color != undefined || color != null) {
                newmoves.push(d);
                break;
            }
            else {
                newmoves.push(d);

            }
        }

    }
    return newmoves;
}







const validatebishopmoves = (piece) => {

    let current = piece.finalpos;
    let move = piece.move;
    move = move.sort((a, b) => finddistance(a, current) - finddistance(b, current));
    console.log(move)
    let direction = {
        upleft: [],
        upright: [],
        downleft: [],
        downright: []

    }
    move.forEach(m => {

        if (m.y < current.y && m.x > current.x) {
            direction.upleft = [...direction.upleft, m]
        }
        if (m.y < current.y && m.x < current.x) {
            direction.upright = [...direction.upright, m]
        }
        if (m.y > current.y && m.x < current.x) {
            direction.downleft = [...direction.downleft, m]
        }
        if (m.y > current.y && m.x > current.x) {
            direction.downright = [...direction.downright, m]
        }

    })
    console.log(direction)
    let newmoves = []
    for (const dir in direction) {
        for (const d of direction[dir]) {
            const box = document.querySelector(`div[data-cards="(${d.x},${d.y})"]`)
            const color = box.dataset.color;
            if (color != "" || color != undefined || color != null) {
                newmoves.push(d);
                break;
            }
            else {
                newmoves.push(d);

            }
        }

    }
    return newmoves;

}








