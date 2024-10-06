import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const prisma = new PrismaClient();
    try {
        const users = await prisma.NewCoin.findUnique({
            where: { id: 1 },
        });
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({'id': 1, 'amount': 0}, { status: 200 });
    }
}