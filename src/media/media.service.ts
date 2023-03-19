import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import {InjectConnection} from "nestjs-knex"
import { Knex } from "knex"
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class MediaService {
  constructor( @InjectConnection() private readonly knex: Knex) {
  }
  slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }
  async create(createMediaDto: CreateMediaDto) {
    const {name, status, type, description, url} = createMediaDto
    const id = uuidv4();

    const slug = this.slugify(name)
    await this.knex.table('media')
      .insert({
        id,
        name: name,
        type,
        status: status ? 'active' : 'inactive',
        url,
        description,
        slug
    })
    return id
  }

  async findAll(page, limit) {
    return await this.knex.whereNull('deletedAt').select("*").from('media').limit(limit).offset(page)
  }

  async findOne(id: string) {
    return (await this.knex.table('media').where('id', id).whereNull("deletedAt"))[0]
  }

  async update(id: string, updateMediaDto: UpdateMediaDto) {
    console.log(updateMediaDto)
   const mediaFile = await this.findOne(id)
    if(!mediaFile) {
      console.log("not found")
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    }

    const {status} = updateMediaDto
    return await this.knex.table('media').where('id', id).update({
      "status": status
    })
  }

  async remove(id: string) {
    return await this.knex.table('media').where('id', id).update({
      "deletedAt": this.knex.fn.now()
    })
  }
}
