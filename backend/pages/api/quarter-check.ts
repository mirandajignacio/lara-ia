import type { NextApiRequest, NextApiResponse } from "next";

const openingText = `Hola Sofía! 😄

Espero que estés teniendo un excelente día, te estoy contactando para que podamos saber sobre tu experiencia en Tesla.


Recuerda que lo que respondas va a ser manejado con extricta confidencialidad y tu líder no podrá ver las respuestas.`;

const contextText = `Los siguientes roles en Tesla son los únicos que tendrán acceso a nuestras conversaciones:


- ✅ HR Director (Holly Flax)
- ✅ HRBP (Toby Flenderson)


Tu lider no tendrá acceso a tus respuestas, únicamente tendrá acceso a ver resultados grupales, con un mínimo de 3 respuestas.`;

const closingText = `Muchas gracias por tu tiempo, Sofía. Me aseguraré de pasar tu feedback.
        
¡Ojalá volvamos a cruzarnos en otro momento! 👋
      
Tesla agradece tu colaboración y te desea lo mejor en lo que se viene.  `;

const mock = {
  uid: "1",
  lenguage: "es",
  controls: [
    {
      uid: "opening",
      "control-type": "opening",
      question: openingText,
      context: [
        {
          uid: "1",
          label: "¿Quién tiene acceso?",
          text: contextText,
        },
        {
          uid: "2",
          label: "¿Por qué preguntas?",
          text: contextText,
        },
      ],
    },
    {
      uid: "experience",
      "control-type": "mood",
      question: `## ¿Cómo fue tu experiencia en Tesla el último mes?`,
      required: true,
      "sub-control": {
        conditional: "negative",
        control: {
          "control-type": "text",
          question: "## ¿Qué fue lo que pasó?",
          uid: "experience-why",
          required: false,
        },
      },
    },
    {
      uid: "leader",
      question: `## ¿Cómo te llevás con tu líder?`,
      required: true,
      "control-type": "option",
      "sub-control": {
        conditional: "negative",
        control: {
          "control-type": "text",
          question: "## ¿Qué fue lo que pasó?",
          uid: "leader-why",
          required: false,
        },
      },
      options: [
        {
          uid: "1",
          label: "🤩 Muy bien",
          value: "1",
        },
        {
          uid: "2",
          label: "😄 Bien ",
          value: "2",
        },
        {
          uid: "3",
          label: "🙂 Mas o menos",
          value: "3",
        },
        {
          uid: "4",
          label: "🙁 Mal",
          value: "4",
        },
        {
          uid: "5",
          label: "😠 Muy mal",
          value: "5",
        },
      ],
    },
    {
      uid: "recommendation",
      "control-type": "nps",
      question: `## En una escala del 0 al 10, ¿qué tan probable es que recomiendes a un amigo/a o familiar trabajar en Tesla?`,
      required: true,
    },
    {
      "control-type": "text",
      uid: "extra-comments",
      question: `## ¿Querés comentar algo mas que no hayas podido decir?`,
      required: false,
    },
    {
      uid: "closing",
      "control-type": "closing",
      question: closingText,
    },
  ],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    console.log(req.body);
    return res.status(200).json({
      message: "Success",
    });
  } else if (req.method === "GET") {
    return res.status(200).json({
      ...mock,
    });
  }
}
