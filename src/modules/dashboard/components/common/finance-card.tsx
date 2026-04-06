import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  type CardProps,
} from "@/components/ui/card";
import React, { type PropsWithChildren } from "react";

interface IFinanceCardProps {
  description?: React.ReactNode;
  title: React.ReactNode;
  cardProps?: CardProps;
}

export function FinanceCard({
  description,
  title,
  children,
  cardProps,
}: IFinanceCardProps & PropsWithChildren) {
  return (
    <Card
      {...cardProps}
      className={`mx-auto w-full ${cardProps?.className || ""}`}
    >
      <CardHeader>
        <CardTitle className=" opacity-70 text-base">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex items-center justify-between w-full">
        {children}
      </CardContent>
      {/* <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          Action
        </Button>
      </CardFooter> */}
    </Card>
  );
}
