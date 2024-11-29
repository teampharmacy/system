"use client";

import { ElementType } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";

interface AppCardProps {
  name: string;
  iconColor: string;
  icon: ElementType;
  number: number;
  onClick: () => void;
}

const AppCard = ({
  name,
  iconColor,
  icon: Icon,
  number,
  onClick,
}: AppCardProps): JSX.Element => {
  return (
    <Card
      className="w-full max-w-sm hover:scale-105 duration-200 cursor-pointer shadow-lg"
      onClick={onClick}
    >
      <CardHeader>
        <CardDescription>{name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-x-4 items-center">
          <Icon className={`size-10 ${iconColor}`} />
          <Separator orientation="vertical" />
          <p className="text-4xl">{number}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppCard;
