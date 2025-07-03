import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // So you can inject PrismaService without importing the module every time
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}