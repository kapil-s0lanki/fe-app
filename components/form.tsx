"use client";

import { signInAction } from "@/actions/auth-action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";

export function CardWithForm() {
  return (
    <Card className="w-[350px] p-10">
      <CardHeader>
        <CardTitle className=" text-center">🔐Auth</CardTitle>
        <CardDescription className=" text-center">
          Click here to access the Services.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={signInAction}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Button
                size="lg"
                className="w-full flex gap-2"
                variant={"outline"}
              >
                <FcGoogle className="h-5 w-5" />
                Sign in with Google
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
