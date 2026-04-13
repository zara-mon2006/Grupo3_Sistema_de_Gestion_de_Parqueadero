import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      message: 'Backend funcionando correctamente',
      status: 'ok',
    };
  }
}
