import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IController from '@shared/core/IController';
import UpdateCityImageService from '../services/UpdateCityImageService';

export default class UpdateCityImageController
  implements IController<Request, Response> {
  public async update(req: Request, res: Response): Promise<Response> {
    const imageFilename = req.file.filename;
    const { cityId } = req.params;

    const updateImage = container.resolve(UpdateCityImageService);

    const updatedCity = await updateImage.execute({ cityId, imageFilename });

    return res.json(classToClass(updatedCity));
  }
}
