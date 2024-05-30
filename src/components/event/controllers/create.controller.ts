import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../../prisma/db";
import { truncate } from "fs";
import { UUID } from "crypto";
import { randomInt } from "crypto";

export async function getEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.query.eventId) {
      if (req.query.cat == "festival") {
        const data = await prisma.event.findMany({
          where: {
            category: "festival",
          },
          select: {
            name: true,
            description: true,
            tickets: true,
            cover: true,
            startDate: true,
            endData: true,
            id: true,
          },
        });
        return res.status(200).json(data);
      }
      if (req.query.cat == "concert") {
        const data = await prisma.event.findMany({
          where: {
            category: "concert",
          },
          select: {
            name: true,
            description: true,
            tickets: true,
            cover: true,
            startDate: true,
            endData: true,
            id: true,
          },
        });

        return res.status(200).json(data);
      }
      if (!req.query.cat) {
        const data = await prisma.event.findMany({
          select: {
            name: true,
            description: true,
            tickets: true,
            cover: true,
            startDate: true,
            endData: true,
            id: true,
          },
        });

        return res.status(200).json(data);
      }
    }
    if (req.query.eventId) {
      const id: any = req.query.eventId;
      const data = await prisma.event.findFirst({
        where: {
          id: id,
        },
        select: {
          name: true,
          description: true,
          tickets: true,
          cover: true,
          startDate: true,
          endData: true,
          id: true,
        },
      });

      return res.status(200).json(data);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function createEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cover = req.body.cover;
  const description = req.body.description;
  const name = req.body.name;
  const startDate = req.body.startDate;
  const endData = req.body.endDate;
  const tickets = parseFloat(req.body.ticket);
  const category = req.body.category;
  const creatorId: any = res.locals.id;

  console.log(cover);
  console.log(description);
  console.log(name);
  console.log(startDate);

  function generateRandomDigits(length: any) {
    const digits = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += digits.charAt(Math.floor(randomInt(0, digits.length)));
    }
    return result;
  }

  // Generate a random string of 6 digits
  const randomString = generateRandomDigits(6);
  try {
    const data = await prisma.event.create({
      data: {
        cover,
        description,
        name,
        startDate,
        endData,
        tickets,
        category,
        creatorId,
        workerCode: randomString,
      },
    });
    console.log(data);
    res.status(201).json({ msg: "succes" });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function createdGet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const creatorId: any = res.locals.id;

  try {
    const data = await prisma.event.findMany({
      where: {
        creatorId,
      },
      select: {
        name: true,
        description: true,
        tickets: true,
        cover: true,
        startDate: true,
        endData: true,
        id: true,
        workerCode: true,
      },
    });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
