import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
import PostDto from './dto/post.dto';
import { PostsService } from './posts.service';
import FindOneParams from 'src/utils/findOneParams';
   
  @Controller('posts')
  export default class PostsController {
    constructor(private readonly postsService: PostsService) {}
   
    @Get()
    getPosts() {
      return this.postsService.getPosts();
    }
   
    @Get(':id')
    getPostById(@Param() { id }: FindOneParams) {
      return this.postsService.getPostById(id);
    }
   
    @Put(':id')
    updatePost(@Param() { id }: FindOneParams, @Body() postData: PostDto) {
      return this.postsService.updatePost(id, postData);
    }
   
    @Post()
    createPost(@Body() postData: PostDto) {
      return this.postsService.createPost(postData);
    }
   
    @Delete(':id')
    deletePost(@Param() { id }: FindOneParams) {
      return this.postsService.deletePost(id);
    }
  }