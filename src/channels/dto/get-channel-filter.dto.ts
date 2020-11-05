import { SeenStatus } from '../channel.model';

export class GetChannelsFilterDto {
  status: SeenStatus;
  search: string;
}
