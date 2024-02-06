# LARA IA CHALLENGE

En `application` se encuentra la aplicación que debería usar el empleado para responder las preguntas.

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

### Esquema Api
Response
```json
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