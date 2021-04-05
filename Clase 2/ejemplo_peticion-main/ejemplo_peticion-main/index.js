const express = require('express')
const path = require('path')
const boyParser = require('body-parser')

const PORT = process.env.PORT || 5000
const MAX_NOTAS = 100;
//const PATH_PREFIX = '/appejemplo';

const app = express()

app.use(boyParser())

const notas = [
  {
    contenido: 'HTML es facil',
    fecha: new Date('2021-03-20T17:30:31.098Z'),
  },
  {
    contenido: 'El navegador solo puede ejecutar JavaScript',
    fecha: new Date('2021-03-20T18:39:34.091Z'),
  },
  {
    contenido: 'Los métodos más importantes del protocolo HTTP son GET y POST',
    fecha: new Date('2021-03-20T19:20:14.298Z'),
  },
]

const isValidNote = nota => {
  return typeof nota === 'object' && typeof nota.contenido === 'string' && !isNaN(new Date(nota.fecha).getTime())
}

const createNote = nota => {
  notas.push(nota);

  if (notas.length > MAX_NOTAS) {
    notas.shift()
  }
}

const formatNote = nota => {
  return {
    contenido: nota.contenido.substring(0, 200),
    fecha: new Date(nota.fecha),
  }
}

const pagina_notas = `
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="/main.css" />
  <script type="text/javascript" src="/main.js"></script>
</head>
<body>
  <div class='container'>
    <h1>Notas</h1>
    <div id='notas'>
    </div>
    <form action='/nueva_nota' method='POST'>
      <input type="text" name="nota" autocomplete="off"><br>
      <input type="submit" value="Alta">
    </form>
  </div>
</body>
</html>
`

const spa_notas = `
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="/main.css" />
  <script type="text/javascript" src="/spa.js"></script>
</head>
<body>
  <div class='container'>
    <h1>Notas -- SPA</h1>
    <div id='notas'>
    </div>
    <form id='frm_notas'>
      <input type="text" name="nota" autocomplete="off"><br>
      <input type="submit" value="Alta">
    </form>
  </div>
</body>
</html>
`
const spa_notas_fetch = `
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="/main.css" />
  <script type="text/javascript" src="/fetch.js"></script>
</head>
<body>
  <div class='container'>
    <h1>Notas -- SPA -- FETCH</h1>
    <div id='notas'>
    </div>
    <form id='frm_notas'>
      <input type="text" name="nota" autocomplete="off"><br>
      <input type="submit" value="Alta">
    </form>
  </div>
</body>
</html>
`
const spa_notas_axios = `
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="/main.css" />  
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script type="text/javascript" src="/axios.js"></script>
</head>
<body>
  <div class='container'>
    <h1>Notas -- SPA -- AXIOS</h1>
    <div id='notas'>
    </div>
    <form id='frm_notas'>
      <input type="text" name="nota" autocomplete="off"><br>
      <input type="submit" value="Alta">
    </form>
  </div>
</body>
</html>
`

const getIndexHTML = (cantidad) => {
  return (`
<!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
        <div class='container'>
          <h1>Ejemplo de Aplicación FullStack</h1>
          <p>Número de notas ${cantidad}</p>
          <br>
          <img src='fullstack.png' width='200' />
          <br><br>
          <a href='/notas'>Notas</a>
        </div>
      </body> 
    </html>
`)
}

const router = express.Router();

router.use(express.static(path.join(__dirname, 'public')))

//partev del servidor de node, routeo con expres que depende la ruta. switch ruta respuesta
//calback request y respuesta (texto)
router.get('/', (req, res) => {
  const page = getIndexHTML(notas.length)
  res.send(page)

})

//para cada ruta es una respiesta distinta
router.get('/reset', (req, res) => {
  notas.splice(0, notas.length)
  res.status(201).send({ message: 'reset notas' })
})

router.get('/notas', (req, res) => {
  res.send(pagina_notas)
})

//single page aplicator
router.get('/spa', (req, res) => {
  res.send(spa_notas)
})
//parecido pero asincronico para el callback hell
router.get('/spa_fetch', (req, res) => {
  res.send(spa_notas_fetch)
})
//mas limpio, 
router.get('/spa_axios', (req, res) => {
  res.send(spa_notas_axios)
})

router.get('/data.json', (req, res) => {
  res.json(notas)
})

router.post('/nueva_nota_spa', (req, res) => {
  if (!isValidNote(req.body)) {
    return res.send('nota invalida').status(400)
  }

  createNote(formatNote(req.body))

  res.status(201).send({ message: 'Nota creada con exito!' })
})

router.post('/nueva_nota', (req, res) => {
  notas.push({
    contenido: req.body.nota,
    fecha: new Date()
  })
  res.redirect('/notas')
})

if (process.env.NODE_ENV === 'development') {
  app.use(PATH_PREFIX, router)
} else {
  app.use('/', router)
}

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))