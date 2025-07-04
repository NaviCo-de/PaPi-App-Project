import { Controller, Post, Get, Body, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('home')
export class HomeController {
    @UseGuards(JwtAuthGuard)
    @Get()
    landingPage() {
        
    }
}