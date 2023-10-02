import PiezaFactory from './PiezaFactory.js'
let canvas = document.getElementById("tetris")
let puntajeEnJuego = document.querySelector("h2")
let ctx = canvas.getContext("2d")
ctx.scale(30,30)

const COLORES = [
    "#fff",
    "#9b5fe0",
    "#16a4d8",
    "#60dbe8",
    "#8bd346",
    "#efdf48",
    "#f9a52c",
    "#d64e12"
]

const FILAS = 20
const COLUMNAS = 10
let velocidad = 520
let pausa = false
const NIVELES = [
    {
        points: 200,
        speed: 500
    },
    {
        points: 400,
        speed: 480
    },
    {
        points: 600,
        speed: 460
    },
    {
        points: 800,
        speed: 440
    },
    {
        points: 1200,
        speed: 420
    },
    {
        points: 1800,
        speed: 400
    },
    {
        points: 2500,
        speed: 380
    },
    {
        points: 3000,
        speed: 360
    },
    {
        points: 3500,
        speed: 340
    },
    {
        points: 4000,
        speed: 320
    },
    {
        points: 5000,
        speed: 300
    },
    {
        points: 6000,
        speed: 280
    },
    {
        points: 7000,
        speed: 260
    },
    {
        points: 8000,
        speed: 240
    },
    {
        points: 10000,
        speed: 220
    },
    {
        points: 15000,
        speed: 200
    },
    {
        points: 20000,
        speed: 180
    },
]

const generarTablero = () => {
    let tablero = []
    for(let i=0;i<FILAS;i++){
        tablero.push([])
        for(let j=0;j<COLUMNAS;j++){
            tablero[i].push(0)
        }
    }
    return tablero
}

let tablero = generarTablero()
let piezaEnJuego = null
let puntaje = 0
let intervalId = null
const piezaFactory = new PiezaFactory()

const iniciarIntervalo = () => {
    intervalId = setInterval(estadoJuego, velocidad)
}

const detenerIntervalo = () => {
    clearInterval(intervalId)
}

const estadoJuego = () => {
    if (!pausa) {
        actualizar()
        if(!piezaEnJuego){
            piezaEnJuego = piezaFactory.crearPieza()
            renderizarPieza()
        }
        moveDown()
    }
}

const sumarPuntaje = (filasEliminadas) => {
    const puntosPorFila = [0, 10, 30, 50]
    if (filasEliminadas >= 4) {
        puntaje += 100
    } else {
        puntaje += puntosPorFila[filasEliminadas]
    }
    puntajeEnJuego.innerHTML = "Puntaje: " + puntaje

    if (puntaje >= 200) {
        NIVELES.forEach(({points,speed})=>{

        })
    }
    
}

const actualizar = () => {
    let contador = 0
    for(let i=0;i<tablero.length;i++){
        let isLleno = true
        for(let j=0;j<tablero[0].length;j++){
            if(tablero[i][j] == 0){
                isLleno = false
            }
        }
        if(isLleno){
            contador++
            tablero.splice(i,1)
            tablero.unshift([0,0,0,0,0,0,0,0,0,0])
        }
    }
    sumarPuntaje(contador)
}

const renderizarPieza = () => {
    let pieza = piezaEnJuego.pieza
    for (let i = 0; i < pieza.length; i++) {
        for (let j = 0; j < pieza[i].length; j++) {
            if (pieza[i][j] == 1) {
                const x = piezaEnJuego.x + j
                const y = piezaEnJuego.y + i

                ctx.fillStyle = COLORES[piezaEnJuego.colorIndex]
                ctx.fillRect(x, y, 1, 1)

                ctx.strokeStyle = piezaEnJuego.colorIndex
                ctx.lineWidth = .1
                ctx.strokeRect(x, y, 1, 1)
            }
        }
    }
}

const moveDown = () => {
    if(!collision(piezaEnJuego.x,piezaEnJuego.y+1))
        piezaEnJuego.y+=1
    else{
        let pieza = piezaEnJuego.pieza
        for(let i=0;i<pieza.length;i++){
            for(let j=0;j<pieza[i].length;j++){
                if(pieza[i][j] == 1){
                    let p = piezaEnJuego.x+j
                    let q = piezaEnJuego.y+i
                    tablero[q][p] = piezaEnJuego.colorIndex
                }
            }
        }
        if(piezaEnJuego.y == 0){
            alert("gamer over")
            tablero = generarTablero()
            puntaje = 0
        }
        piezaEnJuego = null
    }
    renderizarJuego()
}

const moveLeft = () => {
    if(!collision(piezaEnJuego.x-1,piezaEnJuego.y))
        piezaEnJuego.x-=1
    renderizarJuego()
}

const moveRight = () => {
    if(!collision(piezaEnJuego.x+1,piezaEnJuego.y))
        piezaEnJuego.x+=1
    renderizarJuego()
}

const rotar = () => {
    let piezaRotada = []
    let pieza = piezaEnJuego.pieza
    for(let i=0;i<pieza.length;i++){
        piezaRotada.push([])
        for(let j=0;j<pieza[i].length;j++){
            piezaRotada[i].push(0)
        }
    }
    for(let i=0;i<pieza.length;i++){
        for(let j=0;j<pieza[i].length;j++){
            piezaRotada[i][j] = pieza[j][i]
        }
    }

    for(let i=0;i<piezaRotada.length;i++){
        piezaRotada[i] = piezaRotada[i].reverse()
    }
    if(!collision(piezaEnJuego.x,piezaEnJuego.y,piezaRotada))
        piezaEnJuego.pieza = piezaRotada
    renderizarJuego()
}

const collision = (x,y,piezaRotada) => {
    let pieza = piezaRotada || piezaEnJuego.pieza
    for(let i=0;i<pieza.length;i++){
        for(let j=0;j<pieza[i].length;j++){
            if(pieza[i][j] == 1){
            let p = x+j
            let q = y+i
            if(p>=0 && p<COLUMNAS && q>=0 && q<FILAS){
                if(tablero[q][p]>0){
                    return true
                }
            }else{
                return true
            }}
        }
    }
    return false
}

const renderizarJuego = () => {
    for(let i=0;i<tablero.length;i++){
        for(let j=0;j<tablero[i].length;j++){
            ctx.fillStyle = COLORES[tablero[i][j]];
            ctx.fillRect(j,i,1,1)

            ctx.strokeStyle = "grey"
            ctx.lineWidth = .05
            ctx.strokeRect(j, i, 1, 1)
        }
    }
    renderizarPieza()
}

document.addEventListener("keydown", e => {
    let key = e.key
    if(key == "ArrowDown" && !pausa){
        moveDown()
    }else if(key == "ArrowLeft" && !pausa){
        moveLeft()
    }else if(key == "ArrowRight" && !pausa){
        moveRight()
    }else if(key == "ArrowUp" && !pausa){
        rotar()
    }else if (key == "Enter") {
        pausa = !pausa
        if (pausa) {
            detenerIntervalo()
        } else {
            iniciarIntervalo()
        }
    }
})

iniciarIntervalo()