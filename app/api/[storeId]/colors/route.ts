import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request, { params }: { params: { storeId: string, colorId: string } }) {
    try {
        const { userId } = auth();

        const body = await req.json();

        const { name, value } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        if (!name) {
            return new NextResponse("The color name is required", { status: 400 });
        }
        if (!value) {
            return new NextResponse("The color value is required", { status: 400 });
        }

        if (!params.storeId) return new NextResponse("Store is required", { status: 400 });

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });

        const size = await prismadb.color.create({
            data: {
                name: name,
                value: value,
                storeId: params.storeId
            }
        });

        return NextResponse.json(size);

    } catch (error) {
        console.log('[COLORS_POST]', error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {

        if (!params.storeId) return new NextResponse("Store is required", { status: 400 });

        const colors = await prismadb.color.findMany({
            where: {
                storeId: params.storeId
            }
        });

        return NextResponse.json(colors);

    } catch (error) {
        console.log('[COLORS_GET]', error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}
