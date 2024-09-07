import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
  } from '@nestjs/common';
import PostDto from './dto/post.dto';
import { PostsService } from './posts.service';
import FindOneParams from 'src/utils/findOneParams';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import GetPostsByAuthorQuery from './query/getPostsByAuthorQuery';
import { ConfigService } from '@nestjs/config';
   
  @Controller('posts')
  export default class PostsController {
    constructor(
      private readonly postsService: PostsService
    ) {}
   
    @Get()
    getPosts(@Query() { authorId }: GetPostsByAuthorQuery) {
      return this.postsService.getPosts(authorId);
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
    @UseGuards(JwtAuthenticationGuard)
    async createPost(@Body() postData: PostDto, @Req() request: RequestWithUser) {
      return this.postsService.createPost(postData, request.user.id);
    }
   
    @Delete(':id')
    deletePost(@Param() { id }: FindOneParams){
      return this.postsService.deletePost(id);
    }
  }