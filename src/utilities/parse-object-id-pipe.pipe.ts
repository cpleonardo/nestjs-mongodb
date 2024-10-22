import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class ParseObjectIdPipe
    implements PipeTransform<any, mongoose.Types.ObjectId> {
    transform(value: any): mongoose.Types.ObjectId {
        const validObjectId: boolean = mongoose.isObjectIdOrHexString(value);
        console.log('validObjectId', validObjectId);
        if (!validObjectId) {
            throw new NotFoundException('Object ID not found');
        }
        return value;
    }
}
