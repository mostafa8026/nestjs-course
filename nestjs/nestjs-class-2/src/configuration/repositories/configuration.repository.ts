import { EntityRepository, Repository } from "typeorm";
import { ConfigurationEntity } from "../entities/configuration.entity";

@EntityRepository(ConfigurationEntity)
export class ConfigurationRepository extends Repository<ConfigurationEntity>{}