export interface Channel {
  channel_url: string; //this is the id for the youtube channel
  socialblade_category: string;
  subscribers: number;
  location: string;
  bio_email: string;
  channel_name: string;
  describtion: string;
  instagram: string;
  twitter: string;
  facebook: string;
  tictok: string;
  pinterest: string;
  others: string;
  joined: string;
  views: number;
  //this is the status of the channel if it is previously seen
  status: SeenStatus;
}

// we will only allow two kinds of status(Locked & Unlocked)
export enum SeenStatus {
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED',
}

//Interface is TypeScript concept that simply inforces the shape of an object upon compilation
//Thus After compulation, interfaces are not preserved as interface anymore
