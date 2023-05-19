// Pour visualiser cette "machine", allez à l'url https://stately.ai/viz et remplacer le contenu de l'onglet Code par ce contenu-ci.
import { createMachine, assign } from "xstate";

interface Context {
  retries: number;
}

const fetchMachine = createMachine<Context>({
  id: "scan",
  initial: "inactiveDevices",
  context: {
    retries: 0,
  },
  states: {
    inactiveDevices: {
      type: "parallel",
      states: {
        getNetworkState: {
          initial: "inactiveNetwork",
          states: {
            inactiveNetwork: {
              on: {
                RESOLVENETWORK: {
                  target: "networkSuccess",
                  actions: [],
                },
                REJECTNETWORK: {
                  target: "networkFailure",
                  actions: [],
                },
              },
            },
            networkSuccess: {
              type: "final",
              actions: [],
            },
            networkFailure: {
              on: {
                SEND_MESSAGE_ACTIVATE_NETWORK: {
                  target: "sendMsgActivateNetwork",
                  actions: [],
                },
              },
            },
            sendMsgActivateNetwork: {},
          },
        },
        getCameraState: {
          initial: "inactiveCamera",
          states: {
            inactiveCamera: {
              on: {
                RESOLVECAMERA: {
                  target: "cameraSuccess",
                  actions: [],
                },
                REJECTCAMERA: {
                  target: "cameraFailure",
                  actions: [],
                },
              },
            },
            cameraSuccess: {
              type: "final",
              actions: [],
            },
            cameraFailure: {
              on: {
                SEND_MESSAGE_ACTIVATE_CAMERA: {
                  target: "sendMsgActivateCamera",
                  actions: [],
                },
              },
            },
            sendMsgActivateCamera: {},
          },
        },
        getNfcState: {
          initial: "inactiveNfc",
          states: {
            inactiveNfc: {
              on: {
                RESOLVENFC: {
                  target: "nfcSuccess",
                  actions: [],
                },
                REJECTNFC: {
                  target: "nfcFailure",
                  actions: [],
                },
              },
            },
            nfcSuccess: {
              type: "final",
              actions: [],
            },
            nfcFailure: {
              on: {
                SEND_MESSAGE_ACTIVATE_NFC: {
                  target: "sendMsgActivateNfc",
                  actions: [],
                },
              },
            },
            sendMsgActivateNfc: {},
          },
        },
      },
      onDone: "readMasterCard",
    },
    readMasterCard: {
      on: {
        IS_MASTER_CARD: {
          target: "showMenuApp",
          actions: [],
        },
        IS_NO_MASTER_CARD: {
          target: "showIsNotMasterCard",
          actions: [],
        },
      },
    },
    showIsNotMasterCard: {},
    showMenuApp: {
      on: {
        ACTIVE_BT_SCAN_BOOKING_OR_MEMBERSHIP: {
          target: "scanBookingOrMembership",
          actions: [],
        },
        ACTIVE_BT_POINTS_SALE: {
          target: "appCashless",
          actions: [],
        },
        ACTIVE_BT_RELOAD_CARD: {
          target: "reloadCard",
          actions: [],
        },
        ACTIVE_BT_CREATE_NEW_MEMBER: {
          target: "createNewMmember",
          actions: [],
        },
      },
    },
    appCashless: {},
    reloadCard: {},
    createNewMmember: {},
    scanBookingOrMembership: {
      on: {
        ACTIVE_BT_READ_QRCODE: {
          target: "readQrcode",
          actions: [],
        },
        ACTIVE_BT_READ_NFC: {
          target: "readNfc",
          actions: [],
        },
      },
    },
    readNfc: {},
    readQrcode: {
      on: {
        READ_QRCODE_SUCCESS: {
          target: "showStatusTicket",
          actions: [],
        },
        READ_QRCODE_FAILURE: {
          target: "readQrcode",
        },
      },
    },
    showStatusTicket: {
      on: {
        READ_NEW_QRCODE: {
          target: "scanBookingOrMembership",
          actions: [],
        },
      },
    },
  },
});

