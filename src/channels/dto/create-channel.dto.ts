//the recommended approach for creating a dto is to use class, not an interface(provides in nest js documentation)
//data transfer object- provides the shape of the data and is used for validation also
//the reason is that interface is part of TypeScipt & therefore not preserved post-compulation & nest js cant refer to interfaces during run-time but can refer to classes
//classes will be preserved post-compulation
//-----------------------------------------------------------------------------------------------------
//channels can be created without name & description, thus we want to fix that using validation pipe
//before using validation pipes we must install class validator & class transformer

import { IsNotEmpty } from 'class-validator';

export class CreateChannelDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
}
