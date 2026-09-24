const hoy = new Date();
const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const fechaLarga = `${hoy.getDate()} días del mes de ${meses[hoy.getMonth()]} de ${hoy.getFullYear()}`;

const TRAMITES = {
  residencia: {
    label: 'Certificado de residencia',
    titulo: 'CERTIFICADO DE RESIDENCIA',
    campos: [
      {id:'nombre', label:'Nombre completo', placeholder:'Ej. María José Pérez Salgado'},
      {id:'tipoDoc', label:'Tipo de documento', select:['Cédula de ciudadanía','Cédula de extranjería','Tarjeta de identidad']},
      {id:'numDoc', label:'Número de documento', placeholder:'Ej. 1067412345'},
      {id:'direccion', label:'Dirección de residencia', placeholder:'Ej. Calle 5 #10-20'},
      {id:'barrio', label:'Barrio o corregimiento', placeholder:'Ej. Cristo Rey'},
      {id:'tiempo', label:'Tiempo de residencia', placeholder:'Ej. 3 años'},
      {id:'funcionario', label:'Nombre del Secretario(a) de Gobierno', placeholder:'Ej. Claribel Páez Cabeza'}
    ],
    firmante: 'Secretario(a) de Gobierno',
    cuerpo: (d) => `El(la) señor(a) ${d.nombre}, identificado(a) con ${d.tipoDoc.toLowerCase()} número ${d.numDoc}, reside actualmente en la dirección ${d.direccion}, barrio/corregimiento ${d.barrio}, jurisdicción del municipio de Puerto Escondido, Córdoba, desde hace ${d.tiempo}.`
  },
  pazysalvo: {
    label: 'Paz y salvo de Ind. y Comercio',
    titulo: 'PAZ Y SALVO DE INDUSTRIA Y COMERCIO',
    campos: [
      {id:'nombre', label:'Nombre o razón social', placeholder:'Ej. Comercializadora El Progreso S.A.S.'},
      {id:'numDoc', label:'NIT o cédula', placeholder:'Ej. 900.123.456-7'},
      {id:'establecimiento', label:'Nombre del establecimiento', placeholder:'Ej. Ferretería El Progreso'},
      {id:'direccion', label:'Dirección del establecimiento', placeholder:'Ej. Carrera 3 #8-15'},
      {id:'vigencia', label:'Vigencia certificada', placeholder:'Ej. 2025'},
      {id:'funcionario', label:'Nombre del Secretario(a) de Hacienda', placeholder:'Ej. Jorge Luis Support'}
    ],
    firmante: 'Secretario(a) de Hacienda',
    cuerpo: (d) => `Que el(la) contribuyente ${d.nombre}, identificado(a) con NIT/cédula ${d.numDoc}, propietario(a) del establecimiento de comercio "${d.establecimiento}", ubicado en ${d.direccion}, se encuentra a paz y salvo por concepto del Impuesto de Industria y Comercio correspondiente a la vigencia ${d.vigencia}.`
  },
  funcionamiento: {
    label: 'Permiso de funcionamiento',
    titulo: 'PERMISO DE FUNCIONAMIENTO',
    campos: [
      {id:'nombre', label:'Nombre del propietario', placeholder:'Ej. Carlos Andrés Julio Martínez'},
      {id:'numDoc', label:'Cédula del propietario', placeholder:'Ej. 1067998877'},
      {id:'establecimiento', label:'Nombre del establecimiento', placeholder:'Ej. Panadería Doña Rosa'},
      {id:'actividad', label:'Actividad económica', placeholder:'Ej. Panadería y repostería'},
      {id:'direccion', label:'Dirección del establecimiento', placeholder:'Ej. Calle 4 #6-22'},
      {id:'funcionario', label:'Nombre del Secretario(a) de Planeación', placeholder:'Ej. Ana Milena Torres'}
    ],
    firmante: 'Secretario(a) de Planeación',
    cuerpo: (d) => `Que el establecimiento de comercio "${d.establecimiento}", de propiedad de ${d.nombre}, identificado(a) con cédula número ${d.numDoc}, dedicado a la actividad de ${d.actividad}, ubicado en ${d.direccion}, cumple con los requisitos de uso del suelo y demás normas vigentes para su funcionamiento en el municipio de Puerto Escondido, Córdoba.`
  }
};
