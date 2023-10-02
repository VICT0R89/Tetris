class PiezaFactory {
    constructor() {
        this.piezas = [
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]
            ],
            [
                [0,1,0],  
                [0,1,0],  
                [1,1,0]   
            ],
            [
                [0,1,0],
                [0,1,0],
                [0,1,1]
            ],
            [
                [1,1,0],
                [0,1,1],
                [0,0,0]
            ],
            [
                [0,1,1],
                [1,1,0],
                [0,0,0]
            ],
            [
                [1,1,1],
                [0,1,0],
                [0,0,0]
            ],
            [
                [1,1],
                [1,1],
            ]
        ]
    }

    crearPieza() {
        const indice = Math.floor(Math.random() * this.piezas.length)
        const pieza = this.piezas[indice]
        const colorIndex = indice + 1
        const x = 4
        const y = 0
        return { pieza, colorIndex, x, y }
    }
}
export default PiezaFactory