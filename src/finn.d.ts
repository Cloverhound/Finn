export class Finn {
  constructor(gadgteName: string, options?: {
    enableTaskRouting?: boolean,
    mediaOptions?: {
      maxDialogLimit: number,
      interruptAction: string,
      dialogLogoutAction: string
    },
    enableSupervisor?: boolean,
    dontLoadRosters?: boolean
  })

  container: any;
  channels: {[id: string]: Channel};

  on(event: string, callback: Function)

  load(callback: (err: Error, agent: Agent) => void)

}

export interface Channel {
  id: string;
  name: string;
  state: string;
  tasks: {[id: string]: Task};

  login: Function;
  ready: Function;
  notReady: Function;
  makeRoutable: Function;
  makeNotRoutable: Function;

}

export interface Task {
  id: string;
  state: string;
  mediaId: string;
  data: {[id: string]: string};

  accept: Function;
  start: Function;
  close: Function;
  pause: Function;
  resume: Function;
  wrapUp: Function;
}

export interface Agent {
  id: string;
  extension: string;
  firstName: string;
  lastName: string;
  pendingState: string;
  state: string;
  teamId: string;
  teamName: string;
  isSupervisor: boolean;
}