import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import Vitamine from "../../../src/schemas/VitamineSchema";
import dbConnect from "../../../src/lib/dbConnect";
import startOfYear from "date-fns/startOfYear";

export default async function handler(req, res) {
  await dbConnect()
  const session = await unstable_getServerSession(req, res, authOptions);
  const user = session.user._id
  if (!session)
    res
      .status(401)
      .end("Il faut être connecté pour accéder à cette fonctionnalité");
  const { endpoint } = req.query;
  const { body, method } = req;
  switch (endpoint) {
    case "getlast":
      if (method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
      }
      try {
        let data = await Vitamine.findOne().sort({ date: -1 });
        if (!data) {
          data = new Vitamine({ date: startOfYear(new Date()), user });
        }
        return res.json(data);
      } catch (err) {
        return res.status(500).json({ message: "Erreur inconnue" });
      }
      break;
    case "add":
      if (method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
      }
      try {
        if (!body.date) return res.status(400).end("Date manquante");
        const data = new Vitamine({ date: new Date(body.date), user })
        await data.save()
        return res.json(data);
      } catch (err) {
        return res.status(500).json({ message: "Erreur inconnue" });
      }
      break;
    default:
      return res.status(404).json({ message: "Cet appel n'existe pas" });
  }
}
