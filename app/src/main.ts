import { NestFactory } from '@nestjs/core';
import { CrudConfigService } from '@nestjsx/crud';

// CrudConfigService.load(
// {

// routes:{
//   only:["getOneBase"]
// }


// }


// )
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const rateLimit=require("express-rate-limit");
async function bootstrap() {
   const app = await NestFactory.create(AppModule);

  
  //----limiting requests-----
  // const apiLimiter = rateLimit({
  //   windowMs: 15 * 60 * 1000,
  //   max: 2,
  //   message:"You've maxed out your reqesuts please wait 15 mins"
  // });
  // app.use("/api/",apiLimiter)
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors()  
  await app.listen(3000);
}
bootstrap();
