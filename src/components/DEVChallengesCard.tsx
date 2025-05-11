/* eslint-disable @next/next/no-img-element */
import React from "react";
import landscape from "../../public/hunter.jpg";
import Image from "next/image";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

const DEVChallengesCard = () => {
  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-md border border:bg-gray-600 bg-white space-y-4 p-8 mb-2">
      <div className="flex flex-row justify-between rounded-md ">
        <span className="text-base">👋 DEV Challenges</span>
        <div> <EllipsisHorizontalIcon className="h-6 w-6"/></div>
      </div>
      <div className="mx-auto h-[250px] w-[600px] overflow-hidden rounded-md border">
        <Image src={landscape} alt="image" className="object-contain" />
      </div>
      <div className="mx-6 text-gray-600">
        We have two challenges live and finishing the same day!
      </div>
      <div className="text-lg mx-6 font-semibold">
        The Nylas Challenge is now live and also finishes on August 18
      </div>

      <div className="mx-6 flex-col border p-4 text-xl font-semibold rounded-md">
        <div className="flex">
          <img
            src="https://media.dev.to/cdn-cgi/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
            className="mr-2 h-8"
            alt="Logo"
          />
          Join us for the Nylas AI and Communications Challenge: $3000 in
          Prizes!
        </div>
        <span className="mx-12 text-sm text-gray-600 ">
          dev.to staff for The DEV Team · Jul 24
        </span>
      </div>


      <div className="text-lg mx-6 font-semibold">
      The Stellar Challenge Finishes on August 18 🤨
      </div>


      <div className="mx-6 flex-col border p-4 text-xl font-semibold rounded-md">
        <div className="flex">
          <img
            src="https://media.dev.to/cdn-cgi/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
            className="mr-2 h-8"
            alt="Logo"
          />
          Join Us For The First Community Smart Contract Challenge With $50,000 In Prizes!
        </div>
        <span className="mx-12 text-sm text-gray-600">
          dev.to staff for The DEV Team · Jul 24
        </span>
      </div>


      <div className="mx-6 text-gray-600">
      Happy coding ❤️ Ps- if you see this, know that i worked hard Manav.
      </div>
    </div>
  );
};

export default DEVChallengesCard;
