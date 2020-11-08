import { SeenStatus } from '../channel-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetChannelsFilterDto {
  @IsOptional()
  @IsIn([SeenStatus.LOCKED, SeenStatus.UNLOCKED])
  status: SeenStatus;
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
