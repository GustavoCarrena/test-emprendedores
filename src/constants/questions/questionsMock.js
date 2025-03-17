export const questionsMock = {
  Status: 'OK',
  data: [
    {
      id: 1,
      titulo: 'Motivación y objetivos',
      numero_eje: 1,
      preguntas: [
        {
          pregunta_id: 1,
          numero_pregunta: 1,
          texto_pregunta:
            '¿Por qué creés que tu idea es una oportunidad de negocio?',
          respuestas: [
            {
              respuesta_id: 1,
              texto_respuesta:
                'Creo que puede tener potencial, pero necesito validar la idea.',
              puntaje: 3,
            },
            {
              respuesta_id: 2,
              texto_respuesta:
                'Verifiqué que satisface una necesidad o deseo claro en el mercado.',
              puntaje: 5,
            },
            {
              respuesta_id: 3,
              texto_respuesta:
                'Quiero emprender algo, pero no tengo claro si hay demanda o valor.',
              puntaje: 1,
            },
          ],
        },
        {
          pregunta_id: 2,
          numero_pregunta: 2,
          texto_pregunta: '¿Tu idea tiene un mercado claro y definido?',
          respuestas: [
            {
              respuesta_id: 4,
              texto_respuesta:
                'Sí, ya identifiqué a mi cliente objetivo y su disposición a comprar.',
              puntaje: 5,
            },
            {
              respuesta_id: 5,
              texto_respuesta:
                'Tengo una noción, pero necesito investigar más.',
              puntaje: 3,
            },
            {
              respuesta_id: 6,
              texto_respuesta: 'No, todavía estoy buscando definir mi mercado.',
              puntaje: 1,
            },
          ],
        },
        {
          pregunta_id: 3,
          numero_pregunta: 3,
          texto_pregunta:
            '¿Cómo identificás y manejás los riesgos relacionados con tu proyecto?',
          respuestas: [
            {
              respuesta_id: 7,
              texto_respuesta:
                'Hice una lista de posibles problemas (económicos, operativos, de mercado) y preparé estrategias para reducirlos.',
              puntaje: 5,
            },
            {
              respuesta_id: 8,
              texto_respuesta:
                'No he analizado los posibles problemas ni pensado en formas de manejarlos.',
              puntaje: 1,
            },
            {
              respuesta_id: 9,
              texto_respuesta:
                'Tengo una idea general de los problemas que podrían surgir, pero no estrategias concretas.',
              puntaje: 3,
            },
          ],
        },
        {
          pregunta_id: 4,
          numero_pregunta: 4,
          texto_pregunta:
            '¿En qué se diferencia tu proyecto de la competencia?',
          respuestas: [
            {
              respuesta_id: 10,
              texto_respuesta:
                'Ofrezco una solución innovadora o significativamente mejor a lo que ya existe.',
              puntaje: 5,
            },
            {
              respuesta_id: 11,
              texto_respuesta:
                'Tengo algunas ideas creativas, pero todavía no están completamente desarrolladas.',
              puntaje: 3,
            },
            {
              respuesta_id: 12,
              texto_respuesta:
                'Mi proyecto es similar a otros que se ofrecen en el mercado.',
              puntaje: 1,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      titulo: 'Gestión y organización',
      numero_eje: 2,
      preguntas: [
        {
          pregunta_id: 5,
          numero_pregunta: 1,
          texto_pregunta: '¿Cómo se compone tu emprendimiento?',
          respuestas: [
            {
              respuesta_id: 13,
              texto_respuesta:
                'No tengo equipo / en el equipo no hay una distribución clara de roles y tareas.',
              puntaje: 1,
            },
            {
              respuesta_id: 14,
              texto_respuesta:
                'Cuento con un equipo en el cada miembro tiene roles bien definidos.',
              puntaje: 5,
            },
            {
              respuesta_id: 15,
              texto_respuesta:
                'Cuento con un equipo en el que los roles están parcialmente definidos, pero hay algunas superposiciones.',
              puntaje: 3,
            },
          ],
        },
        {
          pregunta_id: 6,
          numero_pregunta: 2,
          texto_pregunta:
            '¿Qué nivel de experiencia y conocimiento tiene tu equipo (o vos, si emprendés solo/a) sobre la industria o sector?',
          respuestas: [
            {
              respuesta_id: 16,
              texto_respuesta:
                'Tenemos conocimientos básicos y algo de experiencia, pero aún tenemos que aprender sobre la industria/sector y sus dinámicas.',
              puntaje: 3,
            },
            {
              respuesta_id: 17,
              texto_respuesta:
                'Contamos con experiencia sólida y un buen conocimiento del mercado.',
              puntaje: 5,
            },
            {
              respuesta_id: 18,
              texto_respuesta:
                'No tenemos experiencia previa ni conocimiento sobre la industria/sector.',
              puntaje: 1,
            },
          ],
        },
        {
          pregunta_id: 7,
          numero_pregunta: 3,
          texto_pregunta:
            '¿Cómo es la dinámica de toma de decisiones (operativas, de ventas, de equipo, financieras)?',
          respuestas: [
            {
              respuesta_id: 19,
              texto_respuesta:
                'Decido/decidimos con procesos claros, evaluando opciones y consultando otras opiniones.',
              puntaje: 5,
            },
            {
              respuesta_id: 20,
              texto_respuesta:
                'Las decisiones se toman de manera colaborativa y suelen estar respaldadas por algún análisis, aunque no siempre sigamos un proceso formal.',
              puntaje: 3,
            },
            {
              respuesta_id: 21,
              texto_respuesta:
                'No hay un proceso definido y las decisiones suelen ser impulsivas o poco planificadas.',
              puntaje: 1,
            },
          ],
        },
        {
          pregunta_id: 8,
          numero_pregunta: 4,
          texto_pregunta:
            '¿Qué tan conectado/a estás con el ecosistema emprendedor (incubadoras de proyectos, cámaras empresarias, club de emprendedores, universidades, otros emprendedores)?',
          respuestas: [
            {
              respuesta_id: 22,
              texto_respuesta:
                'Tengo algunos contactos, pero mi participación en el ecosistema es limitada.',
              puntaje: 3,
            },
            {
              respuesta_id: 23,
              texto_respuesta:
                'No estoy conectado/a con redes ni instituciones emprendedoras.',
              puntaje: 1,
            },
            {
              respuesta_id: 24,
              texto_respuesta:
                'Tengo vínculos sólidos con redes, instituciones y otros emprendedores.',
              puntaje: 5,
            },
          ],
        },
      ],
    },
    {
      id: 3,
      titulo: 'Planificación, operaciones y estrategia comercial',
      numero_eje: 3,
      preguntas: [
        {
          pregunta_id: 9,
          numero_pregunta: 1,
          texto_pregunta:
            '¿Cómo manejás o planeás manejar las finanzas de tu emprendimiento? ¿Cómo evaluás la rentabilidad de tu emprendimiento?',
          respuestas: [
            {
              respuesta_id: 25,
              texto_respuesta:
                'Tengo un plan financiero sólido, con presupuesto, control de costos y proyecciones claras.',
              puntaje: 5,
            },
            {
              respuesta_id: 26,
              texto_respuesta:
                'Llevo un control básico de ingresos y gastos, pero no tengo un plan detallado.',
              puntaje: 3,
            },
            {
              respuesta_id: 27,
              texto_respuesta:
                'No tengo un manejo estructurado de las finanzas aún.',
              puntaje: 1,
            },
          ],
        },
        {
          pregunta_id: 10,
          numero_pregunta: 2,
          texto_pregunta:
            '¿Qué tan preparado/a estás para vender tu producto o servicio?',
          respuestas: [
            {
              respuesta_id: 28,
              texto_respuesta:
                'Entiendo qué quiero ofrecer, pero me cuesta definir cómo comunicarlo y venderlo.',
              puntaje: 3,
            },
            {
              respuesta_id: 29,
              texto_respuesta:
                'Tengo identificados mis clientes, mi propuesta de valor, las estrategias de comunicación y los canales de distribución para llegar a ellos.',
              puntaje: 5,
            },
            {
              respuesta_id: 30,
              texto_respuesta:
                'No estoy seguro/a de quiénes son mis clientes o cómo vender mi producto.',
              puntaje: 1,
            },
          ],
        },
        {
          pregunta_id: 11,
          numero_pregunta: 3,
          texto_pregunta:
            '¿Cómo es la estrategia de marketing y comunicación de tu emprendimiento?',
          respuestas: [
            {
              respuesta_id: 31,
              texto_respuesta:
                'Tengo una estrategia definida, con objetivos, mensajes clave y uso efectivo de canales digitales.',
              puntaje: 5,
            },
            {
              respuesta_id: 32,
              texto_respuesta:
                'No he trabajado en una estrategia de marketing ni tengo acciones planificadas.',
              puntaje: 1,
            },
            {
              respuesta_id: 33,
              texto_respuesta:
                'Realizo acciones puntuales de comunicación, pero no tengo un plan integral.',
              puntaje: 3,
            },
          ],
        },
        {
          pregunta_id: 12,
          numero_pregunta: 4,
          texto_pregunta:
            '¿Qué tan definidos están tus procesos operativos? (proveedores, envíos, empaquetamiento, infraestructura, puntos de retiro, según corresponda)?',
          respuestas: [
            {
              respuesta_id: 34,
              texto_respuesta:
                'Los procesos de producción, distribución y/o prestación de servicios están claros y funcionan eficientemente.',
              puntaje: 5,
            },
            {
              respuesta_id: 35,
              texto_respuesta:
                'No tengo procesos definidos y opero de manera improvisada.',
              puntaje: 1,
            },
            {
              respuesta_id: 36,
              texto_respuesta:
                'Tengo una idea de cómo deberían ser, pero podrían mejorarse.',
              puntaje: 3,
            },
          ],
        },
      ],
    },
    {
      id: 4,
      titulo: 'Optimización de procesos',
      numero_eje: 4,
      preguntas: [
        {
          pregunta_id: 13,
          numero_pregunta: 1,
          texto_pregunta:
            '¿Cómo gestionás y analizás los datos de tu emprendimiento (ventas, clientes, costos, etc.)?',
          respuestas: [
            {
              respuesta_id: 37,
              texto_respuesta:
                'Uso herramientas como Excel, Power BI o Google Data Studio para analizar y visualizar datos.',
              puntaje: 5,
            },
            {
              respuesta_id: 38,
              texto_respuesta: 'No registro ni analizo datos en mi negocio.',
              puntaje: 1,
            },
            {
              respuesta_id: 39,
              texto_respuesta:
                '. Llevo un registro básico, pero no utilizo herramientas para análisis detallados.',
              puntaje: 3,
            },
          ],
        },
        {
          pregunta_id: 14,
          numero_pregunta: 2,
          texto_pregunta:
            '¿Qué tan familiarizado/a estás con herramientas digitales para mejorar la gestión de tu negocio (CRM, automatización, sistemas de gestión)',
          respuestas: [
            {
              respuesta_id: 40,
              texto_respuesta:
                'Domino herramientas digitales y las utilizo regularmente para optimizar procesos.',
              puntaje: 5,
            },
            {
              respuesta_id: 41,
              texto_respuesta:
                'Conozco algunas herramientas, pero no las uso de manera consistente.',
              puntaje: 3,
            },
            {
              respuesta_id: 42,
              texto_respuesta:
                'No utilizo herramientas digitales para la gestión de mi negocio.',
              puntaje: 1,
            },
          ],
        },
        {
          pregunta_id: 15,
          numero_pregunta: 3,
          texto_pregunta: '¿Cómo evaluás la seguridad digital en tu negocio?',
          respuestas: [
            {
              respuesta_id: 43,
              texto_respuesta:
                'No tengo implementadas medidas específicas de seguridad digital.',
              puntaje: 1,
            },
            {
              respuesta_id: 44,
              texto_respuesta:
                'Tengo medidas avanzadas como encriptación, firewalls y auditorías regulares de ciberseguridad.',
              puntaje: 5,
            },
            {
              respuesta_id: 45,
              texto_respuesta:
                'Tengo algunas medidas básicas de seguridad, pero espero mejorarlas.',
              puntaje: 3,
            },
          ],
        },
        {
          pregunta_id: 16,
          numero_pregunta: 4,
          texto_pregunta:
            '¿Qué tan preparado/a te sentís para integrar tecnologías como inteligencia artificial o automatización en tu emprendimiento?',
          respuestas: [
            {
              respuesta_id: 46,
              texto_respuesta:
                'Me interesan estas tecnologías, pero no sé cómo aplicarlas.',
              puntaje: 3,
            },
            {
              respuesta_id: 47,
              texto_respuesta:
                'No estoy familiarizado/a con estas tecnologías ni sé cómo podrían beneficiarme.',
              puntaje: 1,
            },
            {
              respuesta_id: 48,
              texto_respuesta:
                'Ya utilizo o estoy implementando estas tecnologías para optimizar procesos o personalizar servicios.',
              puntaje: 5,
            },
          ],
        },
      ],
    },
  ],
}
