import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import Jour from "../../../src/schemas/jourSchema";
import { isToday, parseISO, startOfDay } from "date-fns";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session)
    res
      .status(401)
      .end("Il faut être connecté pour accéder à cette fonctionnalité");
  const { endpoint } = req.query;
  const { body, method, query } = req;
  switch (endpoint) {
    case "getjour":
      switch (method) {
        case "GET":
          try {
            if (!query.date) return res.status(400).end("Date manquante");
            let data = await Jour.findOne({
              date: startOfDay(new Date(query.date)),
            });
            if (!data) {
              data = new Jour({ date: new Date(query.date) });
              data.save();
            }
            return res.json(data);
          } catch (err) {
            return res.status(500).json({ error: "Erreur inconnue" });
          }
          break;
        default:
          res.setHeader("Allow", ["GET"]);
          return res.status(405).end(`Method ${method} Not Allowed`);
      }
      break;
    case "getderniers":
      switch (method) {
        case "GET":
          try {
            const dataB = await Jour.findOne({}, {}, { "biberons.date": -1 });
            const biberon = dataB
              ? new Date(dataB.biberons.at(-1).date)
              : new Date();
            const dataC = await Jour.findOne({}, {}, { "couches.date": -1 });
            const couche = dataC
              ? {
                  date: new Date(dataC.couches.at(-1).date),
                  caca: dataC.couches.at(-1).caca,
                }
              : { date: new Date(), caca: false };
            return res.json({ biberon, couche });
          } catch (err) {
            return res.status(500).json({ error: "Erreur inconnue" });
          }
          break;
        default:
          res.setHeader("Allow", ["GET"]);
          return res.status(405).end(`Method ${method} Not Allowed`);
      }
      break;
    case "biberon":
      switch (method) {
        case "POST":
          try {
            if (!body.date) return res.status(400).end("Date manquante");
            const data = await Jour.findOneAndUpdate(
              { date: startOfDay(new Date(body.date)) },
              {
                $set: {
                  biberons: {
                    $push: {
                      date: body.date,
                      user: session.user._id,
                    },
                  },
                },
              },
              { upsert: true }
            );
            return res.json(data);
          } catch (err) {
            return res.status(500).json({ error: "Erreur inconnue" });
          }
          break;
        default:
          res.setHeader("Allow", ["POST"]);
          return res.status(405).end(`Method ${method} Not Allowed`);
      }
      break;
    case "couche":
      switch (method) {
        case "POST":
          try {
            const data = await Jour.findOneAndUpdate(
              { date: startOfDay(new Date()) },
              {
                $set: {
                  couches: {
                    $push: {
                      date: body.date,
                      user: session.user._id,
                      caca: body.caca || false,
                    },
                  },
                },
              },
              { upsert: true }
            );
            return res.json(data);
          } catch (err) {
            return res.status(500).json({ error: "Erreur inconnue" });
          }
          break;
        default:
          res.setHeader("Allow", ["POST"]);
          return res.status(405).end(`Method ${method} Not Allowed`);
      }
      break;
    case "evenement":
      switch (method) {
        case "POST":
          try {
            if (!body.message) return res.status(400).end("Message manquant");
            const data = await Jour.findOneAndUpdate(
              { date: startOfDay(new Date(body.date)) },
              {
                $set: {
                  evenement: {
                    $push: {
                      date: new Date(),
                      user: session.user._id,
                      message: body.message,
                    },
                  },
                },
              },
              { upsert: true }
            );
            return res.json(data);
          } catch (err) {
            return res.status(500).json({ error: "Erreur inconnue" });
          }
          break;
        default:
          res.setHeader("Allow", ["POST"]);
          return res.status(405).end(`Method ${method} Not Allowed`);
      }
      break;
    case "vitamineD":
      switch (method) {
        case "POST":
          try {
            const data = await Jour.findOneAndUpdate(
              { date: startOfDay(new Date()) },
              {
                $set: { vitamineD: true },
              },
              { upsert: true }
            );
            return res.json(data);
          } catch (err) {
            return res.status(500).json({ error: "Erreur inconnue" });
          }
          break;
        default:
          res.setHeader("Allow", ["POST"]);
          return res.status(405).end(`Method ${method} Not Allowed`);
      }
      break;
    default:
      return res.status(404).json({ message: "Cet appel n'existe pas" });
  }
}
