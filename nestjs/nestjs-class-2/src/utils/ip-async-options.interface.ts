import { ModuleMetadata } from "@nestjs/common";

export interface UtilModuleConfigOptions {
    ipUrl: string;
}

export interface UtilModuleConfigAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    inject?: any[];
    useFactory?: (...args: any[]) => Promise<UtilModuleConfigOptions> | UtilModuleConfigOptions;
}
