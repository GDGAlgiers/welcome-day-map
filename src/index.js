/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log("Script started successfully");

async function extendedFeatures() {
  try {
    await bootstrapExtra();
    console.log("Scripting API Extra loaded successfully");

    // Place the countdown GIF inside of the cinema screen
    const countdown = await WA.room.website.get("cinemaScreen");
    countdown.x = 1670;
    countdown.y = 802;
    countdown.width = 320;
    countdown.height = 240;

    // Place the github repository card
    const githubRepository = await WA.room.website.get("githubRepository");
    githubRepository.x = 3272;
    githubRepository.y = 1088;
    githubRepository.width = 400;
    githubRepository.height = 300;
  } catch (error) {
    console.error("Scripting API Extra ERROR", error);
  }
}
extendedFeatures();

// Manage popups
let currentZone: string;
let currentPopup: any;

const config = [
  {
    zone: "start",
    message: "Welcome aboard our GDG & WTM Algiers World",
    cta: [
      {
        label: "Next",
        className: "primary",
        callback: () =>
          WA.state.saveVariable("dontShowStartPopup", true).then(() => {
            console.log(currentPopup);
            closePopup();
            openPopup("start2");
          }),
      },
    ],
  },
  {
    zone: "start2",
    message:
      "Enjoy exploring the space and don't forget to be present at 20:00 GMT+1 on the conference room :)",
    cta: [
      {
        label: "Thank you ",
        className: "primary",
        callback: () => closePopup(),
      },
    ],
  },
  {
    zone: "local",
    message: "Explore our headquarter or as we call it `Local`",
    cta: [
      {
        label: "Dismiss",
        className: "normal",
        callback: () => closePopup(),
      },
    ],
  },
  {
    zone: "meetup",
    message:
      "The meetup space will be used to stream our welcome day live at 20:00 GMT+1",
    cta: [
      {
        label: "Dismiss",
        className: "normal",
        callback: () => closePopup(),
      },
    ],
  },
  {
    zone: "eventsprojects",
    message:
      "At GDG & WTM Algiers, we provide high quality events and projects, explore them inside this room",
    cta: [
      {
        label: "Dismiss",
        className: "normal",
        callback: () => closePopup(),
      },
    ],
  },
  {
    zone: "departments",
    message:
      "Do you want to know what are the secret of our success? Check out presentations of our departments in this room",
    cta: [
      {
        label: "Dismiss",
        className: "normal",
        callback: () => closePopup(),
      },
    ],
  },
  {
    zone: "discordspace",
    message:
      "GDG Algiers has a discord community space with +2k member, we do awesome things there, check them out here",
    cta: [
      {
        label: "Dismiss",
        className: "normal",
        callback: () => closePopup(),
      },
    ],
  },
  {
    zone: "chill",
    message:
      "Tired of exploring the space? You can sit in this room to have a rest and chill",
    cta: [
      {
        label: "Dismiss",
        className: "normal",
        callback: () => closePopup(),
      },
    ],
  },
  {
    zone: "games",
    message:
      "Wanna play some games with friends, this is the perfect room for that, uno, skribble and gartic games are presents",
    cta: [
      {
        label: "Dismiss",
        className: "normal",
        callback: () => closePopup(),
      },
    ],
  },
];

WA.room.onEnterZone("local", () => openPopup("local"));
WA.room.onLeaveZone("local", closePopup);

WA.room.onEnterZone("meetup", () => openPopup("meetup"));
WA.room.onLeaveZone("meetup", closePopup);

WA.room.onEnterZone("eventsprojects", () => openPopup("eventsprojects"));
WA.room.onLeaveZone("eventsprojects", closePopup);

WA.room.onEnterZone("departments", () => openPopup("departments"));
WA.room.onLeaveZone("departments", closePopup);

WA.room.onEnterZone("discordspace", () => openPopup("discordspace"));
WA.room.onLeaveZone("discordspace", closePopup);

WA.room.onEnterZone("chill", () => openPopup("chill"));
WA.room.onLeaveZone("chill", closePopup);

WA.room.onEnterZone("games", () => openPopup("games"));
WA.room.onLeaveZone("games", closePopup);

WA.room.onEnterZone("start", () => {
  const dontShow = WA.state.loadVariable("dontShowStartPopup");
  if (dontShow) return;
  openPopup("start");
});
WA.room.onLeaveZone("start", closePopup);

// Popup management functions
function openPopup(zoneName: string) {
  currentZone = zoneName;
  const popupName = zoneName + "Popup";
  const zone = config.find((item) => {
    return item.zone == zoneName;
  });

  if (typeof zone !== "undefined") {
    // @ts-ignore otherwise we can't use zone.cta object
    currentPopup = WA.ui.openPopup(popupName, zone.message, zone.cta);
  }
}
function closePopup() {
  if (typeof currentPopup !== "undefined") {
    currentPopup.close();
    currentPopup = undefined;
  }
}
