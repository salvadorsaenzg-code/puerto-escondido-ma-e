# Trámites en línea — Puerto Escondido, Córdoba

Demo de un piloto de digitalización de trámites municipales para la Alcaldía de Puerto Escondido, Córdoba.

## ¿Qué hace?

Permite elegir uno de tres trámites, llenar un formulario y generar al instante un documento en PDF con el formato de un certificado oficial:

- Certificado de residencia
- Paz y salvo de Industria y Comercio
- Permiso de funcionamiento

> ⚠️ Documento de demostración — no tiene validez oficial hasta ser expedido por la Alcaldía.

## Estructura del proyecto

```
├── index.html      # Estructura de la página
├── css/
│   └── styles.css  # Estilos visuales
└── js/
    ├── data.js      # Datos de cada trámite (campos, textos legales)
    └── app.js        # Lógica: pestañas, formulario y generación del PDF
```

## Tecnología

- HTML, CSS y JavaScript puro (sin frameworks ni backend)
- [jsPDF](https://github.com/parallax/jsPDF) para generar los PDF en el navegador

## Cómo usarlo

Abre `index.html` en cualquier navegador. No requiere instalación ni servidor.

### Publicarlo con GitHub Pages

1. Ve a **Settings > Pages** en este repositorio.
2. En "Source", selecciona la rama `main` y la carpeta `/ (root)`.
3. Guarda; en unos minutos el sitio quedará disponible en `https://<usuario>.github.io/<repositorio>/`.
