/** Funciones para la página en que se escoge la nave----------------------------------------------------------*/
function escogeNave() {

    //Usando Arrow Functions y un evento click, se obtiene el id de la nave seleccionada por el usuario

    let div1 = document.getElementById('sls');
    div1.addEventListener('click', event => {
        navePlayer = "sls";
        alert("La nave seleccionada ha sido: sls");
    });

    let div2 = document.getElementById('sojouz');
    div2.addEventListener('click', event => {
        navePlayer = "sojouz";
        alert("La nave seleccionada ha sido: sojouz");
    });

    let div3 = document.getElementById('spaceship');
    div3.addEventListener('click', event => {
        navePlayer = "spaceship";
        alert("La nave seleccionada ha sido: spaceship");
    });

    let div4 = document.getElementById('starship');
    div4.addEventListener('click', event => {
        navePlayer = "starship";
        alert("La nave seleccionada ha sido: starship");
    });
}


/**Funciones para la página de la carrera-------------------------------------------------------------- */

/**Cuenta atrás, funcion que al clikar en un botón nos hace una cuenta atras con un set interval de un segundo
 * al finalizar llama a la funcion race() que es la que hace la carrera.
*/

function cuentaAtras() {
    const contadorElemento = document.getElementById("contador");
    let segundos = 3;

    const intervalo = setInterval(() => {
        contadorElemento.textContent = "Cuenta atrás: " + segundos;
        segundos--;
        if (segundos < 0) {
            clearInterval(intervalo);
            contadorElemento.textContent = "¡Despegue! (Presiona espacio para empezar)";
            race();
        }
    }, 1000);
}

/**Función race, que es la que hace la carrera, está compuesta de varias subFunciones */

function race() {
    var sls = document.getElementById("sls");
    var sojuz = document.getElementById("sojuz");
    var spaceship = document.getElementById("spaceship");
    var starship = document.getElementById("starship");

    /*Evento que escucha a la barra espaciadora, lo he intentado hacer para que solo se pueda llamar una vez
    y no sale... */
    document.addEventListener('keydown', event => {
        let eventoEjecutado = false;
        if (event.code === 'Space' && eventoEjecutado === false) {
            eventoEjecutado = true;
            salida(sls, sojuz, spaceship, starship)
        }
    })

    /**En la funcion salida que calcula que nave debe moverse aleatoriamente, cada una tiene un 25% de posibi
     * lidad de moverse, y cada vez que se mueve se llama a la funcion moverNave que mueve la nave en cuestion,
     * Tambien llama a la funcion leaderBoard que calcula la tabla de posiciones cada microsegundo
     */
    function salida(sls, sojuz, spaceship, starship) {
        let movSLS = 4800;
        let movSojuz = 4800;
        let movSpaceship = 4800;
        let movStarship = 4800;

        const movimiento = setInterval(() => {
            let mover = Math.random() * 100;
            if (mover < 25) {
                movSLS--;
                moverNave(sls, movSLS)
            } else if (mover > 25 & mover < 50) {
                movSojuz--;
                moverNave(sojuz, movSojuz)
            } else if (mover > 50 & mover < 75) {
                movSpaceship--;
                moverNave(spaceship, movSpaceship)
            } else if (mover > 75) {
                movStarship--;
                moverNave(starship, movStarship)
            }
            if (movSLS == 0 | movSojuz == 0 | movSpaceship == 0 | movStarship == 0) {
                clearInterval(movimiento)
            }

            leaderBoard(movSLS, movSojuz, movSpaceship, movStarship)
        }, 1)
    }

    /**Funcion moverNave, que mueve la nave en cuestion, si la nave llega a la meta, se para*/

    function moverNave(ship, mov) {
        if (mov == 0) {
            ship.style.top = 1 + 'px'

        } else {
            ship.style.top = mov + 'px'
        }
    }

    /**Funcion leaderBoard, que calcula la tabla de posiciones, ordena el array de objetos de menor a mayor*/

    function leaderBoard(movSLS, movSojuz, movSpaceship, movStarship) {

        var primero = document.getElementById('1');
        var segundo = document.getElementById('2');
        var tercero = document.getElementById('3');
        var cuarto = document.getElementById('4');

        const tablaPosiciones = {
            naves: [{
                nombre: 'sls',
                posicion: movSLS
            },
            {
                nombre: 'sojuz',
                posicion: movSojuz
            },
            {
                nombre: 'spaceship',
                posicion: movSpaceship
            },
            {
                nombre: 'starship',
                posicion: movStarship
            }
            ]
        }

        tablaPosiciones.naves.sort((a, b) => {
            return a.posicion - b.posicion;
        })

        primero.textContent = tablaPosiciones.naves[0].nombre
        segundo.textContent = tablaPosiciones.naves[1].nombre
        tercero.textContent = tablaPosiciones.naves[2].nombre
        cuarto.textContent = tablaPosiciones.naves[3].nombre


        /*Aqui espero a que alguna nave llegue al top para llamar a la funcion fin */
        for (let i = 0; i < tablaPosiciones.naves.length; i++) {
            let nave = tablaPosiciones.naves[i];

            if (nave.posicion === 0) {
                alert("La nave " + nave.nombre + " ha llegado la primera")

                //Movemos la tabla de posiciones
                lider = document.getElementById('lider');
                lider.style.width = 50 + '%';
                lider.style.height = 30 + '%';
                lider.style.left = 25 + '%';

                //Creamos el boton de reinicio
                const boton = document.createElement('button');
                boton.setAttribute('type', 'button');
                boton.textContent = 'Reiniciar';
                boton.addEventListener('click', () => {
                    location.reload();
                  });
                boton.className = 'btn-danger';
                lider.appendChild(boton);
            }
        }

    }

}