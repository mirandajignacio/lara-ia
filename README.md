# LARA IA CHALLENGE

[Demo Web](https://lara-ia.vercel.app/)

En `/application` se encuentra la aplicación que debería usar el empleado para responder las preguntas.

### Setup
```sh
yarn install
```

```sh
yarn dev
```

### Controles
- Mood Control
- NPS Control
- Options Control
- Text Control
- Opening Control
- Closing Control 

**Aclaración**: Hice que el opening text y closing text sean un control también, ya que limitaba a que haya solo un step de presentación o cierre de flujo. Considero que puede existir el caso donde puede haber mas de un step de presentación o cierre. 

### Keypress Support
- Nps Control

### Esquema Api

Endpoints

```
url: https://lara-ia-backend.vercel.app/api/quarter-check
method: GET
code: 200
```
Response
```js
{
  uid: string,
  lenguage: "en" | "es",
  controls: [
    {
      uid: string,
      "control-type": "opening",
      question: string,
      context: [
        {
          uid: string,
          label: string,
          text: string,
        }
      ],
    },
    {
      uid: string,
      "control-type": "mood",
      question: string,
      required?: boolean,
      "sub-control": {
        conditional: "positive" | "neutral" | "negative",
        control: {
          uid: string,
          "control-type": "text",
          question: string,
          required: boolean,
        },
      },
    },
    {
      uid: string,
      question: string,
      required: boolean,
      "control-type": "option",
      options: [
        {
          uid: string,
          label: string,
          value: string,
        },
      ],
    },
    {
      uid: string,
      "control-type": "nps",
      question: string
      required: true,
    },
    {
      uid: string,
      "control-type": "text",
      question: string,
      required: boolean,
    },
    {
      uid: "closing",
      "control-type": "closing",
      question: string,
    },
  ],
}
```
---------
```
url: https://lara-ia-backend.vercel.app/api/quarter-check
method: POST
code: 200
```

Body

```js
{
  data: {
    uid: string;
    question: string;
    answer: string;
  }[] 
}
```

#### ControlContainer
Este Componente lo hice para contener cada control y poder entender por cual es si tiene que mostrar o no el botón de enviar respuestas.

#### useFormBuilder
El Hook que se conecta al Context del Form.
la prop currentControl fue algo que tuve que agregar para poder desde el Navigation saber si tengo que habilitar o no el botón de Siguiente.


#### Mock 
Si quisieran cambiar el schema del form podrian usar de ejemeplo el que se encuentra en 
`backend/pages/api/quarter-check.ts`
y harcodearlo como respuestas de `saveQuarterCheck` en 
`application/src/api/quarter-check.api.ts`



----------------

## Backend
En `/backend` se encuentra el backend en next.js, utilicé las Api Routes para hacer los endpoints.
