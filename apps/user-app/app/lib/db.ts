import {prisma} from "@repo/db";


export async function main() {
    try {
        const dummy = await prisma.user.create({
            data:{
                number:"222222",
                password:`{await bcrypt.hash('osman', 10)}`
            }
        })
        console.log(dummy);
    } catch (e) {
        console.log(e)
    }
}

main();