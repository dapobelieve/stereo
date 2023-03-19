import { Controller, Get, Post, Body, Patch, Param, Query, Delete, UseInterceptors } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { ResponseInterceptor } from "../interceptors/response.interceptor";

@UseInterceptors(ResponseInterceptor)
@Controller({
  path: 'media',
  version: '1'
})
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  async create(@Body() createMediaDto: CreateMediaDto) {
    const mediaId =  await this.mediaService.create(createMediaDto);
    return {
      data: {id: mediaId},
      message: "Media Resource created"
    }
  }

  @Get()
  async findAll(@Query() queryParams) {
    const {page=1, perPage=10}= queryParams
    let mediaFiles = await this.mediaService.findAll(parseInt(page), parseInt(perPage));
    return {
      data: mediaFiles
    }
  }

  @Get('/search')
  async search(@Query() queryParams) {
    const {query}= queryParams
    let mediaFiles = await this.mediaService.search(query);
    return {
      data: mediaFiles
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const file = await this.mediaService.findOne(id);
    if(!file) {
      return {
        data: file || {},
        message: "Media resource not found"
      }
    }
    return {
      data: file || {},
      message: "Media Resource found"
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return await this.mediaService.update(id, updateMediaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.mediaService.remove(id);
  }
}
