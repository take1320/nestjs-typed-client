import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '../src/app.module';
import { safeDump } from 'js-yaml';
import { join } from 'path';
import { promises as fs } from 'fs';
import { cwd } from 'process';

const exportOpenAPIDocument = async () => {
  const app = await NestFactory.create(AppModule);

  const builder = new DocumentBuilder()
    .setTitle('Sample Backend')
    .setDescription('Sample Backend')
    .setVersion(new Date().getTime().toString())
    .addServer('http://localhost:3000', 'local');

  const document = SwaggerModule.createDocument(app, builder.build());
  const yamlDocument = safeDump(document, {
    skipInvalid: true,
    noRefs: true,
  });
  const yamlPath = join(cwd(), 'out', 'sample-backend.yml');

  await fs.writeFile(yamlPath, yamlDocument);
};

exportOpenAPIDocument().catch(console.error);
