//this is our custom pipe
//this is used to validate the body while updating the channel seen status (so that only UNLOCKED & LOCKED are send)

import { PipeTransform, BadRequestException } from '@nestjs/common';
import { SeenStatus } from '../channel-status.enum';

//custom pipe must implement PipeTransform interface
export class ChannelStatusValidationPipe implements PipeTransform {
  //readly means even during runtime it can't be modified by the class members
  readonly allowedStatuses = [SeenStatus.LOCKED, SeenStatus.UNLOCKED];

  //PipeTransform interface also defines that there should be a transform method in the class
  //inside transform method we can define 2 parameteres, value & metadata
  transform(value: string): any {
    //we check the status value sent from the client
    value = value.toUpperCase();
    //throw an error if the status sent is invlid
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any): boolean {
    //indexOf is going to return -1 is the value is not found in the array
    const idx = this.allowedStatuses.indexOf(status);
    return idx != -1;
  }
}
