"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import CreateMeetDialog from "./modal/create-meet";

const GoogleMeetComponent = () => {
  return (
    <div className=" h-full w-full flex justify-center items-center">
      <CreateMeetDialog>
        <Button variant="outline" className=" flex gap-2" size="lg">
          <Image src="/google-meet.svg" alt="logo" height={40} width={40} />
          Create a meet
        </Button>
      </CreateMeetDialog>
    </div>
  );
};

export default GoogleMeetComponent;
