import { Controller, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const path = `/app/media/${filename}`;

    res.sendFile(path, (err) => {
      if (err) {
        res.status(404).send('File not found.');
      }
    });
  }
}
