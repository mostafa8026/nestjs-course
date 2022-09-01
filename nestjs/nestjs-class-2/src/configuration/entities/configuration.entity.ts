import { IsString } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Configuration')
export class ConfigurationEntity {

    constructor(input: Record<string, any>) {
        Object.assign(this, input);
    }

    @PrimaryColumn()
    @IsString()
    key: string;

    @Column()
    @IsString()
    value: string;
}
