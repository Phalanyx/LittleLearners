import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const prisma = new PrismaClient();
    try {
        const users = await prisma.coin.findUnique({
            where: { id: 1 },
        });
        console.log(users);
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({'id': 1, 'amount': 0}, { status: 200 });
    }
    }