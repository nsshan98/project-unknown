import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class PaginationDto {
    
    @IsNumber()
    @IsPositive()
    @IsOptional()
    skip: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    limit: number;
}



// import { IsNumber, IsOptional, IsPositive } from 'class-validator';
// import { Type } from 'class-transformer';

// export class PaginationDto {
//   @Type(() => Number) // 👈 Converts "30" to 30
//   @IsNumber()
//   @IsPositive()
//   @IsOptional()
//   skip?: number;

//   @Type(() => Number)
//   @IsNumber()
//   @IsPositive()
//   @IsOptional()
//   limit?: number;
// }
