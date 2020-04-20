import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
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
  await app.listen(3000);
}
bootstrap();
