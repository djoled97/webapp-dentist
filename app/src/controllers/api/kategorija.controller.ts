import { Controller, Post, Body, Get, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Kategorija } from "entities/kategorija.entity";
import { KategorijaService } from "src/services/kategorija/kategorija.service";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";

@Controller('api/kategorija')
@Crud({
    model: {
        type:Kategorija
    },
    params: {
        id: {
            field: 'kategorijaId',
            type: 'number',
            primary: true

        }

    },


})
export class KategorijaController {

    // iskljucivo ime servisa service inace izbacuje runtime error
    constructor(public service: KategorijaService) {
    }

    @Get('name')
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('admin',"user")
    getName():Promise<Kategorija[]>{
        return this.service.getName();
    }


}