import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class homeService {
    constructor(private prisma: PrismaService) {}

    async getUser(userId: string) {
        return await this.prisma.user.findUnique ({
            where: { id: userId },
            include: {
                plants : {
                    include : {
                        plantType: true
                    }
                }
            },
        })
    }
}