# How to publisht this library?
This folder is built using nestjs library generation like this:

```bash
nest g lib openai
```

Then, I created a package.json with needed packages:

```bash
npm init -y
npm i @nestjs/common @nestjs/core @nestjs/microservices @nestjs/platform-express @nestjs/swagger @nestjs/testing @nestjs/websockets rxjs
npm i -D typescript
```

And then I have to create a tsconfig for the purpose of building and publishing the library:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2017",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test", "**/*spec.ts"]
}
```

And I named it: tsconfig.build.json, then we can simply build the library using:

```bash
npx tsc -p tsconfig.build.json
```

And then we can publish the library using:

```bash
npm publish
```

Don't forget to login to npm using:

```bash
npm login
```