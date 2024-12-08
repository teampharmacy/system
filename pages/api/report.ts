import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma"; 

interface ReportItem {
  date: string;
  amount: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filter } = req.query;

  if (!filter || typeof filter !== "string") {
    return res.status(400).json({ error: "Invalid filter" });
  }

  let startDate: Date;

  // Determine start date based on filter
  switch (filter) {
    case "week":
      startDate = new Date();
      startDate.setDate(startDate.getDate() - startDate.getDay());
      break;
    case "month":
      startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      break;
    case "year":
      startDate = new Date(new Date().getFullYear(), 0, 1);
      break;
    default:
      return res.status(400).json({ error: "Invalid filter" });
  }

  // Fetch and aggregate data from the database
  const reportData = await prisma.saleTransaction.groupBy({
    by: ["time"],
    where: {
      time: {
        gte: startDate,
      },
    },
    _sum: {
      amount: true,
    },
  });

  // Map the database results into a report format
  const formattedData: ReportItem[] = reportData.map((item) => ({
    date: item.time.toISOString().split("T")[0],
    amount: item._sum.amount ?? 0,
  }));

  res.status(200).json(formattedData);
}
