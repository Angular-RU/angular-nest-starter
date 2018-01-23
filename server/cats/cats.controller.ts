import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    ReflectMetadata,
    UseInterceptors,
    Param,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';

@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
    constructor(private readonly catsService: CatsService) { }

    @Post()
    @Roles('admin')
    async create( @Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get(':id')
    findOne(
        @Param('id', new ParseIntPipe())
        id,
    ) {
        // logic
    }
}
