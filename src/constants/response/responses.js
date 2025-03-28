export const responses = {
  Status: 'OK',
  data: {
    resultado_id: 1,
    titulo: 'Explorador/a del emprendimiento',
    subtitulo: 'Vas por buen camino',
    texto:
      'Estás en las etapas iniciales y recién estás explorando la posibilidad de emprender. Es importante que tomes este test como una guía para empezar a construir tu idea. ',

    puntajes: [
      { numero_eje: 1, puntaje: 8 },
      { numero_eje: 2, puntaje: 3 },
      { numero_eje: 3, puntaje: 1 },
      { numero_eje: 4, puntaje: 5 },
    ],

    puntajeTotal: 17,
    recomendaciones: [
      {
        id: 10,
        texto:
          'Considerá participar en talleres o cursos básicos sobre emprendedurismo.',
      },
      {
        id: 11,
        texto:
          'Si ya tenés una idea, comentá con conocidos para recibir devoluciones y advertir aspectos que se te puedan estar escapando.',
      },
      {
        id: 12,
        texto:
          'Estudiá tu mercado y evaluá próximos pasos para comenzar de manera ordenada.',
      },
    ],
    libros: [
      {
        id: 14,
        nombre: 'Hazlo con miedo',
        autor: 'Susana Posada',
      },
      {
        id: 15,
        nombre: 'El método Lean Startup',
        autor: 'Eric Ries',
      },
      {
        id: 16,
        nombre: 'Modelos de negocio para emprendedores',
        autor: 'Alexander Osterwalder y Yves Pigneur',
      },
      {
        id: 17,
        nombre: 'El test de la mamá',
        autor: 'Rob Fitzpatrick',
      },
      {
        id: 18,
        nombre: 'La vaca púrpura',
        autor: 'Seth Godin',
      },
    ],
    recomendaciones_adicionales: [
      {
        id: 1,
        texto:
          'Buscá en la <a href="https://www.argentina.gob.ar/economia/pymes-emprendedores-y-economia-del-conocimiento/capacitar/emprender">Plataforma Capacitar</a> los cursos disponibles en los temas: modelo de negocios, gestión de proyectos, planificación y estrategia, habilidades blandas.',
        eje: 'Motivación y objetivos',
      },
      {
        id: 2,
        texto:
          'Buscá en la <a href="https://www.argentina.gob.ar/economia/pymes-emprendedores-y-economia-del-conocimiento/capacitar/emprender">Plataforma Capacitar</a> los cursos disponibles en los temas: habilidades blandas, habilidades gerenciales y gestión de recursos humanos.',
        eje: 'Gestión y organización',
      },
      {
        id: 3,
        texto:
          'Buscá en la <a href="https://www.argentina.gob.ar/economia/pymes-emprendedores-y-economia-del-conocimiento/capacitar/emprender">Plataforma Capacitar</a> los cursos disponibles en los temas: marketing y comercialización, administración y finanzas, producción y logística.',
        eje: 'Planificación, operaciones y estrategia comercial',
      },
      {
        id: 4,
        texto:
          'Buscá en la <a href="https://www.argentina.gob.ar/economia/pymes-emprendedores-y-economia-del-conocimiento/capacitar/emprender">Plataforma Capacitar</a> los cursos disponibles en los temas: ciencia de datos, inteligencia artificial y transformación digital.',
        eje: 'Optimización de procesos',
      },
    ],
  },
}
