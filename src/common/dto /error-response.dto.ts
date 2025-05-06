import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
    @ApiProperty({
        type: 'number',
        example: 500,
        description: 'HTTP status code'
    })
    statusCode: number;

    @ApiProperty({
        type: 'string',
        example: 'Some API error',
        description: 'API error message'
    })
    message: string;

    @ApiProperty({
        type: 'string',
        example: 'ErrorName',
        description: 'Detailed Error Name'
    })
    error: string;

    @ApiProperty({
        type: 'string',
        example: 'Custom error Object',
        description: 'Custom Error Object'
    })
    errors: object;

    @ApiProperty({
        type: 'string',
        example: 'Detailed stack trace',
        description: 'Detailed stack trace'
    })
    stack: string;
}
